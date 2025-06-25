import axios from "axios";
import {
  CONTENT_LIST_REQUEST,
  CONTENT_LIST_SUCCESS,
  CONTENT_LIST_FAIL,
} from "../constants/contentConstants";

export const listContents = () => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_LIST_REQUEST });

    const { data } = await axios.get(
      "https://closet-recruiting-api.azurewebsites.net/api/data"
    );

    dispatch({
      type: CONTENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTENT_LIST_FAIL,
      payload: error.message || "Failed to fetch data",
    });
  }
};
