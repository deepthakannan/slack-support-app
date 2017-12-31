var _ = require("lodash");
var differenceInDays = require('date-fns/difference_in_days');
var isEqual = require('date-fns/is_equal')
var isPast = require('date-fns/is_past');
class Schedules {
  constructor(storage) {
    this.storage = storage;
  }

  initializeRoutes(express) {
    let router = express.Router();
    router.get('/:teamName', (req, res, next) => this.getTeamSchedule(req, res, next));
    router.put('/:teamName', (req, res, next) => this.putTeamSchedule(req, res, next));
    return router;
  }

  getTeamSchedule(req, res, next) {
    let teamName = req.params.teamName;
    let noOfDays = parseInt(req.query.noOfDays);
    if(noOfDays > 14) {
      noOfDays = 14;
    }
    let startDate = new Date(req.query.startDate);
    var tempStartDate = null;
    var schedule = this.storage.getSchedules(startDate, noOfDays, teamName)

    res.send(schedule);
  }

putTeamSchedule(req, res, next) {
  let schedules = req.body;
  if(!_.isArray(schedules) || schedules.length == 0) {
    res.status(400).send("No schedule found to be updated");
    return;
  }
  let currentDate = new Date();
  currentDate.setHours(0,0,0,0);
  let teamName = req.params.teamName;
  let responsed = false;
  let scheduleError = _.find(schedules, schedule => {
    schedule.day = new Date(schedule.day);
    if(schedule.schedules.length !== 1) {
      res.status(400).send("schedule array need to have a lengh of 1");
      return true;
    }
    if(schedule.schedules[0].from !== null || schedule.schedules[0].to !== null) {
      res.status(400).send("schedule's from and to should be null till this feature is implemented");
      return true;
    }
    schedule.day.setHours(0,0,0,0);
    if(isPast(schedule.day) && this.getDayDiff(schedule.day, currentDate) < 0){
      res.status(400).send("Cannot update past date's schedule");
      return true;
    }
  });
  if(scheduleError) {
    return;
  }
  let maxDate = _.max(req.body, schedule => schedule.day);
  if(this.getDayDiff(currentDate, maxDate) > 14) {
    res.status(400).send("Cannot update for more than 14 days");
    return;
  }
  let startDate = schedules[0].day;
  let currentSchedules = this.storage.getSchedules(startDate, 14, teamName);
  _.remove(currentSchedules, currentSchedule => {
    return _.find(schedules, newSchedule => isEqual(newSchedule.day, currentSchedule.day));
  })
  _.forEach(schedules, schedule => {
    currentSchedules.push(schedule);
  })
  res.send(currentSchedules);
}

getDayDiff(startDate, endDate) {
  return differenceInDays(startDate, endDate);
}

}

module.exports = Schedules;