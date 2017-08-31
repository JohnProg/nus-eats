import { connect } from 'react-redux';
import { logout } from '../actions';
import NavigationBar from '../components/NavigationBar';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout())
});

const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

export default NavigationBarContainer;