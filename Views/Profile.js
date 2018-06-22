import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import Image from 'react-native-remote-svg'
import { Link } from 'react-router-native'
import { inject, observer } from 'mobx-react';

@inject("playerStore")

@observer
class Profile extends Component {
  constructor(props){
    super(props);
  }

  /*
    Mount Component asynchronously
  */
  async componentDidMount(){
    await this.props.playerStore.fetchPlayer(this.props.match.params.personId);
    await this.props.playerStore.fetchPlayerGameLog(this.props.match.params.personId);
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

  getTeamNameAbbr(teamId){
    if(this.props.playerStore.teams && this.props.playerStore.teams.length ){
      const retVal = this.props.playerStore.teams.find((team)=> teamId === team.teamId);
      if(retVal){
        return retVal.tricode;
      } else{
        return '';
      }
    }
    return '';
  }


  /*
    Render a component, if the API loading, wait for it to finish
  */
  render(){
    const player = this.props.playerStore.selectedPlayer;
    if(player.stats && player.info && player.gamelog && !player.isLoading){
      return (
        <Player>
          <Info>
            <View>
              <Name>{`${player.info.firstName} ${player.info.lastName}`}</Name>
              <Team>{this.getTeamName(player.info.teamId)}</Team>
            </View>
            <NumberContainer>
              <Num>{player.info.jersey}</Num>
            </NumberContainer>

          </Info>

          <View>
            <Stats>
              <Stat>{player.stats.careerSummary.ppg}</Stat>
              <Stat>{player.stats.careerSummary.rpg}</Stat>
              <Stat>{player.stats.careerSummary.apg}</Stat>
            </Stats>

            <StatsLabel>
              <StatLabel>PPG</StatLabel>
              <StatLabel>RPG</StatLabel>
              <StatLabel>APG</StatLabel>
            </StatsLabel>
          </View>

          <Table>
            <TableHeading>
              <TableHeadingItem>DATE</TableHeadingItem>
              <TableHeadingItem>OPP</TableHeadingItem>
              <TableHeadingItem>PTS</TableHeadingItem>
              <TableHeadingItem>AST</TableHeadingItem>
              <TableHeadingItem>REB</TableHeadingItem>
            </TableHeading>

            {player.gamelog.map((item, index) => (
               <TableRow key={index}>
                 <TableRowItem style={{fontSize: 10}}>{item.gameDateUTC.substring(item.gameDateUTC.indexOf('-') + 1)}</TableRowItem>
                 <TableRowItem>{this.getTeamNameAbbr( item.isHomeGame ? item.hTeam.teamId : item.vTeam.teamId )}</TableRowItem>
                 <TableRowItem>{item.stats.points}</TableRowItem>
                 <TableRowItem>{item.stats.assists}</TableRowItem>
                 <TableRowItem>{item.stats.totReb}</TableRowItem>
               </TableRow>
            ))}

          </Table>

          <Link to="/">
            <ButtonContainer>
              <Image
                source={{
                  uri: `data:image/svg+xml;utf8,<svg width="108" height="92" xmlns="http://www.w3.org/2000/svg"><g stroke="#3F4956" stroke-width="4" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M11.42 20.84L2 11.435 11.42 2M4 12h20.291"/></g></svg>`
                }}
                style={{height: 828, width: 952}}
              />
            </ButtonContainer>
          </Link>
        </Player>
      )
    }
    return (
      <Loading>
        <LoadingText>Loading</LoadingText>
      </Loading>
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

const Player = styled.View`
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  flex: 1;
  justify-content: space-between;
`;

const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  font-family: Montserrat-Medium;
`;


const Info = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const Name = styled.Text`
  font-size: 28px;
  color: ${darkText};
  font-family: Montserrat-Medium;
`;

const Team = styled.Text`
  font-size: 16px;
  color: ${lightText};
  font-family: Montserrat-Medium;
  margin-top: 4px;
`;

const NumberContainer = styled.View`
  margin-right: 30px;
  background-color: ${circleBackground};
  height: 64px;
  width: 64px;
  border-radius: 64px;
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

const ButtonContainer = styled.View`
  height: 46px;
  width: 54px;
`;

const Stats = styled.View`
  background: ${searchBackground};
  border-radius: 50px;
  margin-right: 30px;
  box-shadow: 0 0 10px rgba(83,88,255,0.50);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

const Stat = styled.Text`
  font-size: 28px;
  font-family: Montserrat-Medium;
  color: white;
  text-align: center;
`;

const StatsLabel = styled.View`
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

const StatLabel = styled.Text`
  font-size: 16px;
  font-family: Montserrat-Medium;
  color: ${lightText};
  text-align: center;
`;

const Table = styled.View`
  display: flex;
  margin-right: 30px;

`;

const TableHeading = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${circleBackground}
`;

const TableHeadingItem = styled.Text`
  padding: 15px;
  font-family: Montserrat-Medium;
  color: ${lightText};
  flex: 1;
  font-size: 12px;
  text-align: center;
`;

const TableRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TableRowItem = styled.Text`
  padding: 15px;
  font-family: Montserrat-Medium;
  color: ${lightText};
  flex: 1;
  font-size: 12px;
  text-align: center;
`;

export default Profile;
