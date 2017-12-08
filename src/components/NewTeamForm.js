var React = require("react");
var ReactDOM = require('react-dom');
var httpService = require("../services/SupportService");
var TimeSchedule = require("./TimeSchedule");
var _ = require("lodash");
var httpService = require("../services/SupportService");

class NewTeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    submitNewTeam = (e) => {
        this.setState({
            error: ""
        });
        httpService.addNewTeam({
            name: this.state.name
        }).then((team) => {
            this.props.teamCreated(team);
        }).catch((error) => {
            this.setState({
                error: error
            });
        })
        e.preventDefault();
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value,
            error: ""
        });
        e.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: "",
            name: ""
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.submitNewTeam(e)}>
                <span>
                    <label>Team name</label>
                    <div>
                        <input type="textbox" placeholder="[new team name]" onChange={(e) => this.onNameChange(e)} value={this.state.name} ></input>
                        <p style={{color: "red"}}>{this.state.error}</p>
                    </div>
                    
                </span>
                
                <button onClick={(e)=>this.submitNewTeam(e)}>Submit</button>
            </form>
            
        )
    }
};

module.exports = NewTeamForm


