import React, { Component } from "react";
import TeamList from "./TeamsList";
import TeamDetails from "./TeamDetails";
import Schedules from "./Schedules";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: null,
      currentMember: null,
      teamScheduleData: null
    };
  }

  handleTeamSelectionChange = team => {
    this.setState({
      currentTeam: team
    });
  };

  handleMemberSelectionChange = member => {
    this.setState({
      currentMember: member
    });
  };

  saveSchedules = () => {
    
  }

  render() {
    return (
      <div>
        <div className="leftpane">
          <div className="centerAlign">
            <h3 className="align-text-center">Teams</h3>
            <TeamList
              teamClicked={team => this.handleTeamSelectionChange(team)}
            />
          </div>
        </div>
        <div className="middlepane">
          <div className="centerAlign">
            <h3 className="align-text-center">TeamDetails</h3>
            <TeamDetails team={this.state.currentTeam} memberClicked={(member) => this.handleMemberSelectionChange(member)} />
          </div>
        </div>
        <div className="rightpane">
          <div className="centerAlign">
            <h3 className="align-text-center">Schedules</h3>
            <Schedules saveHandler={(data) => this.saveSchedules(data)} team={this.state.currentTeam} member={this.state.currentMember}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;