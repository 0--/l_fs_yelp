import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

//* Make Font Awesome globally accessible
import 'font-awesome/css/font-awesome.css';

//* Why is it necessary/desirable to import this here?
//* Is it the relevant WebPack loader that places it in the generated index.html?
//* Or is this a configurable behavior of HJS? 
//* Not liking how opaque this is, and really not liking how it obliges you
//* to organize the entire app via JS. 
import './app.css';

import App from 'containers/App/App';

import makeRoutes from './routes';

const mountNode = document.querySelector('#root');
ReactDOM.render(<App routes={ makeRoutes() } history={ browserHistory } />, mountNode);
