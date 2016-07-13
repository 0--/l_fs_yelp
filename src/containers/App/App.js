import React, { PropTypes } from 'react';
import { Router } from 'react-router';

//* Primary styles CSS Module
import styles from './styles.module.css';

//* Font-Awesome
//* #TODO: can this be broken down any?
import 'font-awesome/css/font-awesome.css';

class App extends React.Component {

  static propTypes = {
    history : PropTypes.object.isRequired,
    routes : PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Router history={ this.props.history } routes={ this.props.routes } />
      </div>
    )
  }

};

export default App;