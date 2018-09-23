/* eslint-disable */
import React, {Component} from 'react';
import '../../style/Notifications.css'
import {connect} from  'react-redux';
import Notification from './Notification'

class Notifications extends Component {
render() {

let notification
      if (this.props.currentGoalStepsClone.some(stepObj => stepObj.suggestedStep) && this.props.currentGoalStepsClone.every(stepObj =>
          stepObj.id)) {
            notification =  this.props.currentGoalStepsClone.map(_stepObj => {
              // console.log('currentGoalStepsClone for notification', _stepObj)
            if (_stepObj.suggestedStep && this.props.loggedInUser !== this.props.targetUser) {
              return <Notification randomColorUserName={this.props.randomColorUserName} randomColorStep={this.props.randomColorStep} user={''} step={_stepObj.step} key={_stepObj.id} id={_stepObj.id} />
            } else if (_stepObj.suggestedStep && this.props.loggedInUserID === this.props.targetUserID) {
              return <Notification randomColorUserName={this.props.randomColorUserName} randomColorStep={this.props.randomColorStep} user={_stepObj.suggester} step={_stepObj.step} key={_stepObj.id} id={_stepObj.id} />
              }
            })
        } else {
              notification = null
            }


return(
  <div className="sidebar">
    <ul>
      {notification}
    </ul>
  </div>
)
}
}

const mapStateToProps = (state, props) => {
  return {currentGoalStepsClone: state.goals.currentGoalStepsClone, targetUserID: state.goals.targetUserID, loggedInUserID: state.goals.loggedInUserID}
}

const ConnectedNotifcations =  connect(mapStateToProps)(Notifications)
 export default  ConnectedNotifcations
