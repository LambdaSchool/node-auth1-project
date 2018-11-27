import React from 'react';
import LoginPage from '../Login.js';

const Authenticate = App =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false
      };
    }
    componentDidMount() {
      
    }
    render() {
      if (this.state.loggedIn) return <App />;
      return <LoginPage />
    }
  };

export default Authenticate;
