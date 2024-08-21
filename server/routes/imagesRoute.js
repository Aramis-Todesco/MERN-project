const express = require("express");
const db = require("../utils/db");
const { ObjectId } = require("mongodb");

const imagesRoute = express.Router();

imagesRoute.delete("/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const { imageId } = req.body;

  if (!ObjectId.isValid(bookId) || !ObjectId.isValid(imageId)) {
    return res.status(400).json({ message: "ID non valido" });
  }

  try {
    const bookObjectId = new ObjectId(bookId);
    const imageObjectId = new ObjectId(imageId);

    // Rimuovi l'immagine dal documento del libro
    await db.books.updateOne(
      { _id: bookObjectId },
      { $pull: { images: imageObjectId } }
    );

    // Rimuovi l'immagine dalla collezione delle immagini
    await db.images.deleteOne({ _id: imageObjectId });

    res
      .status(200)
      .json({ success: true, message: "Immagine rimossa con successo" });
  } catch (err) {
    console.error("Errore durante la rimozione dell'immagine:", err);
    res.status(500).json({ message: "Errore del server" });
  }
});

imagesRoute.get("/get-image", async (req, res) => {
  try {
    const images = await db.images.find({}).toArray();
    res.json({ data: images });
  } catch (err) {
    console.error("Errore durante il recupero delle immagini:", err);
    res.status(500).json({ error: "Impossibile recuperare le immagini" });
  }
});

module.exports = imagesRoute;
