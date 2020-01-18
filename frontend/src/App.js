import React, { useState, useCallback } from 'react';
//When importing we can use 'as' to import a component under an alias to make our lives easier. 'Router' helps with our routes, 'Route' is the JSX component we need for specific routes, and 'Redirect' is for enforcing which routes user has access to. 'Switch' component can be wrapped around your route definitions to manage route logic i.e. 'redirect'.
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import UserAuth from '../src/user/pages/UserAuth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';


//<Route> is a JSX component that we can use when importing 'react-router-dom'. It allows for a 'path' argument, and then whatever needs to be displayed is between the opening and closing tags.
const App = () => {
  //Create a new state for our context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact={true}>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>

        <Redirect to="/" />

      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/auth">
          <UserAuth />
        </Route>

        <Redirect to="/auth" />

      </Switch>
    );
  }


  //We wrap 'Router' around everything that should be able to use our router. Ex: pages.
  //ORDER MATTERS FOR UPDATE PLACE, since the router checks for the place/new route first!!
  //The 'AuthContext' component is a React component that controls context, so we can pass application-wide state without having to use props to do so; which would be a nightmare.
  //  ^cont'd: By using Context, any component that references this 'AuthContext' component inside of our <AuthContext/> container here will be re-rendered when the AuthCOntext value(s) are updated.
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
            {routes}
        </main>

      </Router>;
  </AuthContext.Provider>
  );
};

export default App;
