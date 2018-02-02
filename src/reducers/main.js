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
    case DRAGUPDATE:
      const {oldIndex, newIndex, places} = action.data
      const placeClone = places.slice(0)
      const tmp = placeClone[oldIndex]
      placeClone.splice([oldIndex], 1)
      placeClone.splice([newIndex], 0, tmp)
      return update(state, {places: {$set: placeClone}})
    case EDITPLACE:
      let {type, value, index} = action.data
      return update(state, {places: {[index]: {[type]: {$set: value}}}})
    default:
      return state
  }
}
