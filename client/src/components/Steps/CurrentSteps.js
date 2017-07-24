/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'

class CurrentSteps extends Component {
  render() {
    let steps = this.props.currentGoalSteps.map((step, index) => {
      return <li key={index}>{step}</li>
    });
    let stepsList = <div className="currentsteps"> <ul>{steps}</ul></div>
    return (
      <div className="steps-container">
        <p className="currentsteps-label">
          Steps:
        </p>
        <div className="currentsteps-wrapper">
          {this.props.currentGoalSteps
            ? stepsList
          : null}</div>
      </div>
        )
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps}
}

export default connect(mapStateToProps)(CurrentSteps);
