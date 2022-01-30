import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './container/Main';
import Result from './container/Result';

export default function App() {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Main} />
				<Route exact path="/result/:result" component={Result} />
			</div>
		</Router>
	);
}
