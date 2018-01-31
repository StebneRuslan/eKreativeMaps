import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'
import {
  DECREMENT,
  INCREMENT,
  LOGIN,
  LOGOUT,
  ADDPLACE,
  EDITPLACE,
  REMOVEPLACE
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
      action.data.place.splice(action.data.index, 1)
      return {
        ...state,
        places: action.data.place
      }
    case EDITPLACE:
      let {type, value, index} = action.data
      return update(state, {places: {[index]: {[type]: {$set: value}}}})
    default:
      return state
  }
}
