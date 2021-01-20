import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyAdgLuP1LnLZtkOX_Tloqklx49obAdhEb4",
authDomain: "workspace-4b9b4.firebaseapp.com",
projectId: "workspace-4b9b4",
storageBucket: "workspace-4b9b4.appspot.com",
messagingSenderId: "419331902685",
appId: "1:419331902685:web:57d418ab2b350397efdf34",
measurementId: "G-VZJC20SXYV"
});

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
