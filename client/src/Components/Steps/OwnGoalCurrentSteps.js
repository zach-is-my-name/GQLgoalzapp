/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {OwnSteps} from './Sortable/OwnGoal/OwnSteps.js'
import update from 'immutability-helper';
import MoveStep from './MoveStep.js'
import uniqBy from 'lodash.uniqby'
// import '../../style/OwnGoalCurrentSteps.css'

class OwnGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newIndex: null,
      oldIndex: null,
      indexInMotion: null,
      movedSteps: [],
      renderMoveStep: false,
    }

    this._unrenderMoveStep = this._unrenderMoveStep.bind(this)
}

  componentDidMount() {
    this.setState({movedSteps: [ ...this.props.steps, ...this.state.movedSteps,]})
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.steps) !== JSON.stringify(prevProps.steps)) {
      // console.log('OwnGoalCurrentSteps componentDidUpdate')
      // console.log(Boolean(this.props.steps === prevProps.steps))
      // console.log('prevProps', prevProps.steps)
      // console.log('this.props', this.props.steps)
      this.setState({
       movedSteps: uniqBy([...this.props.steps, ...this.state.movedSteps], 'id')
        // movedSteps: [...new Set(...this.props.steps, ...this.state.movedSteps)]
        // steps: [...this.props.steps, ...this.state.steps,]
      })
    }
  }

  render() {
    // console.log("this.state.steps", this.state.steps)
    // console.log("this.state.renderMoveStep", this.state.renderMoveStep)
    // if (this.props.clonedSteps) {
    //   let arr = this.props.clonedSteps.map(stepObj => ({step: stepObj.step, positionIndex: stepObj.positionIndex}))
    //   console.log(arr)
    // }
    const clonedSteps = <p> Cloned Steps </p>
    const steps = <p> Steps </p>
    return (
      <div className="sortable-container">
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
          <OwnSteps
            onSortEnd={this.onSortEnd}
            randomColorStep={this.props.randomColorStep}
            currentGoalSteps={this.props.steps}
            currentGoalClonedSteps={this.props.clonedSteps}
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
            loggedInUserId={this.props.loggedInUserId}
            getArr={this.getArr}
            selfState={this.props.selfState}
            suggestersIndex={this.props.suggestersIndex}
            selectedSuggesterId={this.props.selectedSuggesterId}
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

 onSortEnd = ({oldIndex, newIndex}) => {
   // console.log("this.state.goalDocs", this.state.goalDocs)
   this.setState(() =>  { return {
     steps: arrayMove(this.state.movedSteps, oldIndex, newIndex),
     newIndex: newIndex,
     oldIndex: oldIndex,
   }
  }, ()  => this.setState({renderMoveStep: true}) )
 }

}

export default OwnGoalCurrentSteps;
