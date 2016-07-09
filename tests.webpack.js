'use strict';

//*	#TODO: what does this polyfill?
//* Answer: it creates a full ES2015 environment, adding 'Promise', 'Map', etc
require('babel-polyfill');

//* load the chai expectation lib
const chai = require('chai');
//* load the Enzyme react test helper plugin for Chai
const chaiEnzyme = require('chai-enzyme');

//* Register the Enzyme test helper as a Chai plugin
chai.use(chaiEnzyme());

//*	'require.context' exports a require function that accepts a module name as its argument
//* that function also has a property, 'keys', which lists the modules the context has access to.
//* signature: require.context(directory:String, recursive:Bool = false, pattern:RegEx = /^\.\//)
//* so, in this case, all files from the './src' directory and its subdirectories that end in
//* the pattern '.spec.js'. Equivalent to the blob './src/**/*.spec.js'
let context = require.context('./src', true, /\.spec\.js$/);

//*	Iterate over the availabel *.spec.js modules and execute each of them by
//* invoking the 'context' loader.
context.keys().forEach(context);