var _ = require("lodash");
class Schedules {
  constructor(storage) {
    this.storage = storage;
  }

  initializeRoutes(express) {
    let router = express.Router();
    router.get('/', (req, res, next) => this.getTeamSchedule(req, res, next));
    return router;
  }

  getTeamSchedule(req, res, next) {
    let teamMembers = _.find(this.storage.members, teamMember => teamMember.team == req.query.teamName);
    let noOfDays = 7;
    let startDate = new Date();
    var tempStartDate = null;
    var schedule = [];
    for (var dayIndex = 0; dayIndex < noOfDays; dayIndex++) {
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
              name: teamMembers && teamMembers.members.length > dayIndex ? teamMembers.members[dayIndex].name : null
            }
        }
        ]
      });
    }
    res.send(schedule);
  }
}

module.exports = Schedules;