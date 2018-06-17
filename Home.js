import React, { Component } from 'react';
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native'

import { inject } from 'mobx-react';

@inject("groceryStore")

export default class Home extends Component {
  constructor(props){
    super(props);
    this.nbaUrl = 'https://data.nba.net/10s/prod/v1';
    this.state = {
      isLoading: true,
    }
  }

  /*
    Mount Component asynchronously
  */
  async componentDidMount(){
    this.setState({
      isLoading: false,
      players: await this.fetchPlayers('Kansas')
    })
  }

  /*
    Fetches a list of NBA players from a given school
    @param { college } - College player attended
  */
  async fetchPlayers(college){
    try{
      const rawResponse = await fetch(`${this.nbaUrl}/2017/players.json`);
      const response = await rawResponse.json();
      return response.league.standard.filter(player => player.collegeName === college);
    } catch (error) {
      console.log(error)
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>{this.props.groceryStore.groceries.toString()}</Text>
        <FlatList
          style={styles.container}
          data={this.state.players}
          keyExtractor={(player, index) => index.toString()}
          renderItem={({item, index}) =>
          <View style={[styles.playerRow, (index === this.state.players.length - 1) ? {borderBottomWidth: 0} : {}]}>
            <Link
              underlayColor='rgba(162,191,229, 0.25)'
              to={`/profile/${item.personId}?playerName=${item.firstName} ${item.lastName}`}
              item={item}
            >
                <Text style={styles.player}>{`${item.firstName} ${item.lastName}`}</Text>
            </Link>

          </View>}
        />
      </View>
    )
  }
}


/*
  Component Styles
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1760C0',
  },
  menu: {
    flex: 1,
    backgroundColor: '#EDE7DD'
  },
  playerRow: {
    flex: 1,
    borderColor: 'rgba(162,191,229, 0.25)',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  player: {
    fontSize: 18,
    height: 'auto',
    color: '#EDE7DD',
  },
})
