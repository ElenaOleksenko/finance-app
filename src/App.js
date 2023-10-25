import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/Main';

// import css from './App.module.css';
import { WatchingGroup } from './pages/watching_group/WatchingGroup';
import { NotFound } from './pages/not-found/NotFound';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='watching_group' element={<WatchingGroup />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
