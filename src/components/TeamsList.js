var React = require("react");
var httpService = require("../services/SupportService");

module.exports = class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
    this.onTeamClick = this.onTeamClick.bind(this);
  }

  componentWillMount = () => {
    this.setState({
      teams: httpService.getTeams()
    });
  };

  onTeamClick = team => {
    this.props.teamClicked(team);
  };

  getTeamRow(team) {
    return (
      <tr key={team.name} onClick={() => this.onTeamClick(team)}>
        <td>{team.name}</td>
      </tr>
    );
  }

  render = () => {
    return (
      <div className="centerAlign">
        <table className="centerAlign">
          <tbody>{this.state.teams.map(team => this.getTeamRow(team))}</tbody>
        </table>
      </div>
    );
  };
};
