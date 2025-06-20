// src/logic/gameLogic.js

export default {
  resetTeams(teams) {
    return teams.map(team => ({
      ...team,
      score: 0,
      errors: 0
    }));
  },
  updateScore(team, points) {
    team.score += points;
  },
  addError(team) {
    team.errors = team.errors ? team.errors + 1 : 1;
  },
  transferPoints(fromTeam, toTeam, points) {
    fromTeam.score -= points;
    toTeam.score += points;
  }
};
