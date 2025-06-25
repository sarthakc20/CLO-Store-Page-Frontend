import {
  CONTENT_LIST_REQUEST,
  CONTENT_LIST_SUCCESS,
  CONTENT_LIST_FAIL,
} from "../constants/contentConstants";

const initialState = {
  loading: false,
  contents: [],
  error: null,
};

export const contentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_LIST_REQUEST:
      return { ...state, loading: true };

    case CONTENT_LIST_SUCCESS:
      return { loading: false, contents: action.payload, error: null };

    case CONTENT_LIST_FAIL:
      return { loading: false, contents: [], error: action.payload };

    default:
      return state;
  }
};
