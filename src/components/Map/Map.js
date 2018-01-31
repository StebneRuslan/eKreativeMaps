import React, { Component } from 'react'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {
  constructor (props) {
    super(props)
    this.mapClicked = this.mapClicked.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.unFocus = this.unFocus.bind(this)
    this.focus = this.focus.bind(this)

    this.state = ({
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: props
    })
  }

  mapClicked (mapProps, map, clickEvent) {
    // const state = this.props.places
    // state.push({
    //   title: '',
    //   description: '',
    //   latLng: {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()}
    // })
    // this.setState({places: state})
    this.props.addPlace({
      title: '',
      description: '',
      latLng: {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()}
    })
  }

  onChange (e, type, index) {
    this.props.editPlace(type, e.target.value, index)
  }

  onMarkerClick (props, marker, e) {
    // this.setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true
    // })
  }

  onRemove (e) {
    this.props.removePlace(this.props.places, e.target.form.id)
    const state = this.props.places
    this.setState({places: state})
  }

  mouseUp (mapProps, map, clickEvent) {
    this.props.editPlace('latLng', {lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()}, mapProps.id)
  }

  focus (mapProps) {
    document.getElementById(mapProps.id).classList.add('active-form')
  }

  unFocus (mapProps) {
    document.getElementById(mapProps.id).classList.remove('active-form')
  }

  render () {
    if (this.props.userToken === '') {
      return ''
    } else {
      // console.log(this.state)
      return (
        <div>
          <Map google={this.props.google} zoom={14} onClick={this.mapClicked}
            initialCenter={{
              lat: 49.4312996658681,
              lng: 32.056238651275635
            }}
            style={{width: '57%', height: '100%', float: 'left', position: 'static'}}>
            {this.props.places.map((element, index) => {
              return (<Marker
                onMouseout={this.unFocus}
                onMouseup={this.mouseUp}
                onMouseover={this.focus}
                draggable
                key={index}
                id={index}
                title={element.title}
                name={element.title}
                position={{lat: element.latLng.lat, lng: element.latLng.lng}} />)
            })}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
          <div className='div-form'>
            { this.props.places.map((element, index) => {
              return (<form className='form' key={index} id={index}>
                <input type='text'
                  name='title'
                  placeholder='Title'
                  onChange={event => this.onChange(event, 'title', index)}
                  value={element.title}
              />
                <input
                  type='text'
                  name='description'
                  placeholder='Description'
                  onChange={event => this.onChange(event, 'description', index)}
                  value={element.description}
              />
                <input type='button' value='Delete' onClick={this.onRemove} />
              </form>)
            })}
          </div>
        </div>
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
