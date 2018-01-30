import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'
import { DECREMENT, INCREMENT, LOGIN, LOGOUT, ADDPLACE } from '../actions/main'

const REDUCER = 'MAIN'
const defaultState = {
  value: 0,
  userToken: '',
  places: [{
    title: '',
    description: ''
  }]
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
        userToken: ''
      }
    case ADDPLACE:
      return {
        ...state,
        places: action.data
      }
    default:
      return state
  }
}
