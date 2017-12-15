var React = require("react");
var httpService = require("../services/SupportService");
var _ = require("lodash");

let Loading = function (props) {
  return (
    <div>Loading {props.name}...</div>
  )
}

module.exports = class WeekDaySchedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schedule: null
    }
  }

  componentWillUpdate = () => {
    httpService.getCurrentSchedule(this.props.teamName, this.props.startDate, 7).then(schedule => {
      this.setState({
        schedule: schedule,
        loading: false
      })
    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (this.props.member != nextProps.member);
  }


  render = () => {
    if (this.state.loading) {
      return <Loading name="schedules"></Loading>
    } else {
      return (
        <div>
          {this.state.schedule.map(daySchedule => {
            return <div>{daySchedule.day.toString()}</div>
          })}
        </div>
      );
    }
  };

  generateScheduleTableData(schedule) {
    let scheduleData = [];
    schedule.forEach(data => {
      scheduleData.push({
        date: data.day,
        hours: _.range(0, 24, 1).map(hour => {
          return {
            hour: hour,
            member: null
          }
        })
      })
    })
    return scheduleData;
  }
};
