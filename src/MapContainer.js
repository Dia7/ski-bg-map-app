import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class MapContainer extends Component {

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

    }

  }

    render() {
        return (
            <div>
                <div className="map-container">
                    <div className="sidebar"></div>
                    <div className="theMap" role="application" ref="map">
                    Loading map
                    </div>
                </div>
            </div>
        )
    }
}


