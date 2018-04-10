import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Header from './../Header/Header';
import Profile from '../Profile/Profile';
import Wall from './../Wall/Wall';
import PostDetails from "./../PostDetails/PostDetails";
import { ToastContainer, toast } from 'react-toastify';

class Layout extends Component {

    constructor(props) {
        super(props);
        console.log("Children", this.props);
    }

    // layout view
    render() {
        return (
            <div className="App">
                <Header ></Header>
                <Route path={`${this.props.match.url}/wall`} component={Wall} />
                <Route path={`${this.props.match.url}/profile`} component={Profile} />
                <ToastContainer autoClose={2000} />
            </div>
        );
    }

}

export default Layout;