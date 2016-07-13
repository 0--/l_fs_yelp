import React from 'react';
import { expect } from 'chai';
import { shallow as shallowRenderer } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Header />);
	});

	//* Pending tests:
	it(' contains a title component with yelp');
	it(' contains a section menu with the title');
});