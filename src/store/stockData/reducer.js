const initialState = {
	isFetching: true,
	stockData: [],
	error: null,
	watchingGroup: [],
	// numberOfWatchLiasts: 0,
};

const stockReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_IS_FETCHING':
			return { ...state, isFetching: action.payload };

		case 'SET_STOCK_DATA':
			return { ...state, stockData: action.payload };

		// case 'SET_PREV_PRICE':
		// 	return { ...state, prevPrice: action.payload };

		case 'SET_WATCHING_GROUP':
			return {
				...state,
				watchingGroup: [...state.watchingGroup, action.payload],
			};
		case 'SET_DELETE_WATCHING_GROUP':
			return {
				...state,
				watchingGroup: [
					...state.watchingGroup.filter(
						(group) => group.ticker !== action.payload
					),
				],
			};

		default:
			return state;
	}
};

export default stockReducer;
