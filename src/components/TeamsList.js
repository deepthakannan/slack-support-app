var React = require("react");
var httpService = require("../services/SupportService");

module.exports = class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      selectedTeam: null
    };
    this.onTeamClick = this.onTeamClick.bind(this);
  }

  componentWillMount = () => {
      httpService.getTeams().then((teams) => {
        this.setState({
          teams: teams
        });
      });
  };

  onTeamClick = selectedTeam => {
    this.setState({
      selectedTeam: selectedTeam
    })
    this.props.teamClicked(selectedTeam);
  };

  isSameTeam(teamA, teamB) {
    if(!teamA || !teamB) {
      return false;
    }
    return teamA.name == teamB.name;
  }

  getTeamRow(team) {
    return (
      <tr key={team.name} onClick={() => this.onTeamClick(team)}>
        <td className={this.isSameTeam(this.state.selectedTeam, team) ? "selected" : "unselected"}>{team.name}</td>
      </tr>
    );
  }

  render = () => {
    return (
      <div className="centerAlign">
        <table align="center" className="centerAlign">
          <tbody>{this.state.teams.map(team => this.getTeamRow(team))}</tbody>
        </table>
      </div>
    );
  };
};
