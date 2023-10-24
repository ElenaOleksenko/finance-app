import {
	SET_DELETE_WATCHING_GROUP,
	SET_IS_FETCHING,
	SET_STOCK_DATA,
	SET_WATCHING_GROUP,
} from './actionTypes';

export const setIsFetching = (isFetching) => ({
	type: SET_IS_FETCHING,
	payload: isFetching,
});

export const setStockData = (data) => ({
	type: SET_STOCK_DATA,
	payload: data,
});

export const setWatchingGroup = (group) => ({
	type: SET_WATCHING_GROUP,
	payload: group,
});

export const setDeleteWatchingGroup = (name) => ({
	type: SET_DELETE_WATCHING_GROUP,
	payload: name,
});
