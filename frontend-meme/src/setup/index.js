import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MemeDetails from './MemeDetails'
import AllMemes from './AllMemes'
import ErrorPage from './Error'

const ReactRouterSetup = () => {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <AllMemes />
            </Route>
            <Route path="/memes/:id" children={<MemeDetails />} >
            </Route>
            <Route path="*">
                <ErrorPage />
            </Route>
        </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
