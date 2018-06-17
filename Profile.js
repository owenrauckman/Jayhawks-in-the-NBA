import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native'



export default class Profile extends Component {
  constructor(props){
    super(props);
    this.nbaUrl = 'https://data.nba.net/10s/prod/v1';
    this.state = {
      isLoading: true,
      player: {},
    }
  }

  /*
    Mount Component asynchronously
  */
  async componentDidMount(){
    // console.log(this.props.location.search.remove('?player'))
    this.setState({
      name: this.props.location.search.replace('?playerName=', ''),
      player: await this.fetchPlayer(this.props.match.params.personId),
      isLoading: false,
    })

  }

  /*
    Fetches a list of NBA players from a given school
    @param { college } - College player attended
  */
  async fetchPlayer(personId){
    try{
      const rawResponse = await fetch(`${this.nbaUrl}/2017/players/${personId}_profile.json`);
      const response = await rawResponse.json();
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  /*
    Render a component, if the API loading, wait for it to finish
  */
  render(){
    if(!this.state.isLoading){
      const career = this.state.player.league.standard.stats.careerSummary;
      return (
        <View style={{paddingLeft: 20, backgroundColor: '#EDE7DD', flex: 1}}>
          <Link
            underlayColor='rgba(162,191,229, 0.25)'
            to="/"
          ><Text style={{fontSize: 16, paddingTop: 10, paddingBottom: 10}}>Back</Text>
          </Link>
          <Text style={{fontSize: 36, paddingTop: 40, paddingBottom: 20}}>{this.state.name}</Text>
          <Text style={{fontSize: 16}}>{`PPG: ${career.ppg}`}</Text>
          <Text style={{fontSize: 16}}>{`RPG: ${career.rpg}`}</Text>
          <Text style={{fontSize: 16}}>{`APG: ${career.apg}`}</Text>

        </View>
      )
    }
    // Loading State
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    )
  }
}


/*
  Component Styles
*/
const styles = StyleSheet.create({
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
