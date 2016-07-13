import React from 'react';

//*	#TODO: what else does chai.js export?
import { expect } from 'chai';

//*	shallow is a React rendering utility for quick testing
import { shallow } from 'enzyme';

import App from './App';
import styles from './styles.module.css';

describe('<App />', function () {
	//*	This holds the DOM fragment rendered by 'shallow'
	let wrapper;

	//* get a clean and newly rendered instance of App each time tests are run
	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	//* App component is going to be primarily about Routing, so confirm that
	//* it has a <Router /> component instantiated
	it(' has a Router component', () => {
		expect(wrapper.find('Router')).to.have.length(1);
	})

	// it(' has a single wrapper element', () => {
	// 	//*	Appears to be a check to see if there is a single element with the 'syles.wrapper'
	// 	//* class as a descendant of the wrapped <App/> instance
	// 	expect(wrapper.find(`.${styles.wrapper}`)).to.have.length(1);
	// });



});