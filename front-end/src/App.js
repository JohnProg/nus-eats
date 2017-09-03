import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import history from './store/history';

import { getAllCanteens, getAllStalls } from './actions';
import store from './store';

import FacebookSDK from './containers/FacebookSDKContainer';
import MainPage from './containers/MainPage';
import Feed from './containers/Feed';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

import * as GA from './google/analytics';

store.dispatch(getAllCanteens());
store.dispatch(getAllStalls());

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="feed" component={Feed} />
            <Route path="/canteen/:canteenId" component={MainPage} />
            <Route path="/privacy_policy" component={PrivacyPolicy} />
            <Route path="/terms_of_service" component={TermsOfService} />
          </Switch>
          <FacebookSDK />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

GA.initialize(process.env.REACT_APP_GA_TRACKING_CODE);

export default App;
