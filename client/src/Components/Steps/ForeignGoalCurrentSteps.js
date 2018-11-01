/* eslint-disable */
// debug w/ Live Expression
// JSON.stringify($r.props.clonedSteps.map(obj => obj.step))
// JSON.stringify($r.state.clonedSteps.map(obj=> obj.step))

import React, {Component} from 'react';
import * as actions from '../../Actions/actions.js'
import { arrayMove} from 'react-sortable-hoc';
import ForeignSteps from './Sortable/Foreign/ForeignSteps.js'
import SuggestMoveStep from './SuggestMoveStep-smart.js'
class ForeignGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newIndex: null,
      oldIndex: null,
      movedClonedSteps: [],
      renderMoveStep: false,
      movedStepIndex: null,
      toggleOnZappButton: true
    }
    this._unrenderMoveStep = this._unrenderMoveStep.bind(this)
  }

    // move step function needs a state entry to manipulate
    // that manipulated state gets passed to the move step component and that submits its computed data
  componentDidUpdate(prevProps) {
    // console.log("prevProps", JSON.stringify(prevProps.clonedSteps.map(obj => obj.step)))
    // console.log('componentDidUpdate, prevProps.clonedSteps', prevProps.clonedSteps, 'this.props.clonedSteps', this.props.clonedSteps)
    if (this.props.clonedSteps !== prevProps.clonedSteps) {
      console.log('this.props', this.props.clonedSteps)
      console.log('prevProps', prevProps.clonedSteps)

      // console.log('this.props', this.props.clonedSteps.map(obj => obj.step))
      // console.log('prevProps', prevProps.clonedSteps.map(obj => obj.step))

      this.setState({
        //merge
        movedClonedSteps : this.props.clonedSteps
        // movedClonedSteps : [ ...this.props.clonedSteps]
        // movedClonedSteps: [...new Set([...this.props.clonedSteps, ...this.state.movedClonedSteps])]
      })
    }
  }

  // set state for Move on initial render
  componentDidMount() {
    // console.log('componentDidMount, this.state.clonedSteps', this.state.clonedSteps, 'this.props.clonedSteps', this.props.clonedSteps)
    this.setState({movedClonedSteps: this.props.clonedSteps})
    // this.setState({movedClonedSteps:[...this.props.clonedSteps, ...this.state.movedClonedSteps,]})
  }

  render() {
      let suggestMoveStep
      if (this.state.renderMoveStep && this.props.loggedInUser) {
       suggestMoveStep =  <SuggestMoveStep
         _unrenderMoveStep={this._unrenderMoveStep}
         clonedSteps={this.state.movedClonedSteps}
         newIndex={this.state.newIndex} />

      } else if (this.state.renderMoveStep && !this.props.loggedInUser ) {
        suggestMoveStep = null
        // create user; save state; resolve create user, render component / submit mutation
      } else {
        suggestMoveStep = null
      }

    return (

      <div className="steps-container">
        {suggestMoveStep}
        <ForeignSteps
          clonedSteps={this.props.clonedSteps}
          onSortEnd={this.onSortEnd}
          helperClass="sortable-helper"
          hideSortableGhost={true}
          pressDelay={100}
          newIndex={this.state.newIndex}
          oldIndex={this.state.oldIndex}
          goalDocId={this.props.goalDocId}
          targetUser={this.props.targetUser}
          loggedInUser={this.props.loggedInUser}
        />
      </div>
      )
      }

      onSortEnd = ({oldIndex, newIndex}) => {
          this.setState(() => { return {
            movedClonedSteps: arrayMove(this.state.movedClonedSteps, oldIndex, newIndex),
            newIndex: newIndex,
            oldIndex: oldIndex,
            }
          }, () => this.setState({renderMoveStep: true}
        ))
      }

 _unrenderMoveStep() {
   this.setState({
     renderMoveStep: false
   })
 }

}
export default(ForeignGoalCurrentSteps);
