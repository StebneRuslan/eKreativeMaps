import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import PropTypes from 'prop-types'

class MapContainer extends Component {

  render() {
    return (
      <Map google={this.props.google} zoom={14}>
      </Map>
    );
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
