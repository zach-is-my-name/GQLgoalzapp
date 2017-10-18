import React, {Component} from 'react';
import '../../style/NotificationsOwnGoal.css'
import {connect} from  'react-redux';
import Notification from './Notification'

class NotificationsOwnGoal extends Component {
render() {

let notification
      if (this.props.currentGoalStepsClone.some((stepObj) => stepObj.suggestedStep )) {
  notification =  this.props.currentGoalStepsClone.map((_stepObj) => {
          if (_stepObj.suggestedStep === true) {
          console.log(_stepObj)
          return <Notification randomColorUserName={this.props.randomColorUserName} randomColorStep={this.props.randomColorStep} user={_stepObj.suggester} step={_stepObj.step} key={_stepObj.id} id={_stepObj.id} />
        }
          notification = null
        })
}
console.log(notification)
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

const ConnectedNotifcations =  connect(mapStateToProps)(NotificationsOwnGoal)
 export default  ConnectedNotifcations
