const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const handleCreateBook = async (e, state, dispatch) => {
  e.preventDefault();
  const form = e.target;

  // Raccolta dei dati del libro
  const title = state.title;
  const comment = state.comment;
  const author = state.author;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("comment", comment);
  formData.append("author", author);
  state.selectedImages.forEach((image) => {
    formData.append("images", image);
  });

  // Invio dei dati del libro e dell'immagine
  try {
    const response = await fetch(`${backendUrl}/api/books`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = await response.json();
    if (data.acknowledged) {
      form.reset();
      console.log("Resettando lo stato delle immagini...");
      dispatch({ type: "SET_SELECTED_IMAGES", payload: [] });
      dispatch({ type: "SET_NEW_IMAGE_PREVIEWS", payload: [] });
      dispatch({ type: "SET_REDIRECT", payload: data.redirectUrl });
    }

    console.log("Risposta dal server:", data);
  } catch (err) {
    console.error("Errore durante l'invio del libro e dell'immagine:", err);
  }
};
// utils/handleDeleteBook.js
export const handleDeleteBook = (books, setBooks, _id) => {
  const updatedBooks = books.filter((book) => book._id !== _id);
  setBooks(updatedBooks);

  fetch(`${backendUrl}/api/books/${_id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        console.log("Book deleted successfully:", _id);
      } else {
        console.error("Failed to delete book:", data.message);
        // Se l'eliminazione dal server fallisce, riaggiungi il libro allo stato
        setBooks((prevBooks) => [
          ...prevBooks,
          books.find((book) => book._id === _id),
        ]);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the delete request:", error);
      // Riaggiungi il libro se si è verificato un errore
      setBooks((prevBooks) => [
        ...prevBooks,
        books.find((book) => book._id === _id),
      ]);
    });
};

/* export const handleDeleteBook = (books, setBooks, _id) => {
  const updatedBooks = books.filter((book) => book._id !== _id);
  setBooks(updatedBooks);

  fetch(`http://localhost:5000/api/books/${_id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        console.log("Book deleted successfully:", _id);
      } else {
        console.error("Failed to delete book:", data.message);
        // Se l'eliminazione dal server fallisce, riaggiungi il libro allo stato
        setBooks((prevBooks) => [
          ...prevBooks,
          books.find((book) => book._id === _id),
        ]);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the delete request:", error);
      // Riaggiungi il libro se si è verificato un errore
      setBooks((prevBooks) => [
        ...prevBooks,
        books.find((book) => book._id === _id),
      ]);
    });
}; */

export const handleUpdateBook = (
  e,
  state,
  dispatch,
  _id,
  setErrorMsg,
  setSpanMessage
) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", state.currentTitle);
  formData.append("comment", state.currentComment);
  formData.append("author", state.currentAuthor);

  state.selectedImages.forEach((image) => {
    formData.append("images", image);
  });

  fetch(`${backendUrl}/api/books/${_id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        dispatch({ type: "SET_REDIRECT", payload: true });
      } else {
        setErrorMsg(data.message);
        setSpanMessage(data.spanMessage);
        console.log("Errore", data.message);
      }
    })
    .catch((err) => console.log(err));
};
