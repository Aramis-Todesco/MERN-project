// src/modules/UpdateForm/UpdateForm.jsx
import { useId, useReducer, useState } from "react";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import BookInput from "../Inputs/BookInput.jsx";
import FileInput from "../Inputs/FileInput.jsx";
import DeleteImageButton from "../DeleteImageButton/DeleteImageButton.jsx";
import styles from "./UpdateForm.module.css";
import { useBooks } from "../../context/BookContext.jsx"; // Importa il contesto
import ErrorBookForm from "../ErrorsForms/ErrorBookForm.jsx";

import {
  handleImageChange,
  handleRemoveExistingImage,
  handleRemoveNewImage,
} from "../../utils/handleImage.js";
import { handleUpdateBook } from "../../utils/handleBook.js";

const initialState = {
  currentTitle: "",
  currentComment: "",
  currentAuthor: "",
  selectedImages: [],
  newImagePreviews: [],
  existingImages: [],
  redirect: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, currentTitle: action.payload };
    case "SET_COMMENT":
      return { ...state, currentComment: action.payload };
    case "SET_AUTHOR":
      return { ...state, currentAuthor: action.payload };
    case "SET_SELECTED_IMAGES":
      return { ...state, selectedImages: action.payload };
    case "SET_NEW_IMAGE_PREVIEWS":
      return { ...state, newImagePreviews: action.payload };
    case "SET_EXISTING_IMAGES":
      return { ...state, existingImages: action.payload };
    case "SET_REDIRECT":
      return { ...state, redirect: action.payload };
    default:
      throw new Error("Azione non gestita nel reducer");
  }
}

function UpdateForm() {
  const loader = useLoaderData();
  const idPrefix = useId();
  const { title, comment, author, _id, images } = loader;
  const [errorMsg, setErrorMsg] = useState("");
  const [spanMessage, setSpanMessage] = useState("");
  const { fetchBooks } = useBooks();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currentTitle: title,
    currentComment: comment,
    currentAuthor: author,
    existingImages: images,
  });

  const handleSubmit = async (e) => {
    await handleUpdateBook(
      e,
      state,
      dispatch,
      _id,
      setErrorMsg,
      setSpanMessage
    );
    fetchBooks();
  };

  if (state.redirect) {
    return <Navigate to={"/books"} />;
  }

  return (
    <fieldset className={styles["update-wrapper"]}>
      <div className={styles["update-form"]}>
        <form onSubmit={handleSubmit}>
          <BookInput
            type="text"
            name="title"
            id={idPrefix + "-title"}
            value={state.currentTitle}
            placeholder="New book title"
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
          />

          <BookInput
            type="text"
            name="author"
            id={idPrefix + "-author"}
            placeholder="New author name"
            value={state.currentAuthor}
            onChange={(e) =>
              dispatch({ type: "SET_AUTHOR", payload: e.target.value })
            }
          />

          <textarea
            type="text"
            name="comment"
            id={idPrefix + "-comment"}
            placeholder="New book comment"
            value={state.currentComment}
            onChange={(e) =>
              dispatch({ type: "SET_COMMENT", payload: e.target.value })
            }
          />

          <FileInput
            type="file"
            name="images"
            id={idPrefix + "-images"}
            multiple
            onChange={(e) => handleImageChange(e, state, dispatch)}
          />

          {state.newImagePreviews.length > 0 && (
            <div className="hidden">
              <ErrorBookForm spanMessage={spanMessage} errorMsg={errorMsg} />
            </div>
          )}

          <div className={styles["images-wrapper"]}>
            {state.existingImages.map((img, i) => (
              <div key={i} className={styles["update-image-container"]}>
                <img
                  src={`http://localhost:5000${img.path}`}
                  alt={`Immagine per ${loader.title}`}
                  width={100}
                  height={100}
                  className={styles["update-image"]}
                />
                <DeleteImageButton
                  onClick={() =>
                    handleRemoveExistingImage(img._id, state, dispatch, _id)
                  }
                />
              </div>
            ))}

            {state.newImagePreviews.map((preview, i) => (
              <div key={i} className={styles["update-image-container"]}>
                <img
                  src={preview}
                  alt=""
                  width={100}
                  height={100}
                  className={styles["update-image"]}
                />
                <DeleteImageButton
                  onClick={() => handleRemoveNewImage(i, state, dispatch)}
                />
              </div>
            ))}
          </div>
          <div className={styles["button-link-form"]}>
            <Button text="Update" />
            <Link to={"/books"} className={styles["back-link"]}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </fieldset>
  );
}

export default UpdateForm;
