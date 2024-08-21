import { Link } from "react-router-dom";
import BookButton from "../BookButtons/BookButton";
import styles from "./ManyBooks.module.css";
import BookInfo from "../BookInfo/BookInfo";
import { FaReadme } from "react-icons/fa";

function ManyBooks({ truncateText, handleDelete, books }) {
  return (
    <main>
      <section className={styles["books-container"]}>
        <div className={styles["books-wrapper"]}>
          {books.map((book) => (
            <div key={book._id} className={styles.card}>
              <div className={styles["book-link"]}>
                <div className={styles["book-icon-wrapper"]}>
                  <Link to={`/books/${book._id}`}>
                    <FaReadme className={styles["book-icon"]} />
                  </Link>
                </div>
                {book.images && book.images.length > 0 && (
                  <div className={styles["book-image-wrapper"]}>
                    <img
                      src={`http://localhost:5000${book.images[0].path}`}
                      alt={`Copertina per ${book.title}`}
                      className={styles["book-image"]}
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
              <div className={styles["book-info-button-container"]}>
                <BookInfo
                  title={book.title}
                  author={book.author}
                  comment={truncateText(book.comment, 68)}
                />
                <BookButton
                  onClick={() => handleDelete(book._id)}
                  to={`/update/${book._id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ManyBooks;
