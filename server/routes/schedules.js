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
              name: this.storage.members[0].members[dayIndex].name
            }
        }
        ]
      });
    }
    res.send(schedule);
  }
}

module.exports = Schedules;