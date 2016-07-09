import React from 'react';
import ReactDOM from 'react-dom';

//* Why is it necessary/desirable to import this here?
//* Is it the relevant WebPack loader that places it in the generated index.html?
//* Or is this a configurable behavior of HJS? 
//* Not liking how opaque this is.
import './app.css';

//* Primary styles CSS Module
import styles from './styles.module.css';

const App = React.createClass({
  render: function() {
    return (
      <div className={styles.wrapper}>
        Hello World
      </div>
    )
  }
});

const mountNode = document.querySelector('#root');
ReactDOM.render(<App />, mountNode);
