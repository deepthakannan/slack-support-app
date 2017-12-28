var React = require("react");
var httpService = require("../services/SupportService");
var _ = require("lodash");


module.exports = class DaySchedule extends React.Component {
  constructor(props) {
    super(props);
    let dayScheduleCopy = _.cloneDeep(this.props.schedule);
    this.state = {
      editSupportPerson: false,
      dayScheduleCopy: dayScheduleCopy
    }
  }

  changeSupport = (e) => {
    this.setState({
      editSupportPerson: true
    })
  }

  applyChange = (event) => {
    this.setState({
      editSupportPerson: false
    }, () => {
      this.props.supportInfoChange(this.props.schedule, this.state.dayScheduleCopy);
    })
  }

  memberChanged = (e) => {
    let daySchedule = this.state.dayScheduleCopy;
    if (daySchedule) {
      let isFullDaySchedule = daySchedule.schedules.length == 1 && !daySchedule.schedules[0].from && !daySchedule.schedules[0].to;
      if(isFullDaySchedule) {
        let fullDaySchedule = daySchedule.schedules[0];
        fullDaySchedule.member = _.find(this.props.members, member => member.id == e.target.value);
        this.setState({
          dayScheduleCopy: daySchedule
        })
      }
    }
  }

  render = () => {
    let daySchedule = this.state.dayScheduleCopy;
    if (daySchedule) {
        let isFullDaySchedule = daySchedule.schedules.length == 1 && !daySchedule.schedules[0].from && !daySchedule.schedules[0].to;

        if(isFullDaySchedule) {
            let fullDaySchedule = daySchedule.schedules[0];
            let selectedMember = _.find(this.props.members, member => member.id == fullDaySchedule.member.id);
            let selectedId = selectedMember ? selectedMember.id : null;
            let showEditMember = this.state.editSupportPerson;
            return (
                <div>
                  <p> {daySchedule.day.toString()} </p>
                  {
                    showEditMember && 
                    <span>
                      <select value={selectedId} onChange={(e) => this.memberChanged(e)}>
                        {_.map(this.props.members, (member) => <option key={member.id} value={member.id}> {member.name} </option>) }
                      </select>
                      <button onClick={(e) => this.applyChange(e)}>Apply</button>
                    </span>
                  }
                  {
                    !showEditMember && 
                    <button style={{ "borderWidth": "thin", background: "yellow"}} onClick={(e) => this.changeSupport(e)}>{fullDaySchedule.member.name}</button> 
                  }
              </div>
            )
        }
        return (
            <div>
              <p> {daySchedule.day.toString()} </p>
            <ol>
              {
            _.map(daySchedule.schedules, schedule => {
                return (
                <li> 
                  <div>
                    {schedule.member.id} 
                   </div>
                   <div>
                    {schedule.from}
                   </div>
                   <div>
                    {schedule.to} 
                   </div> 
                </li>
                )
            })
          }
          </ol>
          </div> )
    }
  };
};
