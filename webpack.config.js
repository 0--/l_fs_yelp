'use strict';

//* #TODO: what is this? why is it added along with the NODE_ENV = 'test' test?
require('babel-register');

const NODE_ENV = process.env.NODE_ENV;

console.log('Node Env?', NODE_ENV);

const isDev = (NODE_ENV === 'development' || (process.argv[1] || '').indexOf('hjs-dev-server') > -1);
const isTest = (NODE_ENV === 'test' || (process.argv[1] || '').indexOf('karma') > -1);

const webpack = require('webpack');
const hjs = require('hjs-webpack');
const fs = require('fs');
const path = require('path'),
      join = path.join,
      resolve = path.resolve;


const dotenv = require('dotenv');

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');

//* Build out an environment config from any pre-existing config,
//* but with our desired config override file mixed in.
const envVariables = Object.assign(
  {}, 
  dotenv.config(), 
  dotenv.config({
    path: join(root, 'config', `${NODE_ENV}.config.js`),
    silent: true
  })
);

//* #TODO: understand how this string is constructed and how it should be different between dev and prod
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : '' }[hash:base64:5]`;
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

//* Find a loader whose 'loader' string matches a supplied regex or string </pk>
const findLoader = (loaders, match) => {
  const found = loaders.filter( l => l && l.loader && l.loader.match(match));
  return found ? found[0] : null;
};

let config = hjs({
  in: join(__dirname, 'src/app.js'),
  out: join(__dirname, 'dist'),
  clearBeforeBuild: true,
  isDev: isDev
});

//* Find the default css file loader generated by hjs-webpack
const cssloader = findLoader(config.module.loaders, matchCssLoaders);

//* Clone out the default loader, but retarget it to css module filenames in the /src dir
const cssModuleLoader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  //* #TODO: understand this
  loader: cssloader.loader.replace(matchCssLoaders, `$1$2?modules&localIdentName=${cssModulesNames}$3`)
})

//* Modify the default css loader to exclude css names preceded by 'module', eg: 'x.module.css' 
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
//* #TODO: why is this necessary?
cssloader.loader = cssModuleLoader.loader;

const envVarsLoader = Object.keys(envVariables).reduce(
  (memo, key) => {
    //* add any existing config properties in the format '__VARNAME__'
    memo[`__${key.toUpperCase()}__`] = JSON.stringify(envVariables[key]);
    return memo;
  }, {
    __NODE_ENV__ : JSON.stringify(NODE_ENV)
  }
);

//***** FINAL HJS-WEBPACK CONFIG *****//

//* Add a loader for css files in the 'modules' dir
config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  //* Chain through the css loader and then the style loader
  loader: 'style!css'
});

config.module.loaders.push(cssModuleLoader);

config.postcss = [
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
];

config.plugins = [
  //* 'webpack.DefinePlugin' appears to do a simple key -> value replacement
  //* based on the map passed at instantiation
  new webpack.DefinePlugin(envVarsLoader)
].concat(config.plugins);

//* #TODO: is this HJS?
//* Webpack 'resolve' configuration
config.resolve.root = [src, modules]; //* directories in which to search

//* Path overrides
config.resolve.alias = {
  //* eg: require('styles/foo.css') rather than '../../styles/foo.css'
  'css': join(src, 'styles'),
  'containers': join(src, 'containers'),
  'components': join(src, 'components'),
  'utils': join(src, 'utils')
}

//* Only configure externals if testing, as these are only being required by Enzyme
if (isTest) {
  //* Externals: files that are to be excluded from static analysis for bundling,
  //* EG: test utilities
  //* Possibly dynamically required dependencies? 
  config.externals = {
    'react/lib/ReactContext' : true,
    'react/lib/ExecutionEnvironment' : true,
    'react/addons' : true
  }

  //* Exclude the production plugins
  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString();
    const fName = name.match(/^function (.*)\((.*\))/);

    //* Check to see if the fName is one of these plugins
    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin'
    ].indexOf(
      fName[1]
    );

    //* Remove if it is
    return idx < 0;
  });
}

module.exports = config;
