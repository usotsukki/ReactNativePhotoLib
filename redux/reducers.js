import {
	GET_ITEMS,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
	SET_QUERY,
} from "./actions";

const initialState = {
	items: [],
	favorites: [],
	query: "",
};

function itemsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return { ...state, items: action.payload };

		case ADD_TO_FAVORITES:
			return { ...state, favorites: [...state.favorites, action.payload] };

		case REMOVE_FROM_FAVORITES:
			return {
				...state,
				favorites: state.favorites.filter(
					(item) => item.id != action.payload.id
				),
			};
		case SET_QUERY:
			return {
				...state,
				query: action.payload,
			};
		default:
			return state;
	}
}

export default itemsReducer;
