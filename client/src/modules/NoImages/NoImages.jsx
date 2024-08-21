import styles from "./NoImages.module.css";

function NoImages() {
  return (
    <div className={styles["no-image-container"]}>
      <img src="../../../public/no-images.svg" alt="" />
    </div>
  );
}

export default NoImages;
