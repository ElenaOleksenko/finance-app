import { useDispatch, useSelector } from 'react-redux';
import { StockComponent } from '../../components/StockComponent/StockComponent';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { baseUrl, titleArray } from '../../constants/constants';
import { setWatchingGroup } from '../../store/stockData/actionCreators';
import css from './WatchingGroup.module.css';
import { GoBack } from '../../components/GoBack/GoBack';

export const WatchingGroup = () => {
	const { watchingGroup } = useSelector((state) => state.stockData);
	const dispatch = useDispatch();

	useEffect(() => {
		const socket = io.connect(baseUrl);
		socket.emit('start');

		const handleTickerData = (response) => {
			let watchListResult;
			const watchingGroupLoc = JSON.parse(localStorage.getItem(`watch_group`));
			watchingGroupLoc !== null
				? (watchListResult = watchingGroupLoc)
				: (watchListResult = watchingGroup);

			const watchList = response.reduce((result, item) => {
				const foundItem = watchListResult.find(
					(item2) => item.ticker === item2.ticker
				);
				if (foundItem) {
					result.push(item);
				}
				return result;
			}, []);
			dispatch(setWatchingGroup(watchList));
		};
		socket.on('ticker', handleTickerData);

		return () => {
			socket.off('ticker', handleTickerData);
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<>
			<div>
				<GoBack />
				<div className={css.stockHeaderWrapper}>
					<div className={css.stockHeaderContainer}>
						{titleArray.map((el) => {
							return <div key={el.id}>{el.title}</div>;
						})}
					</div>
				</div>
				{watchingGroup.length === 0 && (
					<div className={css.emptyListContainer}>
						You don't have any groups
					</div>
				)}

				{watchingGroup.length > 0 &&
					watchingGroup.map((data, index) => {
						return <StockComponent key={index} data={data} />;
					})}
			</div>
		</>
	);
};
