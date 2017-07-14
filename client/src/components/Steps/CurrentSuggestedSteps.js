/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class CurrentSuggestedSteps extends Component {
  render() {
    let suggestedStep = this.props.currentSuggestedSteps.map((suggestedStep, index) => {
      return <li key={index}>{suggestedStep}</li>
    });
    let suggestedStepsList =<div><h4>Suggested Steps</h4>  <ul>{suggestedStep}</ul></div>
    return (
      <div>
        {this.props.currentSuggestedSteps.length
          ?  suggestedStepsList
        : null}</div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {currentSuggestedSteps: state.goals.currentSuggestedSteps}
}

export default connect(mapStateToProps)(CurrentSuggestedSteps);
