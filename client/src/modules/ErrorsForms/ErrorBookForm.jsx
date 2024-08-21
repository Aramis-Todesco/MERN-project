import styles from "./ErrorsForms.module.css";

function ErrorBookForm({ setSpanMessage }) {
  return (
    <div className={styles["error-message-container"]}>
      <p className={styles["error-message"]}>
        You can&apos;t have more than 4 images
      </p>
      <span>{setSpanMessage}</span>
    </div>
  );
}

export default ErrorBookForm;
