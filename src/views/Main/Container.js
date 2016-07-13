'use strict';

import React from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import {searchNearby} from 'utils/googleApiHelpers';

export class Container extends React.Component {
	constructor(props) {
		super(props);

		//*	Uses the 'component.state' property to store info about visible places and pagination
		//* Why is this 'state'? Because it changes over the lifetime of an instance, independent of props?
		//* Because it doesn't expose props to set these? 
		this.state = {
			places: [],
			pagination: null
		}
	}

	onReady(mapProps, map) {
		console.log(this, 'ON READY');

		const { google } = this.props;

		const opts = {
			location: map.center,
			//*	#TODO: what are the units?
			radius: '500',
			//*	#TODO: create a UI to let users choose types
			types: ['cafe']
		};

		searchNearby(google, map, opts)
			.then((results, pagination) => {
				console.log('maps result:');
				console.log(results, pagination);
				this.setState({
					places: results,
					pagination
				});
			})
			.catch((status, result) => {
				console.error('search nearby error:');
				console.error(status, result);
			});
	}

	render() {
		return (
			<div>
				Available Places
				<Map 
					onReady={ this.onReady.bind(this) } 
					google={ this.props.google }
					visible={ false }>

					<ul>
					{this.state.places.map(place => {
						return (<li key={place.id}>{place.name}</li>);
					})}
					</ul>

				</Map>
			</div>
		)
	}
}

//export default Container;

//* 'GoogleApiWrapper' appears to lazy-load the Maps API,
//* followed by instantiating the supplied class.
//* It then appears to make that accessible to the instantiated
//* class via {INSTANCE}.props.google

//* #TODO: confirm that.
export default GoogleApiWrapper({
	apiKey : __GAPI_KEY__
})(Container)