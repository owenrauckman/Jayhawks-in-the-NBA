import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import styled from 'styled-components';
import { Provider } from 'mobx-react';
import {  } from 'mobx-react';

/* Import and Create Store */
import PlayerStore from './store/players';
const playerStore = new PlayerStore();



/* My components */
import Home from './Views/Home.js';
import Profile from './Views/Profile.js';


export default class App extends Component {
  render() {
    return (
      <Provider playerStore = {playerStore}>
        <NativeRouter>
          <SafeArea>
            <Route exact path="/" component = {Home}/>
            <Route exact path="/profile/:personId" component = {Profile}/>
          </SafeArea>
        </NativeRouter>
      </Provider>
    );
  }
}


/*
  Component Styles
*/
const backgroundColor = '#FFFFFF';

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${backgroundColor};
`;
