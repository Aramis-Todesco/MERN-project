const express = require("express");
const db = require("../utils/db.js");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");

const MAX_IMAGES = 4;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

const booksRoute = express.Router();

booksRoute.get("/create-book", (req, res) => {
  res.status(200).json({ message: "new book" });
});

booksRoute.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await db.users.findOne({ _id: new ObjectId(userId) });
    const bookIds = (user.book_ids || []).map((id) => new ObjectId(id));
    const booksCursor = db.books.find({ _id: { $in: bookIds } });
    const books = await booksCursor.toArray();

    // Recupera le immagini per ogni libro
    const booksWithImages = await Promise.all(
      books.map(async (book) => {
        const images = await db.images
          .find({ _id: { $in: book.images } })
          .toArray();
        return {
          ...book,
          images,
        };
      })
    );

    res.json(booksWithImages);
  } catch (err) {
    console.error("Errore durante il recupero dei libri:", err);
    res.status(500).json({ error: "Errore durante il recupero dei libri" });
  }
});

booksRoute.get("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID del libro non valido" });
    }
    const query = { _id: new ObjectId(id), owner_id: new ObjectId(userId) };

    const book = await db.books.findOne(query);
    if (!book) {
      return res.status(404).json({ error: "Libro non trovato" });
    }

    // Recupera le immagini collegate al libro
    const images = await db.images
      .find({ _id: { $in: book.images } })
      .toArray();

    // Aggiungi i dettagli delle immagini al libro
    book.images = images;

    res.json(book);
  } catch (err) {
    console.log(err);
  }
});

booksRoute.post("/", upload.array("images", MAX_IMAGES), async (req, res) => {
  try {
    console.log("inizio caricamento del libro");
    const userId = req.user._id;
    const { title, comment, author } = req.body;

    // Crea un array per memorizzare gli ObjectId delle immagini
    const imageIds = [];

    // Gestisci le immagini se presenti
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        console.log("caricamento immagine", file.filename);
        const image = {
          filename: file.filename,
          path: `/uploads/images/${file.filename}`,
          mimetype: file.mimetype,
          size: file.size,
        };
        // Salva l'immagine nella collezione images
        const result = await db.images.insertOne(image);
        imageIds.push(result.insertedId); // Aggiungi l'ObjectId dell'immagine all'array
      }
    }

    // Crea il documento del libro, includendo gli ObjectId delle immagini
    const book = {
      title,
      comment,
      author,
      owner_id: new ObjectId(userId),
      images: imageIds, // Aggiungi gli ObjectId delle immagini al libro
    };

    // Inserisci il libro nel database
    const bookResult = await db.books.insertOne(book);
    console.log("libro creato con id", bookResult.insertedId);

    // Aggiorna l'utente con l'ID del libro
    await db.users.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { book_ids: bookResult.insertedId } }
    );

    res.json({
      acknowledged: bookResult.acknowledged,
      insertedId: bookResult.insertedId,
      imageIds,
      redirectUrl: "/books",
    });
  } catch (err) {
    console.error("Errore durante l'invio del libro e dell'immagine:", err);
    res
      .status(500)
      .json({ error: "Errore durante l'invio del libro e dell'immagine" });
  }
});

booksRoute.delete("/:id", async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  const query = { _id: new ObjectId(id), owner_id: new ObjectId(userId) };
  try {
    const result = await db.books.deleteOne(query);

    if (result.deletedCount === 1) {
      await db.users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { book_ids: new ObjectId(id) } }
      );
      return res.status(200).json({ success: true });
    }

    return res
      .status(404)
      .json({ success: false, message: "Book not found or not owned by user" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

booksRoute.put("/:id", upload.array("images", 4), async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Assicurati che req.user sia impostato dal middleware di autenticazione
  const { title, comment, author } = req.body;

  // Verifica se l'ID è valido
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID non valido" });
  }

  try {
    const bookId = new ObjectId(id);

    // Trova il libro per ID e owner_id
    const book = await db.books.findOne({
      _id: bookId,
      owner_id: new ObjectId(userId),
    });

    if (!book) {
      return res.status(404).json({ message: "Libro non trovato" });
    }

    // Prepara i dati per l'aggiornamento
    const updateData = {
      ...(title && { title }),
      ...(comment && { comment }),
      ...(author && { author }),
    };

    // Gestisci i caricamenti delle immagini
    if (req.files && req.files.length > 0) {
      const newImageIds = [];

      for (const file of req.files) {
        const image = {
          filename: file.filename,
          path: `/uploads/images/${file.filename}`,
          mimetype: file.mimetype,
          size: file.size,
        };
        // Salva l'immagine nella collezione images
        const result = await db.images.insertOne(image);
        newImageIds.push(result.insertedId); // Aggiungi l'ObjectId dell'immagine all'array
      }

      // Aggiungi le nuove immagini alla lista esistente
      updateData.images = [...(book.images || []), ...newImageIds];
    }

    // Aggiorna il documento del libro
    await db.books.updateOne({ _id: bookId }, { $set: updateData });

    res
      .status(200)
      .json({ success: true, message: "Libro aggiornato con successo" });
  } catch (err) {
    console.error("Errore durante l'aggiornamento del libro:", err);
    res.status(500).json({ message: "Errore del server" });
  }
});

module.exports = booksRoute;
