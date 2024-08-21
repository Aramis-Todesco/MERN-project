import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBooks } from "../../context/BookContext.jsx";
import styles from "./MyBook.module.css";
import BookInfo from "../../modules/BookInfo/BookInfo.jsx";
import CarouselImages from "../../modules/CarouselImages/CarouselImages.jsx";
import NoImages from "../../modules/NoImages/NoImages.jsx";
import { TbBackspaceFilled } from "react-icons/tb";

function MyBook() {
  const { id } = useParams();
  const { books, loading, error, fetchBooks } = useBooks(); // Usa fetchBooks

  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      await fetchBooks(); // Ricarica i dati dei libri
    };
    loadBook();
  }, [fetchBooks]);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = books.find((b) => b._id === id);
      if (foundBook) {
        setBook(foundBook);
      }
    }
  }, [books, id]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  if (!book) {
    return <div>Libro non trovato</div>;
  }

  const { title, author, comment, images } = book;

  return (
    <main className={styles["book-main"]}>
      <section className={styles["book-wrapper"]}>
        <div className={styles["book-container"]}>
          <div className={styles["back-icon-wrapper"]}>
            <Link to="/books" className={styles["back-icon-link"]}>
              <TbBackspaceFilled className={styles["back-icon"]} />
            </Link>
          </div>
          <div className={styles["book-images"]}>
            {images && images.length > 0 ? (
              images.length > 1 ? (
                <CarouselImages currentImageOrder={images} />
              ) : (
                <div className={styles["book-image-container"]}>
                  <img
                    src={`http://localhost:5000${images[0]?.path}`}
                    className={styles["book-image"]}
                    alt="Book"
                  />
                </div>
              )
            ) : (
              <NoImages />
            )}
          </div>
          <div className={styles["book-info"]}>
            <BookInfo title={title} author={author} comment={comment} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyBook;
