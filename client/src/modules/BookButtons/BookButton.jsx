import { Link } from "react-router-dom";
import styles from "./BookButtons.module.css";

function BookButton({ onClick, to }) {
  return (
    <div className={styles["button-wrapper"]}>
      <button onClick={onClick} className={styles["delete-btn"]}>
        Delete
      </button>
      <Link to={to} className={styles["update-btn"]}>
        Update
      </Link>
    </div>
  );
}

export default BookButton;
