var  _ = require("lodash");
var rp = require('request-promise');

let supportServiceUrl = "http://localhost:3001/"


class SupportService {
  getTeams  () {
    var options = {
      uri: supportServiceUrl + "teams",
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      json: true
  };
    return rp(options);
  }

  addNewTeam(team) {
    return rp.post(supportServiceUrl + "teams", { body: team, json: true});
  }

  getMembers(teamName) {
    return rp(supportServiceUrl + "members", {qs: { teamName: teamName }, json: true});
  };

  getCurrentSchedule(teamName, startDate, noOfDays) {
    let query = {
      'startDate': startDate, 
      'teamName': teamName, 
      'noOfDays': noOfDays
    }
    return rp(supportServiceUrl + "schedules", {qs: query, json: true });
  }
}

module.exports = new SupportService();
