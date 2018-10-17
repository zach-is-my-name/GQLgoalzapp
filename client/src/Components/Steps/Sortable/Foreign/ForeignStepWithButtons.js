/* eslint-disable */
import React, {Component} from 'react';
import YesNoPrompt from '../../YesNoPrompt.js'
import MinusButton from './Buttons/MinusButton.js'
import EditButton from './Buttons/EditButton.js'
import PlusButton from './Buttons/PlusButton.js'
import '../../../../style/ForeignGoalCurrentSteps.css'

class ForeignStepWithButtons extends Component {
  constructor(props) {
    super(props)
    this.state={
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
      renderRemoveSuggestedStepState: false,
    }

    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerSuggestAdd = this.clickHandlerSuggestAdd.bind(this)
    this.clickHandlerSuggestRemove = this.clickHandlerSuggestRemove.bind(this)
    this.clickHandlerSuggestEdit = this.clickHandlerSuggestEdit.bind(this)
    this.clickHandlerConfirmSuggestRemove = this.clickHandlerConfirmSuggestRemove.bind(this)
    this.unrenderSuggestRemoveStep = this.unrenderSuggestRemoveStep.bind(this)
    this.unrenderRemoveSuggesteStep = this.unrenderRemoveSuggesteStep.bind(this)
    this.unrenderSuggestEditStep = this.unrenderSuggestEditStep.bind(this)
    this.clickHandlerConfirmRemoveSuggestedStep = this.clickHandlerConfirmRemoveSuggestedStep.bind(this)}
  render() {
    return (
      <div>
        <MinusButton
          clickHandlerSuggestRemove={this.clickHandlerSuggestRemove}
          clickHandlerRemoveSuggested={this.clickHandlerRemoveSuggested}
          toggleConfirmPrompt={this.state.toggleConfirmPrompt}
          stepIndex={this.props.stepIndex}
          indexToRemove={this.state.indexToRemove}
          clickHandlerConfirmSuggestRemove={this.clickHandlerConfirmSuggestRemove}
          clickHandlerConfirmRemoveSuggestedStep={this.clickHandlerConfirmRemoveSuggestedStep}
          clickHandlerCancel={this.clickHandlerCancel}
          renderSuggestRemoveState={this.state.renderSuggestRemoveState}
          goalDocId={this.props.goalDocId}
          id={this.props.id}
          unrenderSuggestRemoveStepFunction={this.unrenderSuggestRemoveStepFunction}
          unrenderRemoveSuggestedStepFunction={this.unrenderRemoveSuggesteStep}
          renderRemoveSuggestedStepState={this.state.renderRemoveSuggestedStepState}
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
          stepIndex={this.props.stepIndex}
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
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: null
    }))
  }

  clickHandlerSuggestAdd(stepIndex){
    this.setState(prevState => ({
      indexClicked: stepIndex,
      stepActivated: !prevState.stepActivated,
      stepIndex: this.props.stepIndex
    }))
}

  clickHandlerSuggestRemove(indexToRemove) {
    console.log('index to remove', indexToRemove)
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: indexToRemove,
      // stepIndex: this.props.stepIndex
    }))
  }

  clickHandlerConfirmSuggestRemove() {
    console.log("clickHandler confirm ")
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      renderSuggestRemoveState: true,
    }))
  }

  unrenderSuggestRemoveStep() {
    this.setState(prevState => ({
      renderSuggestRemoveState: false,
    }))}

  clickHandlerRemoveSuggested() {
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: indexToRemove,
      // stepIndex: this.props.stepIndex
    }))
  }

  clickHandlerConfirmRemoveSuggestedStep() {
    console.log("clickHandler confirm ")
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      renderRemoveSuggestedStepState: true,
    }))
  }

  unrenderRemoveSuggesteStep() {
    this.setState(prevState => ({
      renderRemoveSuggestedStepState: false,
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
