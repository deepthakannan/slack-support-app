var  _ = require("lodash");
class SupportService {
  getTeams  () {
    return [
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
  };

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
    return schedule;
  }
}

module.exports = new SupportService();
