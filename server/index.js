const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const db = require("./utils/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const usersRoute = require("./routes/usersRoute.js");
const booksRoute = require("./routes/booksRoute.js");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("node:fs");
const checkAuth = require("./middleware/checkAuth.js");
const imagesRoute = require("./routes/imagesRoute.js");

const app = express();
const port = process.env.PORT || 5000;
const requestsStream = fs.createWriteStream("./logs/requests.log", {
  flags: "w",
});

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"], // Permetti solo il contenuto dallo stesso dominio
      scriptSrc: ["'self'", "https://trusted-cdn.com"], // Permetti script dal dominio corrente e da un CDN affidabile
      styleSrc: ["'self'", "https://trusted-cdn.com"], // Permetti stili dal dominio corrente e da un CDN affidabile
      imgSrc: ["'self'", "http://localhost:5000"], // Permetti immagini dal dominio corrente e dal tuo server di immagini
      connectSrc: ["'self'"], // Permetti connessioni (AJAX, WebSockets) solo dal dominio corrente
      fontSrc: ["'self'"], // Permetti font dal dominio corrente
      frameSrc: ["'none'"], // Non permettere iframe
    },
  })
);
app.use(
  morgan("combined", {
    stream: requestsStream,
    skip: (req, res) => res.statusCode < 400,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);

app.use("/uploads/images", express.static("uploads/images"));

const mongoClient = new MongoClient(process.env.DB_URL);

const connect = async () => {
  try {
    await mongoClient.connect();
    console.log("Connessione a MongoDB avvenuta");
    db.MyBookshelf = mongoClient.db("MyBookshelf");
    db.users = db.MyBookshelf.collection("users");
    db.books = db.MyBookshelf.collection("books");
    db.images = db.MyBookshelf.collection("images");

    app.use("/api/users", usersRoute);
    app.use("/api/books", checkAuth, booksRoute);
    app.use("/api/images", checkAuth, imagesRoute);

    app.listen(port, () => {
      console.log("Server in ascolto sulla porta: " + port);
    });
  } catch (err) {
    console.error("Errore di connessione al database", err);
  }
};

connect().catch((err) => console.log(err));
