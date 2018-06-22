import React, { Component } from 'react';
import { FlatList, Button, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Font } from 'expo';
import { Link } from 'react-router-native'
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


@inject("playerStore")

@observer
class Home extends Component {
  constructor(props){
    super(props);
  }

  /*
    Make sure the font is loaded before the component renders
  */
  componentWillMount(){
    Font.loadAsync({
      'Montserrat-Medium': require('../assets/fonts/Montserrat.ttf'),
    });
  }

  /*
    Mount Component asynchronously
  */
  async componentDidMount(){
    await this.props.playerStore.fetchPlayers('Kansas');
    await this.props.playerStore.fetchTeams();
  }

  getTeamName(teamId){
    if(this.props.playerStore.teams && this.props.playerStore.teams.length ){
      const retVal = this.props.playerStore.teams.find((team)=> teamId === team.teamId);
      if(retVal){
        return retVal.ttsName;
      } else{
        return '';
      }
    }
    return '';
  }

  render(){
    const players = this.props.playerStore.players;
    return (
      <Results behavior="padding" enabled>
        <PlayerList
          data={players}
          keyExtractor={(player, index) => index.toString()}
          renderItem={({item, index}) =>
          <Link
            to={`/profile/${item.personId}?playerName=${item.firstName} ${item.lastName}`}
            item={item}
          >
            <Row>
              <View>
                <Name>{`${item.firstName} ${item.lastName}`}</Name>
                <Team>{this.getTeamName(item.teamId)}</Team>
              </View>
              <NumberContainer>
                <Num>{item.jersey}</Num>
              </NumberContainer>
            </Row>
          </Link>
          }
        />
        <SearchBar>
          <SearchBarInput
            placeholder="Type your college team"
            placeholderTextColor="rgba(255,255,255,0.8)"
            onChangeText={(text) => this.props.playerStore.fetchPlayers(text)}
          />
        </SearchBar>
      </Results>
    )
  }
}

/*
  Component Styles
*/
const backgroundColor = '#FFFFFF';
const borderColor = '#EFEFF2';
const darkText = '#3F4956';
const lightText = 'rgba(63,73,86, 0.5)';
const circleBackground = 'rgba(63,73,86,0.03)';
const searchBackground = '#5358FF';

const Results = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${backgroundColor};
`;

const PlayerList = styled.FlatList`
  flex: 1;
  background-color: ${backgroundColor};
`;

const Row = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${borderColor};
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 18px;
  color: ${darkText};
  font-family: Montserrat-Medium;
`;

const Team = styled.Text`
  font-size: 12px;
  color: ${lightText};
  font-family: Montserrat-Medium;
  margin-top: 4px;
`;

const NumberContainer = styled.View`
  margin-right: 30px;
  background-color: ${circleBackground};
  height: 54px;
  width: 54px;
  border-radius: 54px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Num = styled.Text`
  font-size: 18px;
  font-family: Montserrat-Medium;
  text-align: center;
  color: ${lightText};
`;

const SearchBar = styled.View`
  background: ${searchBackground};
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(83,88,255,0.50);
`;

const SearchBarInput = styled.TextInput`
  font-size: 16px;
  color: white;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  text-align: center;
`;


export default Home;
