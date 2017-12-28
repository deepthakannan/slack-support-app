import React, { Component } from "react";
import TeamList from "./TeamsList";
import TeamDetails from "./TeamDetails";
import Schedules from "./Schedules";
import Popup from "./Popup";
import NewTeamForm  from "./NewTeamForm";

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
    
  };

  teamCreated = (team) => {
    Popup.hide();
    this.setState({
      currentTeam: team
    });
  };

  addNewGroup = () => {
    Popup.Show(<NewTeamForm teamCreated={(team)=>this.teamCreated(team)} cancel={()=>Popup.hide()}></NewTeamForm>);
  }

  addNewMember = () => {
    Popup.Show("New Member");
  }

  render() {
    return (
      <div>
        <div className="leftpane">
          <div className="centerAlign">
          <span><h3 className="align-text-center">Teams</h3><button onClick={()=>this.addNewGroup()}>+</button></span>
            
            <TeamList teamClicked={team => this.handleTeamSelectionChange(team)}
            />
          </div>
        </div>
        <div className="middlepane" style={{'display': 'none'}}>
          <div className="centerAlign" >
          <span><h3 className="align-text-center">Team Details</h3><button onClick={()=>this.addNewMember()}>+</button></span>
            <TeamDetails team={this.state.currentTeam} memberClicked={(member) => this.handleMemberSelectionChange(member)} />
          </div>
        </div>
        <div className="rightpane">
          <div className="centerAlign">
            <h3 className="align-text-center">Schedules</h3>
            <Schedules saveHandler={(data) => this.saveSchedules(data)} team={this.state.currentTeam} member={this.state.currentMember} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
