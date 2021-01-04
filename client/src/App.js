import React, { useEffect } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Birthday from './components/Birthday';

const Routing = () => {
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			history.push('/birthday');
		} else {
			history.push('/signin');
		}
	}, []);

	return (
		<Switch>
			(localStorage.getItem('token'))?(
			<Route path="/birthday" component={Birthday} />
			):(
			<Route path="/signin" component={Signin} />
			<Route path="/signup" component={Signup} />)
		</Switch>
	);
};

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routing />
			</div>
		</Router>
	);
};

export default App;
