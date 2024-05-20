
const GET_BUSINESS_BY_ID = 'business/GET_BUSINESS_BY_ID';
const CREATE_BUSINESS = 'business/CREATE_BUSINESS';
const EDIT_BUSINESS = 'business/EDIT_BUSINESS'
const DELETE_BUSINESS = 'business/DELETE_BUSINESS'

const getBusinessById = (business) => ({
  type: GET_BUSINESS_BY_ID,
  business,
});

const createBusiness = (business) => ({
  type: CREATE_BUSINESS,
  business,
});

const editBusiness = (business) => ({
    type: EDIT_BUSINESS,
    business
})

const deleteBusiness = (business) => ({
    type: DELETE_BUSINESS,
    business
})

export const getBusinessByIdThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/bus/${id}`);
  const data = await response.json();
  if (response.ok) dispatch(getBusinessById(data));
  return data;
};

export const createBusinessThunk = (business) => async (dispatch) => {
  const response = await fetch('/api/bus/new', {
    method: 'POST',
    body: JSON.stringify(business),
  });
  const data = await response.json();
  if (response.ok) dispatch(createBusiness(data));
  return data;
};

export const editBusinessThunk = (id,business) => async (dispatch) =>{
    const response = await fetch(`api/bus/${id}`,{
        method: 'PUT',
        body:JSON.stringify(business)
    });
    const data = await response.json()
    if (response.ok) dispatch(editBusiness(data));
    return data;
}

export const deleteBusinessThunk = (id) => async (dispatch) =>{
    const response = await fetch(`api/bus/${id}`,{
        method: 'DELETE',
    });
    const data = await response.json()
    if (response.ok) dispatch(deleteBusiness(data));
    return data;
}

const initialState = {};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_BY_ID:
      return { ...state, business: action.business };
    case CREATE_BUSINESS:
      return { ...state, business: action.business };
    case EDIT_BUSINESS:
        return { ...state, business: action.business };
    default:
      return state;
  }
};

export default businessReducer;