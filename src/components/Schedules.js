var React = require("react");
var httpService = require("../services/SupportService");
var DetailedWeekSchedule = require("./DetailedWeekSchedule");
var WeekDaySchedules = require("./WeekDaySchedules");

var _ = require("lodash");

module.exports = class Schedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null,
      currentDate: new Date(),
      currentScheduleModified: false
    };
  }

  updateSchedule = (date, schedule) => {
    this.setState({
      schedule: schedule,
      currentScheduleModified: true
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.team != this.props.team) {
      this.setState({
        schedule: null,
        currentDate: new Date(),
      })
    }
  }

  navigatePrevious = () => {
    this.state.currentDate.setDate(this.state.currentDate.getDate() - 7),
    this.setState({
      schedule: null,
      currentScheduleModified: false
    })
  }

  navigateNext = () => {
    this.state.currentDate.setDate(this.state.currentDate.getDate() + 7),
    this.setState({
      schedule: null,
      currentScheduleModified: false
    })
  }

  getDateKey(date) {
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  }

  render = () => {
    var previous = this.state.currentScheduleModified ? "* Save & Previous" : "<=Previous";
    var next = this.state.currentScheduleModified ? "* Save & Next=>" : "Next=>";
    return (
      <div>
        <div className={"scheduleDateViewControls"}>
          <button onClick={()=>this.navigatePrevious()}>{previous}</button>
          <button onClick={()=>this.navigateNext()}>{next}</button>

        </div>
        <div className={"schedule"}>
          <WeekDaySchedules team={this.props.team} startDate={this.state.currentDate} supportInfoChanged={(schedules => this.updateSchedule(this.state.currentDate, schedules))}></WeekDaySchedules>
        </div>
      </div>
    );
  };
};
