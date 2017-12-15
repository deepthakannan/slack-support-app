var React = require("react");
var httpService = require("../services/SupportService");
var DetailedWeekSchedule = require("./DetailedWeekSchedule");
var _ = require("lodash");

module.exports = class Schedules extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.team != this.props.team || nextProps.member != this.props.member;
  }

  render = () => {
    var previous = "<=Previous";
    var next = "Next=>"
    return (
      <div>
        <div className={"scheduleDateViewControls"}>
          <button>{previous}</button>
          <button>{next}</button>

        </div>
        <div className={"schedule"}>
          <DetailedWeekSchedule member={this.props.member} startDate={new Date()}></DetailedWeekSchedule>
        </div>
      </div>
    );
  };
};
