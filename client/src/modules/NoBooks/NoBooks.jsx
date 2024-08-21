import styles from "./NoBooks.module.css";
import { Link } from "react-router-dom";

function NoBooks() {
  return (
    <main className="form-main">
      <div className={styles["no-books-wrapper"]}>
        <p className={styles["no-books-paragraph"]}>
          &quot;We lose ourselves in books, <br />
          we find ourselves there too.&quot;
        </p>
        <Link to={"/create-book"} className={styles.link}>
          Add your first book
        </Link>
      </div>
    </main>
  );
}

export default NoBooks;
