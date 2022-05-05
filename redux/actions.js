export const GET_ITEMS = "GET_ITEMS";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const SET_QUERY = "SET_QUERY";

export const getItems = (query) => {
	let q = query != undefined ? query : "cats";
	try {
		return async (dispatch) => {
			fetch(
				`https://pixabay.com/api/?key=27212666-b2564a47d1eca759cfaea187d&q=${q}&per_page=50`
			)
				.then((resp) => {
					return resp.json();
				})
				.then((data) => {
					dispatch({
						type: GET_ITEMS,
						payload: data.hits,
					});
				});
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
export const setQuery = (item) => (dispatch) => {
	dispatch({
		type: SET_QUERY,
		payload: item,
	});
};
