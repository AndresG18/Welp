
const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_CURRENT_BUSINESSES = 'businesses/GET_CURRENT_BUSINESSES';

const getAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  businesses,
});

const getCurrentBusinesses = (businesses) => ({
  type: GET_CURRENT_BUSINESSES,
  businesses,
});

export const getAllBusinessesThunk = (page,size) => async (dispatch) => {
  if(page && size){
    const response = await fetch(`/api/bus?page=${page}&size=${size}`);
  const data = await response.json();
  if (response.ok) dispatch(getAllBusinesses(data));
  return data;
  }
  const response = await fetch('/api/bus');
  const data = await response.json();
  if (response.ok) dispatch(getAllBusinesses(data));
  return data;
};

export const getCurrentBusinessesThunk = () => async (dispatch) => {
  const response = await fetch('/api/bus/current');
  const data = await response.json();
  if (response.ok) dispatch(getCurrentBusinesses(data));
  return data;
};

const initialState = {};

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BUSINESSES:
      return { ...state, Businesses: action.businesses };
    case GET_CURRENT_BUSINESSES:
      return { ...state, currentBusinesses: action.businesses };
    default:
      return state;
  }
};

export default businessesReducer;
