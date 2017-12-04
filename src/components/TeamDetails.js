var React = require("react");
var httpService = require("../services/SupportService");

module.exports = class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      selectedMember: null
    };
  }

  componentWillMount = () => {
    if (this.props.team) {
      this.refreshMembers(this.props.team.name);
    } else {
      this.setState({
        members: []
      });
    }
  };

  refreshMembers = teamName => {
    var members = httpService.getMembers(teamName);
    this.setState({
      members: members,
      selectedMember: null
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps && nextProps.team != this.props.team) {
      this.refreshMembers(nextProps.team.name);
    }
  };

  memberClick = (selectedMember) => {
    this.setState({
      selectedMember: selectedMember
    })
    this.props.memberClicked(selectedMember);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (nextProps.team != this.props.team) || (nextState.selectedMember != this.state.selectedMember);
  };

  isSameMember(memberA, memberB) {
    if(!memberA || !memberB) {
      return false;
    }
    return memberA.name == memberB.name;
  }

  getMemberRow(member) {
    return (
      <tr key={member.name} onClick={() => this.memberClick(member)}>
        <td className={this.isSameMember(this.state.selectedMember, member) ? "selected" : "unselected"}>{member.name}</td>
      </tr>
    );
  }

  canDisplayHelpText() {
    return (
      !this.state.selectedMember &&
      this.state.members &&
      this.state.members.length > 0
    );
  }

  render = () => {
    let helpText = (
      <p>
        {" "}
        {this.canDisplayHelpText()
          ? "Select a memeber to configure support schedule"
          : ""}
      </p>
    );
    return (
      <div>
        {helpText}
        <table>
          <tbody>
            {this.state.members.map(member => this.getMemberRow(member))}
          </tbody>
        </table>
      </div>
    );
  };
};
