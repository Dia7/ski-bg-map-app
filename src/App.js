import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import MapContainer from './components/MapContainer.js'

// import images
import HamburgerIcon from './assets/hamburger_icon.png'

class App extends Component {
  render() {
    return (
      <div>
        <a className="menu" tabIndex="0">
          <img className="hamburger-icon" src={ HamburgerIcon } alt="hamburger" />
        </a>
        <h1 className="main-heading">Skiing in Bulgaria</h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAb5_qqBZX1qH5l_yK7uqLXpLifSdgQ34'
})(App)