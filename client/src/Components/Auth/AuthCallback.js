import React from 'react';
import { Route } from 'react-router-dom';

import { AuthContainer } from './AuthContainer';
import { CallbackContainer } from './CallbackContainer';

export const AuthCallback = () => (
  <React.Fragment>
    <Route exact path="/auth/" component={AuthContainer} />
    <Route path="/auth/callback" component={CallbackContainer} />
  </React.Fragment>
);
