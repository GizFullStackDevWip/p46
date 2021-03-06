import * as actionTypes from "../action/actions";

const initial_state = {
  login: false,
  showId: "",
  addToMyList: false,
  signInBlock: false,
  isAndroid: false,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        login: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        login: false,
      };
    case actionTypes.SHOW_ID:
      return {
        ...state,
        showId: action.payload,
      };
    case actionTypes.ADD_TO_MY_LIST:
      return {
        ...state,
        addToMyList: !state.addToMyList,
      };
    case actionTypes.SIGN_IN_BLOCK:
      return {
        ...state,
        signInBlock: !state.signInBlock,
      };
    case actionTypes.SET_ANDROID:
      return {
        ...state,
        isAndroid: true,
      };
    default:
      return state;
  }
};

export default reducer;
