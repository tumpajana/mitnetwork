import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../src/redux/reducers/rootReducer";
// "../src/redux/reducers/rootreducer";
let store =createStore(rootReducer,applyMiddleware(thunk))




ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
