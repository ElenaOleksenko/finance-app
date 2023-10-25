import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import css from './GoBack.module.css';

export const GoBack = () => {
	const navigate = useNavigate();
	return (
		<div className={css.arrowContainer} onClick={() => navigate(-1)}>
			<ArrowBackIosIcon sx={{ fontSize: 40, color: '#5abde2' }} />
			<p>Go Back</p>
		</div>
	);
};
