import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import MapContainer from './components/MapContainer.js'


// add Autorization warning massage
window.gm_authFailure = () => {
  const mapContainer = document.querySelector('.map-container');
  mapContainer.innerHTML = '';
  mapContainer.innerHTML = `
  <div class='error-message'>
    <h2 class='error-title'>
      <span class='red-brackets'>{</span>
        ERROR
      <span class='red-brackets'>}</span>
    </h2>
    <p>Google Maps failed to load properly because an authorization problem.Check your browser console for more informations and how solve the problem. You can try also to refresh the page.<p>
  </div>`;
}

class App extends Component {
  render() {
    return (
      <div role="heading">
        <h1 className="main-heading" tabIndex="0" autoFocus={true}>The Best Ski Spots in Bulgaria</h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAb5_qqBZX1qH5l_yK7uqLXpLifSdgQ34'
})(App)