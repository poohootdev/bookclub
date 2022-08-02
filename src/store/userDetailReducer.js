const SET_USER_DETAIL = 'SET_USER_DETAIL';
const CLEAR_USER_DETAIL = 'CLEAR_USER_DETAIL';

export const setUserDetail = (userDetail) => ({ type: SET_USER_DETAIL, currentUserDetail: userDetail });
export const clearUserDetail = () => ({ type: CLEAR_USER_DETAIL });

const initialState = {
  currentUserDetail: null,
};

const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAIL:
      return {
        currentUserDetail: action.currentUserDetail,
      };
    case CLEAR_USER_DETAIL:
      return {
        currentUserDetail: null,
      };
    default:
      return state;
  }
};

export default userDetailReducer;
