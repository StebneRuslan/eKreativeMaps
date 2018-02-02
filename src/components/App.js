/* global FB */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import logo from '../../assets/images/logo.svg'

import './App.css'
// components
// import ComponentAContainer from '../components/ComponentsA/ComponentAContainer'
// import ComponentBContainer from '../components/ComponentsB/ComponentBContainer'
import LoginContainer from '../components/Auth/LoginContainer'
import LogOutContainer from '../components/LogOut/LogOutContainer'
import MapContainer from '../components/Map/MapContainer'

// router
// import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

// const NotFound = () => {
//   return (
//     <Route render={({staticContext}) => {
//       if (staticContext) { staticContext.status = 404 }
//       return (<div>
//         <h1>Sorry, can’t find that.</h1>
//       </div>)
//     }} />
//   )
// }

function testAPI () {
  FB.api('/me', function (response) {
    // alert('Successful login for: ' + response.name)
    return 'Successful login for: ' + response.name
  })
}

class App extends Component {
  componentDidMount () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1962796347374005',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
      })

      FB.AppEvents.logPageView()

      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          testAPI()
        }
      })
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }

  render () {
    return (
      <HashRouter>
        <div className='App'>
          <div className='App-header'>
            <LoginContainer />
            <LogOutContainer />
          </div>
          <MapContainer />
        </div>
      </HashRouter>
    )
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  changeStateProp: PropTypes.func.isRequired,
  myCustomPropsFunc: PropTypes.func
}

App.defaultProps = {
  value: 0,
  changeStateProp: () => {},
  myCustomPropsFunc: () => {}
}

export default App
