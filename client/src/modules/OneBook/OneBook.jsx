import BookButton from "../BookButtons/BookButton.jsx";
import BookInfo from "../BookInfo/BookInfo.jsx";
import { FaReadme } from "react-icons/fa";
import styles from "./OneBook.module.css";
import { Link } from "react-router-dom";

function OneBook({ truncateText, books, handleDelete }) {
  return (
    <main className={styles["book-main"]}>
      <section className={styles["book-wrapper"]}>
        {books.map((book) => (
          <div key={book._id} className={styles.card}>
            <div className={styles["book-link"]}>
              <div className={styles["book-icon-wrapper"]}>
                <Link to={`/books/${book._id}`}>
                  <FaReadme className={styles["book-icon"]} />
                </Link>
              </div>

              {book.images && book.images.length > 0 ? (
                <div className={styles["book-image-wrapper"]}>
                  <img
                    src={`http://localhost:5000${book.images[0].path}`}
                    alt={`Copertina per ${book.title}`}
                    className={styles["book-image"]}
                    width={100}
                    height={100}
                  />
                </div>
              ) : (
                <div className={styles["book-no-image-wrapper"]}>
                  <img
                    src="../../../public/no-images.svg"
                    alt=""
                    className={styles["book-image"]}
                  />
                </div>
              )}
            </div>
            <div className={styles["book-info-button-container"]}>
              <BookInfo
                title={book.title}
                author={book.author}
                comment={truncateText(book.comment, 60)}
              />
              <BookButton
                onClick={() => handleDelete(book._id)}
                to={`/update/${book._id}`}
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default OneBook;
