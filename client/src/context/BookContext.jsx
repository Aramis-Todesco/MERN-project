// src/context/BooksContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
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
      const response = await fetch(`${backendUrl}/api/books`, {
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

BooksProvider.propTypes = {
  children: PropTypes.node,
};

export { BooksProvider, useBooks };
