import axios from "axios";
import { useEffect, useReducer } from "react";
import { API_URL } from "../common/constants";
import { authorReducer } from "./authorReducer";
import { actionTypes } from "./actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  authorList: [],
  error: "",
  hasMore: true,
};

export const useAuthorList = (limit, page) => {
  const [authorListState, dispatch] = useReducer(authorReducer,INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: actionTypes.LOADING });
    setTimeout(() => {
      axios({
        method: "GET",
        url: API_URL,
        params: { limit: limit, page: page },
      })
        .then((res) => {
          dispatch({
            type: actionTypes.SUCCESS,
            payload: {
              authors: res?.data?.data,
              hasMore: res?.data?.data?.length === limit,
            },
          });
        })
        .catch((e) => dispatch(actionTypes.ERROR));
    }, 500);
  }, [limit, page]);

  return authorListState;
};
