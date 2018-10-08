/* eslint-disable */
//index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../../../style/OwnGoalCurrentSteps.css'
import * as actions from '../../../../Actions/actions.js'
import {SortableElement} from 'react-sortable-hoc';
import update from 'immutability-helper';
import OwnStepWithButtons from './OwnStepWithButtons.js'

class OwnStep  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggleConfirmPrompt: false,
      indexToRemove: null,
      idToRemove: null,
      indexClicked: null,
      stepActivated: false,
      stepIndex: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      acceptStep: false,
      renderRemoveStepState: false,
<<<<<<< Updated upstream
=======
      renderRejectStepState: false,
      renderAcceptStepState: false,

>>>>>>> Stashed changes
    }
    this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this)
    this.changestepIndex = this.changestepIndex.bind(this)
    this.handleChangeEditForm = this.handleChangeEditForm.bind(this);
    this.submitEditedStep = this.submitEditedStep.bind(this)
    this.clickHandlerEdit = this.clickHandlerEdit.bind(this)
    this.acceptStep = this.acceptStep.bind(this)
    this.clickHandlerRejectStep = this.clickHandlerRejectStep.bind(this)
    this.clickHandlerConfirmRemove = this.clickHandlerConfirmRemove.bind(this)
    this.unrenderRemoveStep = this.unrenderRemoveStep.bind(this)
<<<<<<< Updated upstream
=======
    this.unrenderRejectStep = this.unrenderRejectStep.bind(this)
    this.unrenderAcceptStep = this.unrenderAcceptStep.bind(this)
    this.clickHandlerConfirmReject = this.clickHandlerConfirmReject.bind(this)
