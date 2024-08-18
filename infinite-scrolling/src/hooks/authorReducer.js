import { actionTypes } from "./actionTypes";

export const authorReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SUCCESS:
      return {
        ...state,
        isLoading: false,
        authorList: action?.payload?.authors,
        hasMore: action?.payload?.hasMore,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: true,
        isLoading:false
      };
    default:
      return state;
  }
};
