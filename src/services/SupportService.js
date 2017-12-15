var  _ = require("lodash");

var teams = [
  {
    name: "Team 404"
  },
  {
    name: "Team Cirrus"
  },
  {
    name: "X-Curl"
  }
];
class SupportService {
  getTeams  () {
    return new Promise((resolve, reject)=>{
      resolve(teams);
    }); 
  }

  addNewTeam(team) {
    return new Promise((resolve, reject)=>{
      //setTimeout(function(){
        let randInt = Math.floor((Math.random() * 100));
        if(randInt % 2 == 0) {
          teams.push(team);
          resolve(team);
        } else {
          reject("Error occurred saving name")
        }
      //}.bind(this), 1000);
    }); 
  }

  getMembers(teamName) {
    if (teamName == "Team 404") { 
        return [
            {
              name: "Deeptha kannan",
              id: 1
            },
            {
              name: "Vaidya",
              id: 2
            },
            {
              name: "Kranthi Nuthi",
              id: 3
            }
          ];
    } else {
        return _.range(4, 10, 1).map(value => {
          return {
            name: "Member " + value,
            id: value
          };
        });
      }
    
  };

  getCurrentSchedule(teamName, startDate, noOfDays) {
    return new Promise(function(resolve, reject) {
      var tempStartDate = null;
      var schedule = [];
      for(var dayIndex = 0; dayIndex < noOfDays; dayIndex++) {
        tempStartDate = new Date(startDate);
        let date = new Date(tempStartDate.setDate(startDate.getDate() + dayIndex));
        schedule.push({
          day: date,
          schedules: [{
            from: null,
            to: null,
            member:
              {
                id: dayIndex
              }
          }
          ]
        });
      }
      resolve(schedule);
    });
  }
}

module.exports = new SupportService();
