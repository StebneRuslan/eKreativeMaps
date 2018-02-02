import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'
import {
  DECREMENT,
  INCREMENT,
  LOGIN,
  LOGOUT,
  ADDPLACE,
  EDITPLACE,
  REMOVEPLACE,
  DRAGUPDATE
} from '../actions/main'

const REDUCER = 'MAIN'
const defaultState = {
  value: 0,
  userToken: '',
  places: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1
      }
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1
      }
    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })
    case LOGIN:
      console.log('action.data', action.data)
      return {
        ...state,
        userToken: action.data
      }
    case LOGOUT:
      return {
        ...state,
        userToken: '',
        places: []
      }
    case ADDPLACE:
      return update(state, {places: {$push: [action.data]}})
    case REMOVEPLACE:
      return update(state, {places: {$splice: [[action.data.index, 1]]}})
      // action.data.place.splice(action.data.index, 1)
      // return {
      //   ...state,
      //   places: action.data.place
      // }
    case DRAGUPDATE:
      const {oldIndex, newIndex, places} = action.data
      const placeClone = places.slice(0)
      const tmp = placeClone[oldIndex]
      placeClone.splice([oldIndex], 1)
      placeClone.splice([newIndex], 0, tmp)
      // debugger
      // state.places = []
      // debugger
      console.log(update(state, {places: {$set: placeClone}}))
      return update(state, {places: {$set: placeClone}})
        //     [{
        // title: 're',
        //     description: 'reerere',
        //     latLng: {
        //       lat: 49.43899884183162,
        //       lng: 32.04591751098633
        //     }
        //   }]}})
      // return {
      //   ...state,
      //   places: placeClone
      // }

    case EDITPLACE:
      let {type, value, index} = action.data
      return update(state, {places: {[index]: {[type]: {$set: value}}}})
    default:
      return state
  }
}
