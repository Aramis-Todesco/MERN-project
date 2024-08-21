import styles from "./FileInput.module.css";
function FileInput({ id, onChange }) {
  return (
    <label htmlFor={id} className={styles.label}>
      <img
        className={styles["add-image"]}
        src="../../../add-image.svg"
        alt=""
      />
      <input
        className={styles["image-input"]}
        type="file"
        name="images"
        id={id}
        onChange={onChange}
        multiple
      />
    </label>
  );
}

export default FileInput;
