/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class CurrentSteps extends Component {
  render() {
    let steps = this.props.currentGoalSteps.map((step, index) => {
      return <li key={index}>{step}</li>
    });
    let stepsList = <ul>{steps}</ul>
    return (
      <div>{this.props.currentGoalSteps
          ? stepsList
          : null}</div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps}
}

export default connect(mapStateToProps)(CurrentSteps);
