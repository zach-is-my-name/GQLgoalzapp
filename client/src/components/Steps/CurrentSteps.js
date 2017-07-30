/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'
import plus from '../../style/images/plus_websize.png'

class CurrentSteps extends Component {
  render() {
    let steps = this.props.currentGoalSteps.map((step, index) => {
      return <div className="currentstep-wrapper">
        <li className="current-step" key={index}>{step}</li>
        <img className="plus-image" alt="" src={plus}/>
      </div>
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
