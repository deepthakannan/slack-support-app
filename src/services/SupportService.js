var  _ = require("lodash");
class SupportService {
  getTeams = () => {
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

  getMembers = teamName => {
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

  getCurrentSchedule = teamName => {
    if (teamName == "Team 404") {
      return [
        {
          from: new Date(),
          to: new Date(),
          name: "Deeptha kannan"
        },
        {
          from: new Date(),
          to: new Date(),
          name: "Vaidya"
        },
        {
          from: new Date(),
          to: new Date(),
          name: "Kranthi Nuthi"
        }
      ];
    } else {
      return _.range(0, 3, 1).map(value => {
        return {
          from: new Date(),
          to: new Date(),
          name: "Member " + value
        };
      });
    }
  };
}

module.exports = new SupportService();
