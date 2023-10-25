import PropTypes from 'prop-types';
import css from './StockComponent.module.css';
import { formatData } from '../../helpers';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import { useDispatch } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {
	setAddWatchingGroup,
	setDeleteWatchingGroup,
} from '../../store/stockData/actionCreators';

export const StockComponent = ({ data }) => {
	let isChooseData;
	let isChooseElementLoc = localStorage.getItem(`chooseElement_${data.ticker}`);
	isChooseElementLoc !== null
		? (isChooseData = isChooseElementLoc)
		: (isChooseData = false);
	const currentUrl = window.location.pathname.slice(1);
	const [prevPrice, setPrevPrice] = useState(null);
	const [currPrice, setCurrPrice] = useState(data.price);
	const [isChooseElement, setChooseElement] = useState(isChooseData);
	const dispatch = useDispatch();
	let watchingGroup = JSON.parse(localStorage.getItem(`watch_group`)) || [];

	const percentChange =
		prevPrice !== null ? ((currPrice - prevPrice) / prevPrice) * 100 : 0;

	useEffect(() => {
		if (currPrice !== data.price) {
			setPrevPrice(currPrice);
			setCurrPrice(data.price);
		}
	}, [data.price, prevPrice, currPrice]);

	return (
		<div className={css.stockListWrapper}>
			<li>{data.ticker}</li>
			<li>{data.yield}</li>
			<li>{data.exchange}</li>
			<li className={css.stockPriceElement}>
				<p
					className={
						css[
							percentChange === 0
								? 'currPrice'
								: percentChange > 0
								? 'priceNotification'
								: 'fallingPrice'
						]
					}
				>
					{data.price}
					<span
						className={
							css[
								percentChange === 0
									? 'dollar'
									: percentChange > 0
									? 'greenDollar'
									: 'redDollar'
							]
						}
					>
						$
					</span>
					{percentChange === 0 && <span className={css.icon}></span>}
					{percentChange > 0 && (
						<span className={css.icon}>
							<NorthIcon sx={{ color: 'rgb(4, 109, 50)' }} />
						</span>
					)}
					{percentChange < 0 && (
						<span className={css.icon}>
							<SouthIcon sx={{ color: 'rgb(153, 7, 7)' }} />
						</span>
					)}
				</p>
			</li>
			<li>{data.change}</li>
			<li>{data.change_percent}</li>
			<li>{data.dividend}</li>
			<li>{formatData(data.last_trade_time)}</li>
			<li>
				<div className={css[currentUrl ? '' : 'doneRemoveIcons']}>
					{isChooseElement &&
						JSON.parse(localStorage.getItem(`chooseElement_${data.ticker}`)) &&
						!currentUrl && (
							<Tooltip
								title={
									<Typography fontSize={20}>Added to watching group</Typography>
								}
								placement='bottom'
							>
								<DoneIcon fontSize='large' sx={{ color: 'rgb(4, 109, 50)' }} />
							</Tooltip>
						)}
					{JSON.parse(localStorage.getItem(`chooseElement_${data.ticker}`)) &&
						isChooseData && (
							<Tooltip
								title={
									<Typography fontSize={20}>
										Remove from watching group
									</Typography>
								}
								placement='bottom'
							>
								<RemoveCircleOutlineOutlinedIcon
									fontSize='large'
									sx={{ color: 'rgb(153, 7, 7)' }}
									onClick={() => {
										dispatch(setDeleteWatchingGroup(data.ticker));
										setChooseElement(false);
										localStorage.setItem(`chooseElement_${data.ticker}`, false);
										let watchingGroup = JSON.parse(
											localStorage.getItem(`watch_group`)
										);

										let newGroup = watchingGroup.filter((group) => {
											return group.ticker !== data.ticker;
										});

										localStorage.setItem(
											`watch_group`,
											JSON.stringify(newGroup)
										);
									}}
								/>
							</Tooltip>
						)}
				</div>
				{(!JSON.parse(localStorage.getItem(`chooseElement_${data.ticker}`)) ||
					!isChooseElement) &&
					!currentUrl && (
						<Tooltip
							title={
								<Typography fontSize={20}>Add to watching group</Typography>
							}
							placement='bottom'
						>
							<AddCircleOutlineIcon
								fontSize='large'
								sx={{ color: '#5abde2' }}
								onClick={() => {
									dispatch(setAddWatchingGroup(data));
									setChooseElement(true);
									localStorage.setItem(`chooseElement_${data.ticker}`, true);

									watchingGroup.push(data);

									localStorage.setItem(
										`watch_group`,
										JSON.stringify(watchingGroup)
									);
								}}
							/>
						</Tooltip>
					)}
			</li>
		</div>
	);
};

StockComponent.propTypes = {
	data: PropTypes.object,
};
