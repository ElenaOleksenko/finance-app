import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setIsFetching, setStockData } from './store/stockData/actionCreators';
import { StockComponent } from './components/StockComponent/StockComponent';
import { baseUrl, titleArray } from './constants/constants';
import css from './App.module.css';
import { ControlBar } from './components/ControlBar/ControlBar';

function App() {
	const dispatch = useDispatch();
	const { isFetching, stockData, numberOfWatchLiasts } = useSelector(
		(state) => state.stockData
	);

	useEffect(() => {
		const socket = io.connect(baseUrl);
		socket.emit('start');

		const handleTickerData = (response) => {
			if (isFetching) {
				console.log('Отримано дані з сервера:', response);
				dispatch(setStockData(response));
			}
		};

		socket.on('ticker', handleTickerData);

		return () => {
			socket.off('ticker', handleTickerData);
			socket.disconnect();
		};
	}, [isFetching, dispatch]);

	return (
		<div className={css.stockWrapper}>
			<ControlBar />
			<div className={css.stockHeaderWrapper}>
				<div className={css.stockHeaderContainer}>
					{titleArray.map((el) => {
						return <div key={el.id}>{el.title}</div>;
					})}
				</div>
			</div>
			<ul className={css.stockContainer}>
				{stockData.map((data, index) => {
					return <StockComponent key={index} data={data} />;
				})}
			</ul>
		</div>
	);
}

export default App;
