import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {
  constructor (props) {
    super(props)
    this.mapClicked = this.mapClicked.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.unFocus = this.unFocus.bind(this)
    this.focus = this.focus.bind(this)
    this.dragUpdate = this.dragUpdate.bind(this)
  }

  mapClicked (mapProps, map, clickEvent) {
    this.props.addPlace({
      title: '',
      description: '',
      latLng: {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()}
    })
  }

  onChange (e, type, index) {
    this.props.editPlace(type, e.target.value, index)
  }

  onRemove (e) {
    this.props.removePlace(this.props.places, e.target.form.id)
  }

  mouseUp (mapProps, map, clickEvent) {
    this.props.editPlace('latLng', {lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()}, mapProps.dragId)
  }

  focus (mapProps) {
    document.getElementById(mapProps.dragId).classList.add('active-form')
  }

  unFocus (mapProps) {
    document.getElementById(mapProps.dragId).classList.remove('active-form')
  }

  dragUpdate (e) {
    this.props.dragUpdate(e.oldIndex, e.newIndex, this.props.places)
  }

  render () {
    let draggingIndex = null
    if (this.props.userToken === '') {
      return ''
    } else {
      return (
        <div>
          <Map google={this.props.google} zoom={14} onClick={this.mapClicked}
            initialCenter={{
              lat: 49.4312996658681,
              lng: 32.056238651275635
            }}
            style={{width: '65%', height: '650px', float: 'left', position: 'static'}}>
            {this.props.places.map((element, index) => {
              return (<Marker
                onMouseout={this.unFocus}
                onMouseup={this.mouseUp}
                onMouseover={this.focus}
                draggable
                key={index}
                dragId={index}
                title={element.title}
                name={element.title}
                position={{lat: element.latLng.lat, lng: element.latLng.lng}} />)
            })}

          </Map>
          <div className='div-form'>
            { this.props.places.map((element, index) => {
              return (
                <form
                  className='form'
                  key={index}
                  id={index}
                  draggable
                  onDragEnd={(e) => {
                    this.props.dragUpdate(e.target.id, draggingIndex, this.props.places)
                  }}
                  onDragOver={(e) => {
                    if (e.target.id) {
                      draggingIndex = e.target.id
                    }
                  }}
                >
                  <label>
                    <input type='text'
                      name='title'
                      placeholder='Title'
                      onChange={event => this.onChange(event, 'title', index)}
                      value={element.title}
                      />
                  </label>
                  <label>
                    <input
                      type='text'
                      name='description'
                      placeholder='Description'
                      onChange={event => this.onChange(event, 'description', index)}
                      value={element.description}
                      />
                  </label>
                  <label>
                    <input type='button' value='Delete' onClick={this.onRemove} />
                  </label>
                </form>
              )
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
