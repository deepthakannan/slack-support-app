var React = require("react");
var httpService = require("../services/SupportService");

class CheckedTableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleClass: "unselected"
    }
  }
  onCheckChanged = (e) => {
    if(e.target.checked) {
      this.props.teamClicked(this.props.team);
      this.setState({
          styleClass: "selected"
        }
      )
    }
    else {
      this.setState({
          styleClass: "unselected"
        }
      )
    }
    
  };

  render() {
    return (
      <td>
        <input type="radio" name="teams" value={this.props.team} onChange={(e)=> this.onCheckChanged(e)}></input>
        <label className={this.state.styleClass} >{this.props.team.name}</label>
      </td>
    )
  }
}

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
    this.setState({
      teams: httpService.getTeams()
    });
  };

  onTeamClick = selectedTeam => {
    this.setState({
      selectedTeam: selectedTeam
    })
    this.props.teamClicked(selectedTeam);
  };

  getTeamRow(team) {
    return (
      <tr key={team.name} onClick={() => this.onTeamClick(team)}>
        <td className={this.state.selectedTeam == team ? "selected" : "unselected"}>{team.name}</td>
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
