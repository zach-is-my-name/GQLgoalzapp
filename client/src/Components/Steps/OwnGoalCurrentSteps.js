/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {OwnSteps} from './Sortable/OwnGoal/OwnSteps.js'
import update from 'immutability-helper';
import MoveStep from './MoveStep.js'
// import '../../style/OwnGoalCurrentSteps.css'

class OwnGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newIndex: null,
      oldIndex: null,
      indexInMotion: null,
      toggleSuggestedSteps: true,
      steps: [],
      renderMoveStep: false,
    }
    this._toggleSuggestedSteps = this._toggleSuggestedSteps.bind(this)
    this._unrenderMoveStep = this._unrenderMoveStep.bind(this)
}

 onSortEnd = ({oldIndex, newIndex}) => {
   // console.log("this.state.goalDocs", this.state.goalDocs)
   this.setState(() =>  { return {
     steps: arrayMove(this.state.steps, oldIndex, newIndex),
     newIndex: newIndex,
     oldIndex: oldIndex,
   }
 }, ()  => this.setState({renderMoveStep: true}) )


 }

componentDidMount() {
  // console.log("componentDidMount called")
  this.setState({steps: [ ...this.props.steps, ...this.state.steps,]})
}

  render() {
    // console.log("this.state.steps", this.state.steps)
    // console.log("this.state.renderMoveStep", this.state.renderMoveStep)
    const clonedSteps = <p> Cloned Steps </p>
    const steps = <p> Steps </p>
    return (
      <div>
        <div>
          {this.state.renderMoveStep ?
            <MoveStep
              _unrenderMoveStep={this._unrenderMoveStep}
              steps={this.state.steps}
              newIndex={this.state.newIndex}
              oldIndex={this.state.oldIndex}
              clonedSteps={this.props.clonedSteps}
            /> : null}
        </div>
        <div>
          <button onClick={this._toggleSuggestedSteps}>Show/Hide Sugguested Steps
          </button>
          {this.state.toggleSuggestedSteps ? clonedSteps : steps}
          <OwnSteps
            onSortEnd={this.onSortEnd}
            randomColorStep={this.props.randomColorStep}
            currentGoalSteps={this.state.steps}
            currentGoalStepsClone={this.props.clonedSteps}
            onSortEnd={this.onSortEnd}
            helperClass="sortable-helper"
            hideSortableGhost={true}
            pressDelay={100}
            newIndex={this.state.newIndex}
            oldIndex={this.state.oldIndex}
            indexInMotion={this.state.indexInMotion}
            toggleSuggestedSteps={this.state.toggleSuggestedSteps}
            goalDocId={this.props.goalDocId}
            targetUser={this.props.targetUser}
            loggedInUser={this.props.loggedInUser}
            getArr={this.getArr}
          />
        </div>
      </div>
        )
  }
 _unrenderMoveStep() {
   this.setState({
     renderMoveStep: false
   })
 }
  _toggleSuggestedSteps() {
    this.setState(prevState => ({
      toggleSuggestedSteps: !prevState.toggleSuggestedSteps
    }))
  }

}

export default OwnGoalCurrentSteps;
