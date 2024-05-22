
const GET_IMAGES_BY_BUSINESS_ID = 'images/GET_IMAGES_BY_BUSINESS_ID';

const getImagesByBusinessId = (images) => ({
    type: GET_IMAGES_BY_BUSINESS_ID,
    images,
});

export const getImagesByBusinessIdThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/bus/${businessId}/images`);
    const data = await response.json();
    if (response.ok) dispatch(getImagesByBusinessId(data));
    return data;
};

const initialState = {};
const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES_BY_BUSINESS_ID:
            return { ...state, images: action.images };
        default:
            return state;
    }
};

export default imagesReducer