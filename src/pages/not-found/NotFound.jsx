import css from './NotFound.module.css';
import { GoBack } from '../../components/GoBack/GoBack';

export const NotFound = () => {
	return (
		<>
			<div className={css.containerExistWrapper}>
				<div className={css.containerExist}>
					<div className={css.errorContainerExist}>
						Sorry, this page doesn't exist
					</div>
					<GoBack />
				</div>
			</div>
		</>
	);
};
