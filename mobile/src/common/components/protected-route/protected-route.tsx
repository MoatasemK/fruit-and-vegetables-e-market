import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from './protected-route.util';
import { ProtectedRouteProps as Props } from './protected-route.props';

export function ProtectedRoute(props: Props) {
  if (!isAuthenticated()) return <Redirect to="/login" />;

  return <Route {...props} />;
}
