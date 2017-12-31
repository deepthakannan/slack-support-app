var _ = require("lodash");
var data = require("./testData");


class Storage {

  constructor(){
  }

  getMembers(teamName) {
    return _.find(data.members, teamMember => teamMember.team == teamName);
  }

  getTeams() {
    return data.teams;
  }

  getSchedules(startDate, noOfDays, teamName) {
    let teamMembers = _.find(data.schedules, schedule => schedule.team == teamName);
    return teamMembers.schedules;
  }
}

module.exports = new Storage();