var React = require("react");
var httpService = require("../services/SupportService");
var TimeSchedule = require("./TimeSchedule");
var _ = require("lodash");

module.exports = class DetailedWeekSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    var schedule = httpService.getCurrentSchedule(props.teamName, props.startDate, 7).then(schedule => {
      this.state = {
        schedule: this.generateScheduleTableData(schedule)
      }
    });
    
  }

  assignCurrentMember(hourData, day) {
    if(this.props.member) {
      hourData.member = this.props.member;
    }
    this.setState({
      schedule: this.state.schedule
    });
  }

  getWeekRowData(hourData) {
    let timeSchdules = this.state.schedule.map(day => {
      let scheduleHourData = day.hours[hourData.hour];
      return <td key={day.date.getDay()} onClick={()=>this.assignCurrentMember(scheduleHourData, day.date)}> <TimeSchedule key={day.date.getDay()} onHourScheduleClicked={()=>this.assignCurrentMember(scheduleHourData, day.date)} day={day.date} className={"timeSchedule"} hourData={scheduleHourData}> </TimeSchedule> </td>;
    });
    return timeSchdules;
  }

  getHourRows() {
    return (
      this.state.schedule[0].hours.map((hourData) => {
        return <tr key={hourData.hour}>
          <td key={hourData.hour}>{hourData.hour}</td>
          {this.getWeekRowData(hourData)}
        </tr>
      })
    )
  }

  getDayHeaderRows() {
    return this.state.schedule.map(dayData => {
      let day = dayData.date.getDay();
      return <th key={day}>{this.days[day]}</th>;
    });
  }

  render() {
    return (
      <table className={"scheduleTable"}>
        <thead>
          <tr>
            <th>Hours</th>
            {this.getDayHeaderRows()}
          </tr>
        </thead>
        <tbody>
          {this.getHourRows()}
        </tbody>
      </table>
    );
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


