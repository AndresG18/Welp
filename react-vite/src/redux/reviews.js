
const GET_REVIEWS_BY_BUSINESS_ID = 'reviews/GET_REVIEWS_BY_BUSINESS_ID';

const getReviewsByBusinessId = (reviews) => ({
  type: GET_REVIEWS_BY_BUSINESS_ID,
  reviews,
});

export const getReviewsByBusinessIdThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/bus/${id}/reviews`);
  const data = await response.json();
  if (response.ok) dispatch(getReviewsByBusinessId(data));
  return data;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_BUSINESS_ID:
      return { ...state, reviews: action.reviews };
    default:
      return state;
  }
};
export default reviewsReducer;
