import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class MapContainer extends Component {

    state = {
        locations: require('./Locations.json'),
        markers: [],
        query: '',
        // globally declared the infoWindow
        infowindow: new this.props.google.maps.InfoWindow({maxWidth: 200})
    }

    componentDidMount () {
        this.mapLoad()
        this.changeLocation()
    }

    mapLoad() {
    if (this.props && this.props.google) {
      const {google} = this.props

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      const mapConfig = Object.assign({}, {

        center: {lat: 41.968877, lng: 23.477193},
        zoom: 10,
        mapTypeId: 'terrain',
        styles: require('./MapStyles.json')

      })

      this.map = new google.maps.Map(node, mapConfig)
      this.viewMarkers()
        }
    }

    // track what the User is typyng
    changeValue = (element) => {
        this.setState({query: element.target.value})
    }

    viewMarkers = () => {
    const {google} = this.props
    // adding borders for all markers to be displayed on the map
    const borders = new google.maps.LatLngBounds();
    let {infowindow} = this.state

    this.state.locations.forEach( (place) => {
        const marker = new google.maps.Marker({
            position: {
                lat: place.location.lat,
                lng: place.location.lng,
            },
            title: place.name,
            animation: google.maps.Animation.DROP,
            map: this.map
        });
        // on click update the infoWindow with the current marker
        marker.addListener('click', () => {
            this.populateInfoWindow(marker, infowindow)
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
            // is infowindow not already open on that current marker
            infowindow.marker = marker;
            infowindow.setContent(`<h4>${marker.title}</h4><p>Bla bla</p>`);
            infowindow.addListener('closeInfo', function() {
                infowindow.marker = null;
            })
            infowindow.open(this.map, marker)
        }
    }

    changeLocation = () => {
        const {infowindow} = this.state
        const displayInfowindow = (element) => {
        const {markers} = this.state
        const markerIndex = markers.findIndex(marker => marker.title.toLowerCase() === element.target.innerText.toLowerCase())
        this.populateInfoWindow(markers[markerIndex], infowindow)
    }

    document.querySelector('.allPlaces').addEventListener('click', function (element) {
      if(element.target.nodeName === "LI") {
        displayInfowindow(element)
        }
    })
    }

    render() {
        const { locations, query, markers, infowindow} = this.state
            if (query) {
            locations.forEach((loc,i) => {
                // if the location contain what the user is typing
                if(loc.name.toLowerCase().includes(query.toLowerCase())) {
                  //set visible markers
                    markers[i].setVisible(true)
                }else {
                    if (infowindow.markers === markers[i]){
                        // if the info window was already open on the marker - close the info window
                        infowindow.close()
                    }
                    // if the location doesn't match - set the markers - not visible
                    markers[i].setVisible(false)
                }
            })
            }else {
              locations.forEach((i) => {
                if (markers.length && markers[i]) {
                  markers[i].setVisible(true)
            }
        })
    }
        return (
            <div>
                <div className="map-container">
                    <div className="sidebar search">
                        <input type="text"
                            role="search"
                            value={this.state.value}
                            onChange={this.changeValue}
                        />
                        <ul className="allPlaces">
                            {markers.filter(m => m.getVisible()).map((m, i) => (
                                <li key={i}>{m.title}</li>))}
                        </ul>
                    </div>
                    <div className="theMap" role="application" ref="map">
                    Loading..
                    </div>
                </div>
            </div>
        );
    }
}