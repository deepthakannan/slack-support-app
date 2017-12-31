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
    return rp(supportServiceUrl + "members/" + teamName, {json: true});
  };

  getCurrentSchedule(teamName, startDate, noOfDays) {
    let query = {
      'startDate': startDate,
      'noOfDays': noOfDays
    }
    return rp(supportServiceUrl + "schedules/" + teamName, {qs: query, json: true });
  }

  updateSchedule(teamName, schedules) {
    return rp.put(supportServiceUrl + "schedules/" + teamName, {body: schedules, json: true });
  }
}

module.exports = new SupportService();
