import { Badge, Tooltip, Typography } from '@mui/material';
import css from './ControlBar.module.css';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFetching } from '../../store/stockData/actionCreators';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Timer } from './components/Timer';

export const ControlBar = () => {
	const { isFetching } = useSelector((state) => state.stockData);
	const { watchingGroup } = useSelector((state) => state.stockData);
	const [timeCurr, setTimeCurr] = React.useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let watch_group;
	let watch_groupLoc = JSON.parse(localStorage.getItem(`watch_group`));
	watch_groupLoc !== null
		? (watch_group = watch_groupLoc)
		: (watch_group = watchingGroup);

	const stopFetching = () => {
		dispatch(setIsFetching(false));
		setTimeCurr(0);
	};

	const startFetching = () => {
		dispatch(setIsFetching(true));
	};

	const handleButtonClick = (time) => {
		dispatch(setIsFetching(false));
		setTimeout(() => {
			dispatch(setIsFetching(true));
		}, time);
	};

	const clickTime = (time) => {
		setTimeCurr(time);
	};

	return (
		<>
			<div className={css.controlBar}>
				<Tooltip
					title={<Typography fontSize={20}>Continue</Typography>}
					placement='top'
				>
					<button
						onClick={() => {
							startFetching();
						}}
						className={css.buttonStop}
						data-testid='start-button'
					>
						<ReplayIcon fontSize='large' />
					</button>
				</Tooltip>
				<Tooltip
					title={<Typography fontSize={20}>Stop</Typography>}
					placement='top'
				>
					<button
						onClick={() => {
							stopFetching();
						}}
						data-testid='stop-button'
						className={css[isFetching ? 'buttonStop' : 'buttonStopActive']}
					>
						<PauseIcon fontSize='large' />
					</button>
				</Tooltip>

				<PopupState variant='popover' popupId='demo-popup-menu'>
					{(popupState) => (
						<React.Fragment>
							<Button
								variant='contained'
								{...bindTrigger(popupState)}
								sx={{
									width: '150px',
									height: '50px',
									backgroundColor: '#c9ecf9',
									color: 'black',
									padding: '10px',
									boxShadow: 'none',
									borderRadius: '10px',
									fontSize: '25px',
									textTransform: 'none',
									':hover': {
										backgroundColor: '#c9ecf9',
										boxShadow: 'none',
									},
								}}
							>
								Timer
							</Button>
							<Menu {...bindMenu(popupState)}>
								<MenuItem
									onClick={() => {
										clickTime(5000);
										handleButtonClick(5000);
										popupState.close();
									}}
									sx={{ width: '150px', height: '50px', fontSize: '20px' }}
								>
									5S
								</MenuItem>
								<MenuItem
									onClick={() => {
										clickTime(15000);
										handleButtonClick(15000);
										popupState.close();
									}}
									sx={{ width: '150px', height: '50px', fontSize: '20px' }}
								>
									15S
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleButtonClick(30000);
										clickTime(30000);
										popupState.close();
									}}
									sx={{ width: '150px', height: '50px', fontSize: '20px' }}
								>
									30S
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleButtonClick(60000);
										clickTime(60000);
										popupState.close();
									}}
									sx={{ width: '150px', height: '50px', fontSize: '20px' }}
								>
									1M
								</MenuItem>

								<MenuItem
									onClick={() => {
										handleButtonClick(120000);
										clickTime(120000);
										popupState.close();
									}}
									sx={{ width: '150px', height: '50px', fontSize: '20px' }}
								>
									2M
								</MenuItem>
							</Menu>
						</React.Fragment>
					)}
				</PopupState>

				<Timer timeCurr={timeCurr} />

				<div
					className={css.stockWatchingGroup}
					onClick={() => {
						navigate('watching_group');
					}}
					data-testid='navigate-watch-group'
				>
					<Badge
						badgeContent={watch_group.length}
						sx={{
							'& .MuiBadge-badge': {
								backgroundColor: '#5abde2',
								fontSize: '.6em',
								fontWeight: 'bold',
								height: '27px',
								width: '27px',
								borderRadius: '20px',
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
