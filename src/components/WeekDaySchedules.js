var React = require("react");
var httpService = require("../services/SupportService");
var _ = require("lodash");
var DaySchedule = require("./DaySchedule");

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
    if(this.props.team) {
      this.refresh(this.props.team, this.props.startDate);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.team) {
      this.refresh(nextProps.team, nextProps.startDate);
    }
  }

  refresh(team, startDate) {
    httpService.getMembers(team.name).then(members => {
      this.refreshSchedules(team, members, startDate);
    });
    
  }

  refreshSchedules(team, members, startDate) {
    httpService.getCurrentSchedule(team.teamName, startDate, 7).then(currentSchedule => {
      this.setState({
        schedule: currentSchedule,
        members: members,
        loading: false
      })
    })
  }

  applySupportInfoChange = (oldSchedule, newSchedule) => {
    let oldScheduleIndex = _.findIndex(this.state.schedule, daySchedule => daySchedule == oldSchedule);
    if(oldScheduleIndex >= 0) {
      this.state.schedule.splice(oldScheduleIndex, 1, newSchedule)
      this.setState({
          schedule: this.state.schedule.slice()
        }, () => {
          this.props.supportInfoChanged(this.state.schedule);
        }
      )
      
    }
  } 

  render = () => {
    if (this.state.loading) {
      return <Loading name="schedules"></Loading>
    } else {
      return (
        <div>
          {this.state.schedule.map(daySchedule => {
            return <DaySchedule key={daySchedule.day} schedule={daySchedule} members={this.state.members} supportInfoChange={(old, newSchedule) => this.applySupportInfoChange(old, newSchedule)}></DaySchedule>
          })}
        </div>
      );
    }
  };
};
