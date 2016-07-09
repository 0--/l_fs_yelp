'use strict';

// Karma configuration
// Generated on Sat Jul 09 2016 01:11:59 GMT-0400 (Eastern Daylight Time)

const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    //* Additional plugins to drive mocha & chai integration
    plugins: [
        'karma-mocha',
        'karma-chai',
        //* Presumably this uses the webpack config below? Should be clearer. 
        'karma-webpack',
        'karma-phantomjs-launcher',
        'karma-spec-reporter',
        'karma-sourcemap-loader'
    ],

    //* #TODO: is this built-in to karma? being added via plugin?
    //* Configure webpack bundling
    webpack: webpackConfig,

    //* #TODO: what this does?
    webpackServer: {
        noInfo: true,
    },

    // list of files / patterns to load in the browser
    //* This is our primary test file, but we need to tell Karma
    //* what to do with files before they are sent to it
    files: [ 
        'tests.webpack.js'
    ],

    // list of files to exclude
    exclude: [ ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 
        //* These are used to transform source code before it's subjected to the tests?
        //* #TODO: read the Karma documentation to understand that relationship
        'tests.webpack.js' : ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //* Added karma-spec-reporter
    //* #TODO: compare to progress
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
