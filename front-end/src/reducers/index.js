import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import canteens from './canteens';
import stalls from './stalls';
import isFilterExpanded from './isFilterExpanded';
import toggleHalalOnly from './toggleHalalOnly';
import isFbReady from './isFacebookReady';
import accessTokens from './accessTokens';
import currentUser from './currentUser';
import userRatings from './userRatings';
import meeting from './meeting';
import expandedCanteenPanel from './expandedCanteenPanel';
import facebookUsers from './facebookUsers';

const reducer = combineReducers({
  canteens,
  stalls,
  isFilterExpanded,
  toggleHalalOnly,
  isFbReady,
  accessTokens,
  currentUser,
  userRatings,
  meeting,
  expandedCanteenPanel,
  routing: routerReducer,
  facebookUsers,
});

export default reducer;
