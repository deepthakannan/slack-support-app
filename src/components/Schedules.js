var React = require("react");
var httpService = require("../services/SupportService");
var _ = require("lodash");

module.exports = class Schedules extends React.Component {
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
    this.hours = _.range(0, 24, 2).map(hour => hour >= 12 ? hour + ".00 pm" : hour + ".00 am" );
    this.state = {
      members: []
    };
  }

  componentWillMount = () => {
    if (this.props.team) {
      this.setState({
        members: httpService.getMembers(this.props.team.name)
      });
    } else {
      this.setState({
        members: []
      });
    }
  };

  getWeekRowData(hour) {
    return this.days.map(day => {
      return <td>{}</td>;
    });
  }

  getHourRows() {
    return this.hours.map(hour => {
      return (<tr key={hour}>
        <td>{hour}</td>
        {this.getWeekRowData(hour)}
      </tr>);
    });
  }

  getWeekNameHeaderRows() {
    return this.days.map(day => {
      return <th>{day}</th>;
    });
  }

  render = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Hours</th>
            {this.getWeekNameHeaderRows()}
          </tr>
        </thead>
        <tbody>{this.getHourRows()}</tbody>
      </table>
    );
  };
};
