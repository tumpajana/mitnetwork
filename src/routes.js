import React from 'react';
import Header from './Components/Header/Header';
import Profile from './Components/Profile/Profile';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Wall from './Components/Wall/Wall';
import Post from "./Components/Posts/post";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () => (
    <BrowserRouter>
        <Switch>
        <Route exact path='/' component= {Signin} />
        <Route  path='/header' component= {Header} />
        <Route  path='/profile' component= {Profile} />
        <Route  path='/login' component= {Signin} />
        <Route  path='/signup' component= {Signup} />
        <Route  path='/wall' component= {Wall} />
        <Route  path='/post' component= {Post} />
        </Switch>
    </BrowserRouter>
);
export default Routes