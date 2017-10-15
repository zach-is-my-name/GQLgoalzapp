// /* eslint-disable */
// //index is passed down as eventIndex because it is restricted in react-sortable
//


import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'

import '../../style/CurrentSteps.css'
import OwnCurrentSteps from  './OwnCurrentSteps.js'
import ForeignCurrentSteps from './ForeignCurrentSteps.js'

class CurrentSteps extends Component {

  componentWillMount() {
    if (this.props.loggedInUser !== this.props.targetUser) {
      // console.log('cloneCurrentStepsToSuggestedSteps called from CurrentSteps.js ')
      this.props.dispatch(actions.cloneCurrentStepsToSuggestedSteps(this.props.currentGoalSteps))
    }
  }

  render() {

    let currentSteps

    if (this.props.loggedInUser !== this.props.targetUser) {
      // console.log('Foreign Steps')
      currentSteps = <ForeignCurrentSteps />
    } else {
      console.log('this.props.loggedInUser', this.props.loggedInUser)
      console.log('this.props.targetUser', this.props.targetUser)
      console.log('Own Steps')
    currentSteps = <OwnCurrentSteps currentGoalSteps={this.props.currentGoalSteps} />
}
    return (
      <div className="steps-container">
        <p className="currentsteps-label">
          Steps:
        </p>
        {currentSteps}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID}
}
export default connect(mapStateToProps)(CurrentSteps);
