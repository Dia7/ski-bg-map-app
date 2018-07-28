import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class MapContainer extends Component {

    state = {
        locations: [
            {name: "Borovetz", location: {lat: 42.270667, lng: 23.605616} },
            {name: "Bezbog", location: {lat: 41.733941, lng: 23.524224} },
            {name: "Bansko", location: {lat: 41.824869, lng: 23.478921} },
            {name: "Malyovitsa", location: {lat: 42.166667, lng: 23.366667} },
            {name: "7_Rilski_Lakes", location: {lat: 42.202778, lng: 23.32} },
        ],
        markers: [],
        query: '',
        infoWindow: new this.props.google.maps.InfoWindow()
    }

    componentDidMount () {
        this.mapLoad()
    }

    mapLoad() {
    if (this.props && this.props.google) {
      const {google} = this.props

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      const mapConfig = Object.assign({}, {
        center: {lat: 41.968877, lng: 23.477193},
        zoom: 10,
        mapTypeId: 'terrain'
      })

      this.map = new google.maps.Map(node, mapConfig)
      this.viewMarkers()
    }
  }

  viewMarkers = () => {
    const {google} = this.props
    let {infoWindow} = this.state

    this.state.locations.forEach( (place, index) => {
        const marker = new google.maps.Marker({
            position: {
                lat: place.location.lat,
                lng: place.location.lng,
            },
            title: place.name,
            map: this.map
        });
        marker.addListener('click', () => {
            this.populateInfoWindow(marker, infoWindow)
        })
        this.setState((state) => ({
            markers: [...state.markers, marker]
        }))
    });
    }




    render() {
        return (
            <div>
                <div className="map-container">
                    <div className="sidebar"></div>
                    <div className="theMap" role="application" ref="map">
                    Loading..
                    </div>
                </div>
            </div>
        );
    }
}