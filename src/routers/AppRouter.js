import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Main from '../components/Main';
import NotFoundPage from '../components/NotFoundPage';
import OneTab from '../components/OneTab';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={OneTab} exact={true} />
            <Route path="/category/:categoryName" component={Main}/>
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;