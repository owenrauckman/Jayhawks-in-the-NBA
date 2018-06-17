import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'


import { Provider } from 'mobx-react';
import {  } from 'mobx-react';
import GroceryStore from './groceries.store.js';

const groceryStore = new GroceryStore();



/* My components */
import Home from './Home.js';
import Profile from './Profile.js';


export default class App extends Component {
  render() {
    return (
      <Provider groceryStore = {groceryStore}>
        <NativeRouter>
          <SafeAreaView style={styles.container}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/profile/:personId" component={Profile}/>
          </SafeAreaView>
        </NativeRouter>
      </Provider>
    );
  }
}

/* Router */

/*
  Component Styles
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
