import React from 'react';
import ReactDOM from 'react-dom';

//*	#TODO: what else does chai.js export?
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';
import styles from './styles.module.css';

describe('<App />', function () {
	let wrapper;

	beforeEach(() => {
		let a = <App />;
		//*	#TODO: what is 'shallow'? what does it provide? looks like a DOM query framework
		wrapper = shallow(a);
	});

	it('has a single wrapper element', () => {
		//*	Appears to be a check to see if there is a single element with the 'syles.wrapper'
		//* class as a descendant of the wrapped <App/> instance
		expect(wrapper.find(`.${styles.wrapper}`)).to.have.length(1);
	});
});