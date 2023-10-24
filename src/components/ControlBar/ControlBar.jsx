import { Badge, Tooltip, Typography } from '@mui/material';
import css from './ControlBar.module.css';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFetching } from '../../store/stockData/actionCreators';

export const ControlBar = () => {
	const { watchingGroup } = useSelector((state) => state.stockData);
	const dispatch = useDispatch();

	const stopFetching = () => {
		dispatch(setIsFetching(false));
	};

	const startFetching = () => {
		dispatch(setIsFetching(true));
	};

	return (
		<>
			<div className={css.controlBar}>
				<Tooltip
					title={<Typography fontSize={20}>Continue</Typography>}
					placement='top'
				>
					<button onClick={startFetching} className={css.buttonStop}>
						<ReplayIcon fontSize='large' />
					</button>
				</Tooltip>
				<Tooltip
					title={<Typography fontSize={20}>Stop</Typography>}
					placement='top'
				>
					<button onClick={stopFetching} className={css.buttonStop}>
						<PauseIcon fontSize='large' />
					</button>
				</Tooltip>
				<div className={css.stockWatchingGroup}>
					<Badge
						badgeContent={watchingGroup.length}
						sx={{
							'& .MuiBadge-badge': {
								backgroundColor: '#5abde2',
								fontSize: '.5em',
								fontWeight: 'bold',
							},
						}}
						showZero
					>
						<p className={css.watchingGroupText}>Watching Group</p>
					</Badge>
				</div>
			</div>
		</>
	);
};
