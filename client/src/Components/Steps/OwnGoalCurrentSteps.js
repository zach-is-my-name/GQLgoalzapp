/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {OwnSteps} from './Sortable/OwnGoal/OwnSteps.js'
import update from 'immutability-helper';
import '../../style/OwnGoalCurrentSteps.css'

class OwnGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newIndex: null,
      oldIndex: null,
      indexInMotion: null,
      toggleSuggestedSteps: true,
      items: []
    }
    this._toggleSuggestedSteps = this._toggleSuggestedSteps.bind(this)
    this.getArr = this.getArr.bind(this)
}

 // onSortEnd = ({oldIndex, newIndex}) => {
 //   const arr = []
 //   console.log(arrayMove(arr, oldIndex, newIndex))
 // }


  render() {
      let currentGoalSteps = this.props.steps
      let currentGoalStepsClone =  this.props.clonedSteps
    const clonedSteps = <p> Cloned Steps </p>
    const steps = <p> Steps </p>
    return (
      <div>
        <button onClick={this._toggleSuggestedSteps}>Show/Hide Sugguested Steps
        </button>
        {this.state.toggleSuggestedSteps ? clonedSteps : steps}
        <OwnSteps
          randomColorStep={this.props.randomColorStep}
          currentGoalSteps={currentGoalSteps}
          currentGoalStepsClone={currentGoalStepsClone}
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
    )
  }

  _toggleSuggestedSteps() {
    this.setState(prevState => ({
      toggleSuggestedSteps: !prevState.toggleSuggestedSteps
    }))
  }
  // if (action.type === 'SET_USERID') {
  //   return update(state, {
  //     loggedInUserID: {$set: action.id}
  //   })
  // }

 getArr(array) {
 //   console.log('array', array)
}
  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(array, oldIndex, newIndex)
  })
   }
   // this.setState(prevState => ({
   //   items: [...prevState, array]
   // update(this.state, {
   //   items: {$set: array}
   // })
 // }
}
//   onSortStart({index, collection}) {
//     this.setState({indexInMotion: index})
//   }
// }

// const mapStateToProps = (state, props) => {
//   return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID, currentGoalStepsClone: state.goals.currentGoalStepsClone, }
// }

// export default connect(mapStateToProps)(OwnGoalCurrentSteps);
export default SortableContainer(OwnGoalCurrentSteps);
