import React from 'react';
import logo from './react.svg';
import './Home.scss';

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <a className="Home-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Home;
