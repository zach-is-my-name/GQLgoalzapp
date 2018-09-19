/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {SortableStepsContainer} from '../Container/SortableStepsContainer.js'


class OwnGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newIndex: null,
      oldIndex: null,
      indexInMotion: null,
      toggleSuggestedSteps: true
    }
    this._toggleSuggestedSteps = this._toggleSuggestedSteps.bind(this)
  }

  _toggleSuggestedSteps() {
    this.setState(prevState => ({
      toggleSuggestedSteps: !prevState.toggleSuggestedSteps
    }))
  }

  render() {
    //suggestedStep manipulation goes here
    let currentGoalSteps
    if (this.state.toggleSuggestedSteps === true) {
      currentGoalSteps = this.props.currentGoalStepsClone
    } else {
      currentGoalSteps =  this.props.currentGoalSteps
    }
    const clonedSteps = <p> Cloned Steps </p>
    const steps = <p> Steps </p>
    return (
      <div>
        <button onClick={this._toggleSuggestedSteps}>Show/Hide Sugguested Steps
        </button>
        {this.state.toggleSuggestedSteps ? clonedSteps : steps}
        <SortableStepsContainer
          randomColorStep={this.props.randomColorStep}
          items={currentGoalSteps}
          onSortEnd={this.onSortEnd.bind(this)}
          onSortStart={this.onSortStart.bind(this)}
          helperClass="sortable-helper"
          hideSortableGhost={true}
          pressDelay={100}
          newIndex={this.state.newIndex}
          oldIndex={this.state.oldIndex}
          indexInMotion={this.state.indexInMotion}
          toggleSuggestedSteps={this.state.toggleSuggestedSteps}
          goalDocId={this.props.goalDocId}
        />
      </div>
    )
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({newIndex: newIndex, oldIndex: oldIndex})
    const newOrderedList = arrayMove(this.props.currentGoalSteps, oldIndex, newIndex)
    this.props.dispatch(actions.moveStep(newOrderedList))
  }

  onSortStart({index, collection}) {
    this.setState({indexInMotion: index})
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID}
}

export default connect(mapStateToProps)(OwnGoalCurrentSteps);
