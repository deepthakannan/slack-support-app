var React = require("react");
var ReactDOM = require('react-dom');
var httpService = require("../services/SupportService");
var TimeSchedule = require("./TimeSchedule");
var _ = require("lodash");

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.actionClick}>{this.props.name}</button>
        )
    }
};

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:true};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.children ? true : false
        })
    }

    render() {
        return (
            <div className={"App modal"} style={{display: this.state.show ? "block" : "none"}}>
                <button style={{flexAlign: "right"}} onClick={()=>{this.setState({show: false})}}>Close</button>
                <div className={"modal-content"}>
                    {this.props.children}
                </div>
                <div className={"modal-actions"}>
                    {_.map(this.props.actions, action => {
                        return <ActionButton name={action.name} actionClick={action.actionHandler}> </ActionButton>
                    })
                    }
                </div>
                
            </div>
        )
    }
}

module.exports = {
    Show: function(children, actions) {
        ReactDOM.render(<Popup children={children}  />, document.getElementById('popup-root'));
    },

    hide: function() {
        ReactDOM.render(<Popup children={null}  />, document.getElementById('popup-root'));
    }
} 


