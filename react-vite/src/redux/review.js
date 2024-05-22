
const GET_REVIEW_BY_ID = 'review/GET_REVIEWS_BY_BUSINESS_ID';
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const EDIT_REVIEW_BY_ID = 'review/EDIT_REVIEW_BY_ID'
const DELETE_REVIEW_BY_ID = 'review/DELETE_REVIEW_BY_ID'

const getReviewById = (review) => ({
    type: GET_REVIEW_BY_ID,
    review,
});

const createReview= (review) => ({
    type: GET_REVIEW_BY_ID,
    review,
  });  

const editReviewById = (review) => ({
    type: EDIT_REVIEW_BY_ID,
    review,
  });

const deleteReviewById = (review) => ({
    type: DELETE_REVIEW_BY_ID,
    review
  });

export const getReviewByIdThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`);
  const data = await response.json();
  if (response.ok) dispatch(getReviewById(data));
  return data;
};


  export const createReviewThunk = (id,review) => async (dispatch) => {
    const response = await fetch(`/api/bus/${id}/reviews/new`,{
        method:'POST',
        body: JSON.stringify(review)
    });
    const data = await response.json();
    if (response.ok) dispatch(createReview(data));
    return data;
  };

export const editReviewByIdThunk = (id,review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`,{
        method:'PUT',
        body: JSON.stringify(review)
    });
    const data = await response.json();
    if (response.ok) dispatch(editReviewById(data));
    return data;
  };

  export const deleteReviewByIdThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`,{
        method:'DELETE'
    });
    const data = await response.json();
    if (response.ok) dispatch(deleteReviewById(data));
    return data;
  };
  
const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_BY_ID:
      return { ...state, review: action.review };
    case CREATE_REVIEW:
        return { ...state, review: action.review };
    case EDIT_REVIEW_BY_ID:
        return { ...state, review: action.review };
    case DELETE_REVIEW_BY_ID:
        return { ...state, review: action.review };
    default:
      return state;
  }
};
export default reviewReducer;
