var React = require("react");
var _ = require("lodash");

module.exports = class TimeSchedule extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let memberName = "-";
    if(this.props.hourData.member) {
      memberName = this.props.hourData.member.name;
    }
    return (
      <div>
          <div>
            <span>{memberName}</span>
          </div>
      </div>
    )
  }
}