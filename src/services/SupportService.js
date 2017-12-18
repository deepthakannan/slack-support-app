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

var getTeamMembers = () => {
  return [
    {
      name: "Deeptha kannan",
      id: 1
    },
    {
      name: "Vaidya Chandrasekhar",
      id: 2
    },
    {
      name: "Kranthi Nuthi",
      id: 3
    },
    {
      name: "Emily Somma",
      id: 4
    },
    {
      name: "Nick Pomeroy",
      id: 5
    },
    {
      name: "Ian Mckay",
      id: 6
    },
    {
      name: "Poorva Kuber",
      id: 7
    }
  ]
}

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
    return new Promise(function(resolve, reject) {
      if (teamName == "Team 404") { 
        resolve(getTeamMembers());
    } else {
      let members = _.range(4, 10, 1).map(value => {
        return {
          name: "Member " + value,
          id: value
        };
      });
      resolve(members);
      }
    });
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
                id: dayIndex + 1,
                name: getTeamMembers()[dayIndex].name
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
