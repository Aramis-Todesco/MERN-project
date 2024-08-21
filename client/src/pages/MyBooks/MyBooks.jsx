import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ManyBooks from "../../modules/ManyBooks/ManyBooks.jsx";
import OneBook from "../../modules/OneBook/OneBook.jsx";
import NoBooks from "../../modules/NoBooks/NoBooks.jsx";
import { handleDeleteBook } from "../../utils/handleBook.js"; // Importa la funzione
import { useScroll } from "../../context/ScrollContext.jsx";

function MyBooks() {
  const loadedBook = useLoaderData();
  const { scrollPositionRef } = useScroll();

  const [books, setBooks] = useState(
    Array.isArray(loadedBook) ? loadedBook : []
  );

  useEffect(() => {
    if (Array.isArray(loadedBook)) {
      setBooks(loadedBook);
    }
  }, [loadedBook]);

  const handleDelete = (_id) => {
    // Salva la posizione di scorrimento prima di aggiornare lo stato
    scrollPositionRef.current = window.scrollY;

    // Usa la funzione handleDeleteBook per gestire l'eliminazione
    handleDeleteBook(books, setBooks, _id);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      {books.length > 1 ? (
        <ManyBooks
          truncateText={truncateText}
          handleDelete={handleDelete}
          books={books}
        />
      ) : books.length === 1 ? (
        <OneBook
          truncateText={truncateText}
          handleDelete={handleDelete}
          books={books}
        />
      ) : (
        <NoBooks />
      )}
    </>
  );
}

export default MyBooks;
