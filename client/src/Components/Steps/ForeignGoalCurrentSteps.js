/* eslint-disable */
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
      steps: [],
      renderMoveStep: false,
      movedStepIndex: null,
      toggleOnZappButton: true
    }
    this._unrenderMoveStep = this._unrenderMoveStep.bind(this)
  }


  onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(() => { return {
        steps: arrayMove(this.state.steps, oldIndex, newIndex),
        newIndex: newIndex,
        oldIndex: oldIndex,
        }
      }, () => this.setState({renderMoveStep: true}
    ))
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate called')
    if (this.props.steps !== prevProps.steps){
      this.setState({
        steps: [...this.props.clonedSteps, ...this.state.steps,]
      })
    }
  }

  componentDidMount() {
    this.setState({steps:[...this.props.clonedSteps, ...this.state.steps,]})
  }

  render() {
  return (
    <div>
      {this.state.renderMoveStep ?
        <SuggestMoveStep
          _unrenderMoveStep={this._unrenderMoveStep}
          clonedSteps={this.state.steps}
          newIndex={this.state.newIndex}
        /> : null}

      <div className="steps-container">
        <ForeignSteps
          clonedSteps={this.state.steps}
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
    </div>
      )
      }

 _unrenderMoveStep() {
   this.setState({
     renderMoveStep: false
   })
 }

}
export default(ForeignGoalCurrentSteps);
