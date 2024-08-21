import UpdateForm from "../../modules/UpdateForm/UpdateForm.jsx";
import styles from "./UpdateBook.module.css";

function UpdateBook() {
  return (
    <main className="form-main">
      <section className={styles["update-container"]}>
        <UpdateForm />
      </section>
    </main>
  );
}

export default UpdateBook;
