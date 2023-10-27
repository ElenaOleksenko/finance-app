import { useEffect, useState } from 'react';
import css from './Timer.module.css';
import { useSelector } from 'react-redux';

export const Timer = ({ timeCurr }) => {
	const [time, setTime] = useState(0);

	const { isFetching } = useSelector((state) => state.stockData);

	const getTime = () => {
		const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((time / 1000 / 60) % 60);
		const seconds = Math.floor((time / 1000) % 60);
		return { hours, minutes, seconds };
	};

	const { hours, minutes, seconds } = getTime();

	useEffect(() => {
		if (timeCurr && !isFetching) {
			setTime(timeCurr);
		} else {
			setTime(0);
		}
	}, [timeCurr, isFetching]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={css.timerContainer} role='timer'>
			<div>
				<div className={css.timerBox}>
					<p className={css.time}>{hours < 10 ? '0' + hours : hours}:</p>
				</div>
			</div>
			<div>
				<div className={css.timerBox}>
					<p className={css.time}>{minutes < 10 ? '0' + minutes : minutes}:</p>
				</div>
			</div>
			<div>
				<div className={css.timerBox}>
					<p className={css.time}>{seconds < 10 ? '0' + seconds : seconds}</p>
				</div>
			</div>
		</div>
	);
};
