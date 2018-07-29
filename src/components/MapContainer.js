import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class MapContainer extends Component {

    state = {
        locations: [
            {
                name: "Borovetz",
                location: {lat: 42.270667, lng: 23.605616}
            },
            {
                name: "Bezbog",
                location: {lat: 41.733941, lng: 23.524224}
            },
            {
                name: "Bansko",
                location: {lat: 41.824869, lng: 23.478921}
            },
            {
                name: "Malyovitsa",
                location: {lat: 42.166667, lng: 23.366667}
            },
            {
                name: "7_Rilski_Lakes",
                location: {lat: 42.202778, lng: 23.32}
            },
            {
                name: "Panichishte",
                location: {lat: 42.263425, lng: 23.296852}
            },
            {
                name: "Semkovo",
                location: {lat: 42.046394, lng: 23.534161}
            },
            {
                name: "Kulinoto",
                location: {lat: 41.865885, lng: 23.344038}
            },
            {
                name: "Kamenitza",
                location: {lat: 41.768523, lng: 23.426883}
            },
            {
                name: "Kartala",
                location: {lat: 42.043117, lng: 23.360738},
                id: '4d6a1ed71b63a1cd2db0482d',
                description: 'bla'
            },
        ],
        markers: [],
        query: '',
        // globally declared the infoWindow
        infoWindow: new this.props.google.maps.InfoWindow({maxWidth: 200})
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
    // adding borders for all markers to be displayed on the map
    const borders = new google.maps.LatLngBounds();
    let {infoWindow} = this.state

    this.state.locations.forEach( (place, index) => {
        const marker = new google.maps.Marker({
            position: {
                lat: place.location.lat,
                lng: place.location.lng,
            },
            title: place.name,
            animation: google.maps.Animation.DROP,
            map: this.map
        });
        // on click set the current infoWindow of the marker
        marker.addListener('click', () => {
            this.populateInfoWindow(marker, infoWindow)
        })
        this.setState((state) => ({
            markers: [...state.markers, marker]
        }))
        borders.extend(marker.position)
    });
    this.map.fitBounds(borders)
    }

    populateInfoWindow(marker, infowindow){

        const {google} = this.props
        //bounce when marker or listitems are clicked

        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1000);

        if(infowindow.marker !== marker) {
            // is infowindow not already open on that current maarker
            infowindow.marker = marker;
            infowindow.setContent(`<h4>Location</h4><p>Bla bla</p>`);
            infowindow.addListener('closeInfo', function() {
                infowindow.marker = null;
            })
            infowindow.open(this.map, marker)
        }
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