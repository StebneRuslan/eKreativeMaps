import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import { addPlace, editPlace, removePlace, dragUpdate } from '../../actions/main'
import Map from './Map'

const mapStateToProps = ({main: {places, userToken}}, ownProps) => {
  return {
    userToken,
    places,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({changeStateProp, addPlace, editPlace, removePlace, dragUpdate}, dispatch)
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
