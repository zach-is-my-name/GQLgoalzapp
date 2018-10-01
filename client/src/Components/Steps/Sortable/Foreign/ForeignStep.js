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
      activeStep: false,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      renderRemoveMutation:false,
    }

    this.clickHandlerNo = this.clickHandlerNo.bind(this)
    this.clickHandlerYes = this.clickHandlerYes.bind(this)
    this.clickHandlerSuggestAdd = this.clickHandlerSuggestAdd.bind(this)
}

  render() {
    return (
      <ForeignStepWithButtons
        indexToRemove={this.state.indexToRemove}
        indexClicked={this.state.indexClicked}
        activeStep={this.state.activeStep}
        editStepOn={this.state.editStepOn}
        editedStep={this.state.editedStep}
        renderRemoveMutation={this.state.renderRemoveMutation}
        clickHandlerSuggestAdd={this.clickHandlerSuggestAdd}
        clickHandlerSuggestRemove={this.clickHandlerSuggestRemove}
        toggleOnYesNoPrompt={this.state.toggleOnYesNoPrompt}
        stepObj={this.props.stepObj}
        stepIndex={this.props.stepIndex}
        newIndex={this.props.newIndex}
        clickHandlerEdit={this.props.clickHandlerEdit}
        clickHandlerYes={this.props.clickHandlerYes}
        clickHandlerNo={this.props.clickHandlerNo}
        id={this.props.id}
        activeIndexEditStep={this.state.activeIndexEditStep }
        oldIndex={this.props.oldIndex}
        indexInMotion={this.props.indexInMotion}
        goalDocId={this.props.goalDocId}
        targetUser={this.props.targetUser}
        loggedInUser={this.props.loggedInUser}
      />
    )
  }
  clickHandlerEdit(stepIndex, event) {
    this.setState(prevState => ({
      editStepOn: !prevState.editStepOn
    }))
    this.setState({activeIndexEditStep: stepIndex, stepIndex: this.props.stepIndex})
  }

  clickHandlerYes(event) {
    console.log('yes clicked')
    this.setState(prevState => ({
      renderRemoveMutation: !prevState.renderRemoveMutation
    // toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
  }))
  }

  clickHandlerNo(event) {
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
      activeStep: !prevState.activeStep,
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
