import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Route } from 'react-router'
import Cookies from 'universal-cookie';
import { girder, configuration } from '@openchemistry/redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import CssBaseline from '@material-ui/core/CssBaseline';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';

import { auth } from '@openchemistry/girder-redux';

import App from './App';

import store from './store'

// Webcomponents
import { defineCustomElements as defineMolecule } from '@openchemistry/molecule/loader';

defineMolecule(window);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[400]
    },
    secondary: pink,
  },
  pageHead: {
    paddingTop: 4,
    paddingBottom: 14
  },
  pageBody: {
    marginTop: -13
  },
  pageContent: {
    width: 150,
    paddingLeft: 3,
    paddingRight: 3
  },
  drawer: {
    width: 240,
    backgroundColor: '#37474F'
  }
});

// Check to see if we have a cookie
const cookies = new Cookies();
const cookieToken = cookies.get('girderToken');
// if there is no token the string "undefined" is returned ?!!
// if (!isNil(cookieToken)) {
if (cookieToken !== 'undefined') {
  store.dispatch(auth.actions.authenticate({token: cookieToken}));
}

store.dispatch(auth.actions.testOauthEnabled());
store.dispatch(configuration.loadConfiguration());


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
