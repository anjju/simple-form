import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Registration  from './Registration/Registration';
import List from './List/List';

const Routes = () =>
    (
        <Router>
            <Switch>
                <Route exact path="/register" component={Registration}></Route>
                <Route exact path="/register/:id" component={Registration}></Route>
                <Route exact path="/register/:id/:editProfilepic" component={Registration}></Route>

                <Route exact path="/list" component={List}></Route>
                <Route exact path="/" component={Home}></Route>
            </Switch>
        </Router>
    )
export default Routes;