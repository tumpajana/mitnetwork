import React from 'react';
import Profile from './Components/Profile/Profile';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Wall from './Components/Wall/Wall';
import Layout from './Components/Layout/Layout';
import Post from "./Components/Posts/post";
import PostDetails from "./Components/PostDetails/PostDetails";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Signin} />
            <Route path='/login' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/layout' component={Layout} />
        </Switch>
    </BrowserRouter>
);
export default Routes;