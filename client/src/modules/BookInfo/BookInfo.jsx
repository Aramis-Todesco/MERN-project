import styles from "./BookInfo.module.css";

function BookInfo({ title, author, comment }) {
  return (
    <div className={styles["book-info"]}>
      <h5 className={styles["book-title"]}>{title}</h5>
      <h3 className={styles["book-author"]}>{author}</h3>
      <p className={styles["book-comment"]}>{comment}</p>
    </div>
  );
}

export default BookInfo;
