/* eslint-disable */
import React, {Component} from 'react';
import YesNoPrompt from '../../YesNoPrompt.js'
import MinusButton from './MinusButton.js'
import EditButton from './EditButton.js'
import PlusButton from './PlusButton.js'
import '../../../../style/ForeignGoalCurrentSteps.css'

class ForeignStepWithButtons extends Component {
  constructor(props) {
    super(props)
    this.state= {
      toggleConfirmPrompt: false,
      indexToRemove: null,
      indexClicked: null,
      stepActivated: false,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      renderRemoveMutation:false,
      renderSuggestRemoveState: false,
      renderSuggestEditState: false,
    }

    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerSuggestAdd = this.clickHandlerSuggestAdd.bind(this)
    this.clickHandlerSuggestRemove = this.clickHandlerSuggestRemove.bind(this)
    this.clickHandlerSuggestEdit = this.clickHandlerSuggestEdit.bind(this)
    this.clickHandlerConfirmSuggestRemove = this.clickHandlerConfirmSuggestRemove.bind(this)
    this.unrenderSuggestRemoveStep = this.unrenderSuggestRemoveStep.bind(this)
    this.unrenderSuggestEditStep = this.unrenderSuggestEditStep.bind(this)
  }
  render() {
    return (
      <div>
        <MinusButton
          clickHandlerSuggestRemove={this.clickHandlerSuggestRemove}
          toggleConfirmPrompt={this.toggleConfirmPrompt}
          stepIndex={this.props.stepIndex}
          indexToRemove={this.state.indexToRemove}
          clickHandlerConfirmSuggestRemove={this.clickHandlerConfirmSuggestRemove}
          clickHandlerCancel={this.clickHandlerCancel}
          renderSuggestRemoveState={this.state.renderSuggestRemoveState}
          goalDocId={this.props.goalDocId}
          id={this.props.id}
          unrenderSuggestRemoveStepFunction={this.unrenderSuggestRemoveStepFunction}
          stepObj={this.props.stepObj}
        />

        <EditButton
          clickHandlerSuggestEdit={this.clickHandlerSuggestEdit}
          stepIndex={this.state.stepIndex}
          renderSuggestEditState={this.state.renderSuggestEditState}
          stepObj={this.props.stepObj}
          unrenderSuggestEditStepFunction={this.unrenderSuggestEditStepFunction}
          editStepOn={this.state.editStepOn}
          activeIndexEditStep={this.state.activeIndexEditStep}
          id={this.props.id}
        />
        <PlusButton
          clickHandlerSuggestAdd={this.clickHandlerSuggestAdd}
          stepIndex={this.state.stepIndex}
          stepActivated={this.state.stepActivated}
          indexClicked={this.state.indexClicked}
          goalDocId={this.props.goalDocId}
          targetUser={this.props.targetUser}
          loggedInUser={this.props.loggedInUser}
        />
      </div>
    )
  }

  clickHandlerCancel(event) {
    console.log('no clicked')
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
      indexToRemove: null
    }))
  }

  clickHandlerSuggestAdd(stepIndex){
    console.log('called')
    this.setState(prevState => { return  (
    {
      indexClicked: stepIndex,
      stepActivated: !prevState.stepActivated,
      stepIndex: this.props.stepIndex
    }
  )}
)}

  clickHandlerSuggestRemove(stepIndex) {
    console.log('index to remove', stepIndex)
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
    this.setState({indexToRemove: stepIndex, stepIndex: this.props.stepIndex})
  }

  clickHandlerConfirmSuggestRemove() {
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
      renderSuggestRemoveState: true,
    }))
  }

  unrenderSuggestRemoveStep() {
    this.setState(prevState => ({
      renderSuggestRemoveState: !prevState.renderSuggestRemoveState,
    }))
  }

  clickHandlerSuggestEdit(stepIndex, event) {
    this.setState(prevState => ({
      renderSuggestEditState: true,
      stepIndex: this.props.stepIndex
    }))
  }

  unrenderSuggestEditStep() {
    this.setState(prevState => ({
      renderSuggestEditState: false,
    }))
  }
}

export default ForeignStepWithButtons

// = ({
//   toggleOnYesNoPrompt,
//   indexToRemove,
//   value,
//   stepIndex,
//   newIndex,
//   clickHandlerSuggestEdit,
//   clickHandlerSuggestAdd,
//   clickHandlerCancel,
//   renderRemoveMutation,
//   id,
//   editStepOn,
//   activeIndexEditStep,
//   indexClicked,
//   stepActivated,
//   oldIndex,
//   indexInMotion,
//   goalDocId,
//   targetUser,
//   loggedInUser,
//   clickHandlerSuggestRemove,
//   clickHandlerConfirmSuggestRemove,
//   renderSuggestRemoveState,
//   renderSuggestEditState,
//   unrenderSuggestRemoveStepFunction,
//   unrenderSuggestEditStepFunction,
//   stepObj,}) =>{
//     return (
//   )}
//   ForeignStepWithButtons
