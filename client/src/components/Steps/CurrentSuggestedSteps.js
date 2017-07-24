/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/CurrentSuggestedSteps.css'

class CurrentSuggestedSteps extends Component {
  render() {
    let suggestedStep = this.props.currentSuggestedSteps.map((suggestedStep, index) => {
      return <li key={index}>{suggestedStep}</li>
    });
    let suggestedStepsList =<div><p className="suggestedsteps-label"> Suggested Steps: </p><div className="suggestedstep-wrapper">  <ul className="suggestedsteps">{suggestedStep}</ul></div></div>;
      return (
      <div className="suggestedsteps-container">
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
