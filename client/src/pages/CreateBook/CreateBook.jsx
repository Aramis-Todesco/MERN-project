import styles from "./CreateBook.module.css";
import CreateBookForm from "../../modules/CreateBookForm/CreateBookForm.jsx";

function CreateBook() {
  return (
    <main className="form-main">
      <section className={styles["create-book-container"]}>
        <CreateBookForm />
      </section>
    </main>
  );
}

export default CreateBook;
