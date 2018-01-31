export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADDPLACE = 'ADDPLACE'
export const REMOVEPLACE = 'REMOVEPLACE'
export const EDITPLACE = 'EDITPLACE'

export function increment () {
  return dispatch => {
    dispatch({
      type: INCREMENT
    })
  }
}

export function decrement () {
  return dispatch => {
    dispatch({
      type: DECREMENT
    })
  }
}

export function login (userToken) {
  return dispatch => {
    dispatch({
      type: LOGIN,
      data: userToken
    })
  }
}

export function logOut () {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
  }
}

export function addPlace (place) {
  return dispatch => {
    dispatch({
      type: ADDPLACE,
      data: place
    })
  }
}

export function removePlace (place, index) {
  return dispatch => {
    dispatch({
      type: REMOVEPLACE,
      data: {place, index}
    })
  }
}

export function editPlace (type, value, index) {
  return dispatch => {
    dispatch({
      type: EDITPLACE,
      data: {type, value, index}
    })
  }
}
