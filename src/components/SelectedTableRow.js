var React= require("react");
module.exports = class SelectableTableData extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <td className={this.props.isSelected == team ? "selected" : "unselected"}>{this.props.data}</td>
        )
    }
}