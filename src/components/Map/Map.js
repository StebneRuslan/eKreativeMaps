import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import PropTypes from 'prop-types'

class MapContainer extends Component {
  constructor (props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  renderMarkers (map, maps) {
    let marker = new maps.Marker({
      position: {},
      map,
      title: 'Hello World!'
    });
  }

  render () {
    console.log(this.props)
    if (this.props.userToken === '') {
      return ''
    } else {
      return (
        <Map google={this.props.google} zoom={20}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
        </Map>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD40bP14XrnSBIK2Ac8v6NoB7PvEQN0YxY')
})(MapContainer)

// MapContainer.propTypes = {
//   login: PropTypes.func.isRequired
// }
//
// MapContainer.defaultProps = {
//   logIn: () => {}
// }
//
// export default MapContainer
