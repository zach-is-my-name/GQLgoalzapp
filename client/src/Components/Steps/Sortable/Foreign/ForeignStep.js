import React, {Component} from 'react';
import '../../../../style/ForeignGoalCurrentSteps.css'
import {SortableElement} from 'react-sortable-hoc';
import ForeignStepWithButtons from './ForeignStepWithButtons.js'
class ForeignStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleOnYesNoPrompt: false,
      indexToRemove: null,
      indexClicked: null,
      stepActivated: false,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      renderRemoveMutation:false,
      renderSuggestRemoveState: false,
    }

    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerSuggestAdd = this.clickHandlerSuggestAdd.bind(this)
    this.clickHandlerSuggestRemove = this.clickHandlerSuggestRemove.bind(this)
    this.clickHandlerConfirmSuggestRemove = this.clickHandlerConfirmSuggestRemove.bind(this)
    this.unrenderSuggestRemoveStep = this.unrenderSuggestRemoveStep.bind(this)
}

  render() {
    return (
      <ForeignStepWithButtons
        indexToRemove={this.state.indexToRemove}
        indexClicked={this.state.indexClicked}
        stepActivated={this.state.stepActivated}
        editStepOn={this.state.editStepOn}
        editedStep={this.state.editedStep}
        renderRemoveMutation={this.state.renderRemoveMutation}
        clickHandlerSuggestAdd={this.clickHandlerSuggestAdd}
        clickHandlerSuggestRemove={this.clickHandlerSuggestRemove}
        clickHandlerConfirmSuggestRemove={this.clickHandlerConfirmSuggestRemove}
        toggleOnYesNoPrompt={this.state.toggleOnYesNoPrompt}
        stepObj={this.props.stepObj}
        stepIndex={this.props.stepIndex}
        newIndex={this.props.newIndex}
        clickHandlerEdit={this.props.clickHandlerEdit}
        clickHandlerCancel={this.props.clickHandlerCancel}
        id={this.props.id}
        activeIndexEditStep={this.state.activeIndexEditStep }
        oldIndex={this.props.oldIndex}
        indexInMotion={this.props.indexInMotion}
        goalDocId={this.props.goalDocId}
        targetUser={this.props.targetUser}
        loggedInUser={this.props.loggedInUser}
        renderSuggestRemoveState={this.state.renderSuggestRemoveState}
        unrenderSuggestRemoveStepFunction={this.unrenderSuggestRemoveStep}
      />
    )
  }
  clickHandlerEdit(stepIndex, event) {
    this.setState(prevState => ({
      editStepOn: !prevState.editStepOn
    }))
    this.setState({activeIndexEditStep: stepIndex, stepIndex: this.props.stepIndex})
  }

  // clickHandlerYes(event) {
  //   console.log('yes clicked')
  //   this.setState(prevState => ({
  //     renderRemoveMutation: !prevState.renderRemoveMutation
  //   // toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
  // }))
  // }

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

  // changestepIndex(newIndex) {
  //     this.setState({stepIndex: newIndex})
  //   }


  //USED TO MAINTAIN POSITION ON DRAG BUT
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.stepIndex !== nextProps.newIndex) {
  //     console.log("componentWillReceiveProps called from ForeignGoalCurrentSteps")
  //     this.setState({stepIndex: nextProps.newIndex})
  //     this.props.dispatch(actions.setClonedStepPositionIndex())
  //   }
  // }

}
      export default SortableElement(ForeignStep)