>>>>>>> Stashed changes
  }




  render() {
    const {stepObj, stepIndex, newIndex, oldIndex, indexInMotion} = this.props
    // if (indexInMotion !== null &&  indexInMotion === oldIndex){
    //   this.changestepIndex(newIndex)
    // }
    let suggestedStep
    if (stepObj.suggestedStep === true) {
      return (
        <OwnStepWithButtons
<<<<<<< Updated upstream
          stepIndex={this.props.stepIndex}
          minusEvent={this.rejectStep}
          stepColor={({color: '#ef3779'})}
          clickHandlerEdit={this.clickHandlerEdit}
          stepObj={this.props.stepObj}
          clickHandlerPlus={this.acceptStep}
          clickHandlerMinus={this.placeholder}
          clickHandlerCancel={this.clickHandlerCancel}
          editedStep={this.state.editedStep}
          submitEditedStep={this.placeholder}
          activeStep={this.state.activeStep}
          indexClicked={this.state.indexClicked}
          goalDocId={this.props.goalDocId}
=======
          acceptStep={this.state.acceptStep}
          clickHandlerCancel={this.clickHandlerCancel}
          clickHandlerConfirmReject={this.clickHandlerConfirmReject}
          clickHandlerEdit={this.clickHandlerEdit}
          clickHandlerMinus={this.clickHandlerRejectStep}
          clickHandlerPlus={this.clickHandlerAcceptStep}
          editedStep={this.state.editedStep}
          goalDocId={this.props.goalDocId}
          idToRemove={this.state.idToRemove}
          indexClicked={this.state.indexClicked}
          indexToRemove={this.state.indexToRemove}
          loggedInUser={this.props.loggedInUser}
          renderRejectStepState={this.state.renderRejectStepState}
          stepActivated={this.state.stepActivated}
          stepColor={({color: '#ef3779'})}
>>>>>>> Stashed changes
          stepId={this.props.stepObj.id}
          stepIndex={this.props.stepIndex}
          stepObj={this.props.stepObj}
          submitEditedStep={this.placeholder}
          targetUser={this.props.targetUser}
<<<<<<< Updated upstream
          loggedInUser={this.props.loggedInUser}
=======
          toggleConfirmPrompt={this.state.toggleConfirmPrompt}
          toggleSuggestedSteps={this.props.toggleSuggestedSteps}
          unrenderRejectStepFunction={this.unrenderRejectStep}
          renderAcceptStepState={this.state.renderAcceptStepState}
          unrenderAcceptStepFunction={this.unrenderAcceptStep}
>>>>>>> Stashed changes
        />

      )
    } else if (stepObj.suggestedStep === false) {
    let  noStepColor = {
        color: '#000000'
      }
      return (
      <OwnStepWithButtons
        stepIndex={this.props.stepIndex}
        minusEvent={this.clickHandlerRemove}
        toggleConfirmPrompt={this.state.toggleConfirmPrompt}
        indexToRemove={this.state.indexToRemove}
        clickHandlerEdit={this.clickHandlerEdit}
        stepObj={this.props.stepObj}
        clickHandlerPlus={this.clickHandlerAdd}
        clickHandlerMinus={this.clickHandlerRemove}
        clickHandlerCancel={this.clickHandlerCancel}
        editedStep={this.state.editedStep}
        submitEditedStep={this.submitEditedStep}
        stepActivated={this.state.stepActivated}
        indexClicked={this.state.indexClicked}
        stepColor={noStepColor}
        goalDocId={this.props.goalDocId}
        stepId={this.props.stepObj.id}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        clickHandlerRemove={this.clickHandlerRemove}
        clickHandlerConfirmRemove={this.clickHandlerConfirmRemove}
        idToRemove={this.state.idToRemove}
        targetUser={this.props.targetUser}
        loggedInUser={this.props.loggedInUser}
        renderRemoveStepState={this.state.renderRemoveStepState}
        unrenderRemoveStepFunction={this.unrenderRemoveStep}
      />
    )
    }
  }

  clickHandlerRejectStep() {

  }

  clickHandlerEdit(stepIndex, event) {
    this.setState(prevState => ({
      editStepOn: !prevState.editStepOn,
      activeIndexEditStep: stepIndex,
      stepIndex: this.props.stepIndex
    }))
    // this.setState({activeIndexEditStep: stepIndex, stepIndex: this.props.stepIndex})
  }

  handleChangeEditForm(event) {
    this.setState({editedStep: event.target.stepObj})
  }

  submitEditedStep(event, stepIndex, editedStep) {
    event.preventDefault()
    this.props.dispatch(actions.editStep(stepIndex, editedStep))
    this.setState({editedStep: ""})
  }

  clickHandlerAdd(stepIndex) {
    // console.log(stepIndex)
    // this.setState({})
    this.setState(prevState => ({
      indexClicked: stepIndex,
      stepActivated: !prevState.stepActivated,
      stepIndex: this.props.stepIndex
    }))
  }

  clickHandlerRemove(stepIndex, id) {
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: stepIndex,
      indexClicked: stepIndex,
      idToRemove: this.props.stepObj.id
    }))
  }

  clickHandlerConfirmRemove(e) {
    e.preventDefault()
    // this.unrenderRemoveStep()
    this.setState(prevState => ({
      renderRemoveStepState: !prevState.renderRemoveStepState,
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
    }))
  }

  unrenderRemoveStep() {
  console.log('called unrender')
  this.setState(prevState => { return (
    {
      renderRemoveStepState: !prevState.renderRemoveStepState,
  }
  )}
)}

  clickHandlerCancel() {
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: null
    }))
  }

  changestepIndex(newIndex) {
    this.setState({stepIndex: newIndex})
  }

<<<<<<< Updated upstream
=======
  clickHandlerAcceptStep(indexClicked) {
    this.setState(prevState => ({
      renderAcceptStepState: !prevState.renderAcceptStepState,
      stepActivated: !prevState.stepActivated,
      indexClicked: indexClicked,
    })
  )}

  unrenderAcceptStep() {
    console.log('unrender accept step called')
    this.setState(prevState => ({renderAcceptStepState: !prevState.renderAcceptStepState})
)}
>>>>>>> Stashed changes

  acceptStep(stepIndex) {
    this.setState(prevState => ({
      acceptStep: !prevState.acceptStep,
      indexClicked: stepIndex,
      stepActivated: !prevState.stepActivated,
      stepIndex: this.props.stepIndex
    }))
  }

  placeholder() {
    console.log('placeholder')
  }
}

/* export default */  export default SortableElement(OwnStep)
