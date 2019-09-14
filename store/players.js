import { observable, computed, action } from 'mobx';

export default class PlayerStore {
  @observable allPlayers = [];
  @observable players = [];
  @observable selectedPlayer = {};
  @observable teams = [];

  /*
    Fetches a list of NBA players from a given school
    @param { college } - College player attended
  */
  @action
  async fetchPlayers(college, url){
    if(this.allPlayers.length === 0){
      try{
        const rawResponse = await fetch(`https://data.nba.net/10s/prod/v1/2018/players.json`);
        const response = await rawResponse.json();
        this.allPlayers = response.league.standard;
        this.players = response.league.standard.filter(player => player.collegeName === college);
      } catch (error) {
        console.log(error)
      }
    } else{
      this.players = this.allPlayers.filter(player => college.trim().toLowerCase() === player.collegeName.toLowerCase());
    }
  }

  /*
    Fetches a list of NBA players from a given school. Also maps a player's info
    @param { college } - College player attended
  */
  @action
  async fetchPlayer(personId){
    this.selectedPlayer.isLoading = true;
    try{
      const rawResponse = await fetch(`https://data.nba.net/10s/prod/v1/2018/players/${personId}_profile.json`);
      const response = await rawResponse.json();
      this.selectedPlayer = {
        stats: response.league.standard.stats,
        info: this.players.find((player)=> player.personId === personId)
      }
      this.selectedPlayer.isLoading = false;
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async fetchPlayerGameLog(personId){
    this.selectedPlayer.isLoading = true;
    try{
      const rawResponse = await fetch(`https://data.nba.net/10s/prod/v1/2018/players/${personId}_gamelog.json`);
      const response = await rawResponse.json();
      this.selectedPlayer.gamelog = response.league.standard;
      this.selectedPlayer.isLoading = false;
    } catch (error) {
      console.log(error)
    }
  }

  /*
    Fetches a list of NBA teams
    @param { college } - College player attended
  */
  @action
  async fetchTeams(){
    try{
      const rawResponse = await fetch(`http://data.nba.net/data/1h/prod/2018/teams_config.json`);
      const response = await rawResponse.json();
      this.teams = response.teams.config;
    } catch (error) {
      console.log(error)
    }
  }


}
