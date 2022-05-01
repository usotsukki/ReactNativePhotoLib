export const GET_ITEMS = "GET_ITEMS";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

import axios from "axios";
import { BASE_URL } from "../config";

export const getItems = () => {
	try {
		return async (dispatch) => {
			const response = await axios.get(`${BASE_URL}`);
			if (response.data) {
				dispatch({
					type: GET_ITEMS,
					payload: response.data,
				});
			} else {
				console.log("Unable to fetch data from the API BASE URL!");
			}
		};
	} catch (error) {
		console.log("Error with fetching");
	}
};

export const like = (item) => (dispatch) => {
	dispatch({
		type: ADD_TO_FAVORITES,
		payload: item,
	});
};

export const dislike = (item) => (dispatch) => {
	dispatch({
		type: REMOVE_FROM_FAVORITES,
		payload: item,
	});
};
