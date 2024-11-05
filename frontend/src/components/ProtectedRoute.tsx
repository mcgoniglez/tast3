import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const token = useAppSelector((state) => state.auth.token);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
