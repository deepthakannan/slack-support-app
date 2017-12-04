var React = require("react");
var _ = require("lodash");

module.exports = class TimeSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: this.props.hourData.members
    }
  }

  onMemberClick(member) {
    var index = this.state.members.indexOf(member);
    if (index > -1) {
      this.state.members.splice(index, 1);
    } else {
      this.props.onHourScheduleClicked();
    }
    this.setState({
      members: this.props.hourData.members
    });
  }
  render() {
    return (
      <div onClick={() => { this.onMemberClick(null) }}>
        {
          _.map(this.state.members, member => <div key={member.name} onClick={() => { this.onMemberClick(member) }}>{member.name}</div>)
        }
      </div>
    )
  }
}