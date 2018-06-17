import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'


/* My components */
import Home from './Home.js';
import Profile from './Profile.js';

export default class App extends Component {
  render() {
    return (
        <NativeRouter>
        <SafeAreaView style={styles.container}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile/:personId" component={Profile}/>
        </SafeAreaView>
        </NativeRouter>
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
