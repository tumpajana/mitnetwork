import React from 'react';
import Header from './Components/Header/Header';
import Profile  from './Components/Profile/Profile';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes=()=>(
    <BrowserRouter>
        <Switch>
        <Route exact path='/' component= {Header} />
        <Route  path='/header' component= {Header} />
        <Route  path='/Profile' component= {Profile} />
        <Route  path='/Signin' component= {Signin} />
        <Route  path='/Signup' component= {Signup} />

        </Switch>
        </BrowserRouter>
    );
    export default Routes