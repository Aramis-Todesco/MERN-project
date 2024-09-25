const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const handleRemoveNewImage = (index, state, dispatch) => {
  const updatedPreviews = state.newImagePreviews.filter((_, i) => i !== index);
  const updatedImages = state.selectedImages.filter((_, i) => i !== index);

  dispatch({
    type: "SET_NEW_IMAGE_PREVIEWS",
    payload: updatedPreviews,
  });

  dispatch({
    type: "SET_SELECTED_IMAGES",
    payload: updatedImages,
  });
};

export const handleImageChange = (e, state, dispatch) => {
  const selectedFilesArray = Array.from(e.target.files);

  const imagesArray = selectedFilesArray.map((file) => {
    return URL.createObjectURL(file);
  });

  dispatch({
    type: "SET_SELECTED_IMAGES",
    payload: [...state.selectedImages, ...selectedFilesArray],
  });

  dispatch({
    type: "SET_NEW_IMAGE_PREVIEWS",
    payload: [...state.newImagePreviews, ...imagesArray],
  });
};

export const handleRemoveExistingImage = (imageId, state, dispatch, _id) => {
  const imgToRemove = state.existingImages.find((img) => img._id === imageId);
  const updatedImages = state.existingImages.filter(
    (img) => img._id !== imageId
  );

  dispatch({ type: "SET_EXISTING_IMAGES", payload: updatedImages });

  fetch(`${backendUrl}/api/images/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageId }),
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!data.success) {
        console.log("Errore nella rimozione", data.message);
        dispatch({
          type: "SET_EXISTING_IMAGES",
          payload: [...state.existingImages, imgToRemove],
        });
      } else {
        console.log(data.message);
      }
    })
    .catch((err) => {
      console.log("Request failed", err);
      dispatch({
        type: "SET_EXISTING_IMAGES",
        payload: [...state.existingImages, imgToRemove],
      });
    });
};
