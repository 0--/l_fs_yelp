'use strict';

import React from 'react';
import {browserHistory, Router, Route, Redirect} from 'react-router';
import makeMainRoutes from './views/Main/routes';


class Home extends React.Component {
	render() {
		return (<div> Hello World </div>);
	}
}

//*	#TODO: try automatic route generation via require.context.
/*

eg: 

const routesources = require.context('./src', true, '.*\.routes.js');

let routes = [];

routesources.forEach( (make) => {
	routes.push( 
		<Route path='???'> 
			{ make() }
		</Route>
	);
});

*/

export const makeRoutes = () => {
	/*
	<Router>
		<Route path="/" component={Home} />
		<Redirect from="*" to="/" />
	</Router>
	*/

	const main = makeMainRoutes();

	return (
		<Route path=''>
			{main}
		</Route>
	)
}

export default makeRoutes;