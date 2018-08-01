import React, { Component } from 'react';
import ReactDOM from 'react-dom'



export default class MapContainer extends Component {

    state = {
          locations: [
        {
            name: "Borovetz",
            location: {lat: 42.270667, lng: 23.605616},
            id: '5997070d6a60717704801060'
        },
        {
            name: "Bezbog",
            location: {lat: 41.733941, lng: 23.524224},
            id: '4e1d712415207c4cbec540bd'
        },
        {
            name: "Bansko",
            location: {lat: 41.7809356, lng: 23.438783},
            id: '4d4d4835fe7fb1f783595a42'
        },
        {
            name: "Malyovitsa",
            location: {lat: 42.166667, lng: 23.366667},
            id: '4cc2f7d2c844721e0bd1df01'
        },
        {
            name: "7_Rilski_Lakes",
            location: {lat: 42.202778, lng: 23.32},
            id: '4c4187fdda3dc9283609c9b9'
        },
        {
            name: "Panichishte",
            location: {lat: 42.263425, lng: 23.296852},
            id: '4f33c8a9a17c3e7317e5f33f'
        },
        {
            name: "Semkovo",
            location: {lat: 42.046394, lng: 23.534161},
            id: ''
        },
        {
            name: "Kulinoto",
            location: {lat: 41.865885, lng: 23.344038},
            id: ''
        },
        {
            name: "Kamenitza",
            location: {lat: 41.768523, lng: 23.426883},
            id: ''
        },
        {
            name: "Kartala",
            location: {lat: 42.043117, lng: 23.360738},
            id: '51ee89e07dd2b876fb52cf2e'
        }
    ],
        markers: [],
        query: '',
        keys: require('./keys.json'), //json file containing the api keys
        // globally declared the infoWindow
        infowindow: new this.props.google.maps.InfoWindow({maxWidth: 250}),
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
        mapTypeId: 'terrain',
        zoom: 10,
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

    // creates a new marker icon with given color.
       let makeMarkerIcon = (markerColor) => {
        const {google} = this.props
        let markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(22, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
    // style the markers
    let defaultIcon = makeMarkerIcon('65FFE4')
    let highlightIcon = makeMarkerIcon('004C3F')

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
            photo: '',
            id: place.id,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            map: this.map
        });
        // on click update the infoWindow with the current marker
        marker.addListener('click', () => {
            this.populateInfoWindow(marker, infowindow)
        })

        // change the colors of the markers on hover
        marker.addListener('mouseover', function() {
          this.setIcon(highlightIcon);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        });

        this.setState((state) => ({
            markers: [...state.markers, marker]
        }))
        borders.extend(marker.position)
    });
    this.map.fitBounds(borders)
    }

    // fill the infowindow with dynamic content
    populateInfoWindow(marker, infowindow){

        const {google} = this.props

        const {markers} = this.state

        //bounce when marker or listitems are clicked
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1000);
        // if infowindow is not open on that marker
        if(infowindow.marker !== marker) {
        //     // reset the previous marker color
            infowindow.marker = marker
        //     if(infowindow.marker) {
        //         const index = markers.findIndex(mark => mark.title === infowindow.marker.title)
        //         markers[index].setIcon(defaultIcon)
        //     }
        //     // when the marker is clicked - change color
        //     marker.setIcon(highlightIcon)

            //set the content of the info window from Foursquare API
            this.foursquareContent(marker, infowindow);
            // infowindow.setContent(`<h4>${marker.title}</h4><p>Bla bla</p>`);
            infowindow.setContent('');
            infowindow.addListener('closeInfo', function() {
                infowindow.marker = null;
            })
            infowindow.open(this.map, marker)
        }
    }

    foursquareContent(marker, infowindow) {

    //set the request for the api
    let request = `https://api.foursquare.com/v2/venues/search?` +
    `client_id=${this.state.keys.ClientId}
    &client_secret=${this.state.keys.ClientSecret}` +
    `&ll=` + marker.getPosition().lat() +`,` + marker.getPosition().lng() +
    `&v=20180527`;

    //fetch the request using fitch API
    fetch(request)
    .then((response) => {
      //check if the response was not successful
      if (response.status !== 200) {
        console.log('Request to foursquare was not successful!');
        infowindow.setContent(`<strong>Error While Loading..</strong>`);
      }
      //otherwise successful
      return response.json();
    }).then((data) => {
        if (data.response.venues){
        //the list of venues returned by the search query.
        var venues = data.response.venues;
        //first venue
        var theVenue = venues[0];
        //properties of the first venue
        var id = theVenue.id;
        var name = theVenue.name;
        var formattedAddress = '';

        //construct the address from the array in formattedAddress JSON.
        if (theVenue.location.formattedAddress) {
          for (let line of theVenue.location.formattedAddress) {
            formattedAddress += line + '</br>'; //new line in html to be used inside <p> element
          }
        }
        //call for photos
        // var imgurl = data.response.venue.photos.groups[0].items[0];

           //check for prefix and suffix property, on successful return image
            // if ( ((imgurl.hasOwnProperty('prefix')) && (imgurl.hasOwnProperty('suffix')))) {
            //     marker.photo = imgurl.prefix + "200x100" + imgurl.suffix;
            // } else {
            //     marker.photo = 'Image not found';
            // }

        var foursquareUrl = `https://foursquare.com/v/${id}`;


        infowindow.setContent(`<p><strong>Title: </strong>${name}</p>

                <p><strong>Address: </strong>${formattedAddress}</p>
                <a href=${foursquareUrl}>Location on Foursquare</a>
                `);
      }
    }).catch(exception => {
      console.log(exception);
    })
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
                            {markers.filter(mark => mark.getVisible()).map((mark, ind) => (
                                <li key={ind}>{mark.title}</li>))}
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