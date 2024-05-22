
const CREATE_IMAGE = 'image/CREATE_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';
const GET_IMAGE_BY_ID = 'image/GET_IMAGE_BY_ID';

const createImage = (image) => ({
  type: CREATE_IMAGE,
  image,
});

const deleteImage = (image) => ({
  type: DELETE_IMAGE,
  image,
});

const getImageById = (image) => ({
    type: GET_IMAGE_BY_ID,
    image,
  });

export const getImageByIdThunk = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}`);
    const data = await response.json();
    if (response.ok) dispatch(getImageById(data));
    return data;
  };

export const createImageThunk = (id, imageData) => async (dispatch) => {
  const response = await fetch(`/api/bus/${id}/images/new`, {
    method: 'POST',
    headers:{ "Content-Type": "application/json" },
    body: JSON.stringify(imageData),
  });
  const data = await response.json();
  if (response.ok) dispatch(createImage(data));
  return data;
};

export const deleteImageThunk = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE',
  });
  const data = await response.json()
  if (response.ok) dispatch(deleteImage(data));
  return data
};


const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE_BY_ID:
        return { ...state, image: action.image };
    case CREATE_IMAGE:
      return { ...state, image: action.image };
    case DELETE_IMAGE:
      return { ...state, image: action.image };
    default:
      return state;
  }
};

export default imageReducer;