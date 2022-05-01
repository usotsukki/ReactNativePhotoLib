import { GET_ITEMS, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./actions";

const initialState = {
	items: [],
	favorites: [],
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

		default:
			return state;
	}
}

export default itemsReducer;
