let currentDate = new Date();
currentDate.setHours(0,0,0,0);
module.exports = {
  members: [
    {
      team: "Team 404",
      members: [
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
    },
    {
      team: "Team Cirrus",
      members: [
        {
          name: "K Lee",
          id: 1
        },
        {
          name: "B Gu",
          id: 2
        },
        {
          name: "R Zach",
          id: 3
        },
        {
          name: "N Fred",
          id: 4
        },
        {
          name: "T Chang",
          id: 5
        },
        {
          name: "J Burke",
          id: 6
        }
      ]
    }
  ],
  teams: [
    {
      name: "Team 404"
    },
    {
      name: "Team Cirrus"
    }
  ],

  schedules: [
    {
      team: "Team 404",
      schedules: [
        {
          day: currentDate,
          schedules: [
            {
              from: null,
              to: null,
              member: {
                id: 1
              }
            }
          ]
        }
      ]
    },
    {
      team: "Team Cirrus",
      schedules: [
        {
          day: currentDate,
          schedules: [
            {
              from: null,
              to: null,
              member: {
                id: 2
              }
            }
          ]
        }
      ]
    }
  ]
};
