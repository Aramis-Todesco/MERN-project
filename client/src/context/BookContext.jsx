// src/context/BooksContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const BooksContext = createContext({
  books: [],
  loading: true,
  error: null,
  fetchBooks: () => {},
});

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei libri");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error, fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

const useBooks = () => {
  return useContext(BooksContext);
};

export { BooksProvider, useBooks };
