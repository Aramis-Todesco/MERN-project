import { useId, useReducer } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import styles from "./CreateBookForm.module.css";
import { handleCreateBook } from "../../utils/handleBook.js";
import {
  handleRemoveNewImage,
  handleImageChange,
} from "../../utils/handleImage.js";
import BookInput from "../Inputs/BookInput.jsx";
import FileInput from "../Inputs/FileInput.jsx";
import DeleteImageButton from "../DeleteImageButton/DeleteImageButton.jsx";
import ErrorBookForm from "../ErrorsForms/ErrorBookForm.jsx";

// Stato iniziale per CreateBook
const initialState = {
  title: "",
  author: "",
  comment: "",
  selectedImages: [],
  newImagePreviews: [],
  redirect: false,
};

// Funzione reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_COMMENT":
      return { ...state, comment: action.payload };
    case "SET_SELECTED_IMAGES":
      return { ...state, selectedImages: action.payload };
    case "SET_NEW_IMAGE_PREVIEWS":
      return { ...state, newImagePreviews: action.payload };
    case "SET_REDIRECT":
      return { ...state, redirect: action.payload };
    default:
      throw new Error("Azione non gestita nel reducer");
  }
}

function CreateBook() {
  const idPrefix = useId();
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.redirect) {
    return <Navigate to={state.redirect} />;
  }

  return (
    <fieldset className={styles["create-book-wrapper"]}>
      <div className={styles["create-book-form"]}>
        <legend className={styles["form-title"]}>Add new book</legend>
        <form onSubmit={(e) => handleCreateBook(e, state, dispatch)}>
          <BookInput
            type="text"
            id={`${idPrefix}-title`}
            name="title"
            placeholder="Book title"
            value={state.title}
            required
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
          />
          <BookInput
            type="text"
            id={`${idPrefix}-author`}
            name="author"
            placeholder="Author name"
            value={state.author}
            required
            onChange={(e) =>
              dispatch({ type: "SET_AUTHOR", payload: e.target.value })
            }
          />
          <textarea
            id={`${idPrefix}-comment`}
            name="comment"
            placeholder="Book comment"
            value={state.comment}
            onChange={(e) =>
              dispatch({ type: "SET_COMMENT", payload: e.target.value })
            }
          />

          <FileInput
            type="file"
            name="images"
            id={`${idPrefix}-images`}
            multiple
            onChange={(e) => handleImageChange(e, state, dispatch)}
          />

          {state.newImagePreviews.length > 4 && (
            <div className="hidden">
              <ErrorBookForm />
            </div>
          )}

          <div className={styles["images-wrapper"]}>
            {state.newImagePreviews.length > 0 &&
              state.newImagePreviews.map((preview, i) => (
                <div key={i} className={styles["create-book-image-container"]}>
                  <img
                    src={preview}
                    alt=""
                    width={100}
                    height={100}
                    className={styles["create-book-image"]}
                  />
                  <DeleteImageButton
                    onClick={() => handleRemoveNewImage(i, state, dispatch)}
                  />
                </div>
              ))}
          </div>
          <div className={styles["button-link-form"]}>
            <Button text="Add book" />
            <Link to={"/books"}>Go back</Link>
          </div>
        </form>
      </div>
    </fieldset>
  );
}

export default CreateBook;
