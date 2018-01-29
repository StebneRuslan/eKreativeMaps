import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import { logOut } from '../../actions/main'
import LogOut from './LogOut'

const mapStateToProps = ({main: {userToken}}, ownProps) => {
  return {
    userToken,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({changeStateProp, logOut}, dispatch)
  }
}

const LogOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut)

export default LogOutContainer
