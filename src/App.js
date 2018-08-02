import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import MapContainer from './components/MapContainer.js'

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="main-heading" tabIndex="0" autoFocus={true}>The Best Ski Spots in Bulgaria</h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAb5_qqBZX1qH5l_yK7uqLXpLifSdgQ34'
})(App)