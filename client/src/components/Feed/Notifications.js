/* eslint-disable */
import React, {Component} from 'react';
import '../../style/Notifications.css'
import {connect} from  'react-redux';
import Notification from './Notification'

class Notifications extends Component {
render() {

let notification
      if (this.props.currentGoalStepsClone.some((stepObj) => stepObj.suggestedStep)) {
        if (this.props.currentGoalStepsClone.every((stepObj) =>
          stepObj.id))
            notification =  this.props.currentGoalStepsClone.map((_stepObj) => {
              // console.log('currentGoalStepsClone for notification', _stepObj)
            if (_stepObj.suggestedStep === true) {
              return <Notification randomColorUserName={this.props.randomColorUserName} randomColorStep={this.props.randomColorStep} user={_stepObj.suggester} step={_stepObj.step} key={_stepObj.id} id={_stepObj.id} />
              }
              notification = null
              })
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
  return {currentGoalStepsClone: state.goals.currentGoalStepsClone}
}

const ConnectedNotifcations =  connect(mapStateToProps)(Notifications)
 export default  ConnectedNotifcations
