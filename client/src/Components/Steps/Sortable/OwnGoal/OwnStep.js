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
      activeStep: false,
      stepIndex: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      acceptStep: false,
      renderRemoveStep: false,
      nextPropsCurrentGoalSteps: []
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
  }



  componentWillReceiveProps(nextProps) {
    // if (nextProps.currentGoalStepsClone === undefined && this.props.currentGoalSteps > )
    this.props.currentGoalSteps && (nextProps.currentGoalSteps < this.props.currentGoalSteps) &&
    update(this.state, {
      nextPropsCurrentGoalSteps: {$set: nextProps.currentGoalSteps}
    })
    this.setState(prevState => ({
      renderRemoveStep: !prevState.renderRemoveStep,
    }))
    // console.log("currentGoalSteps", this.props.currentGoalSteps)
    // if (this.props.currentGoalSteps.length < nextProps.currentGoalSteps.length) {
    //   console.log('less goal steps')
    // }
    // if (this.props.stepIndex !== nextProps.stepIndex) {
    //   this.setState({stepIndex: nextProps.newIndex})
    // }
  }

  render() {
    const {stepObj, stepIndex, newIndex, oldIndex, indexInMotion} = this.props

    // if (indexInMotion !== null &&  indexInMotion === oldIndex){
    //   this.changestepIndex(newIndex)
    // }
    let suggestedStep

    if (stepObj.suggestedStep) {
      return (
        <OwnStepWithButtons
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
          stepId={this.props.stepObj.id}
          acceptStep={this.state.acceptStep}
          toggleSuggestedSteps={this.props.toggleSuggestedSteps}
          targetUser={this.props.targetUser}
          loggedInUser={this.props.loggedInUser}
        />

      )
    } else if (!stepObj.suggestedStep) {
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
        activeStep={this.state.activeStep}
        indexClicked={this.state.indexClicked}
        stepColor={noStepColor}
        goalDocId={this.props.goalDocId}
        stepId={this.props.stepObj.id}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        clickHandlerRemove={this.clickHandlerRemove}
        clickHandlerConfirmRemove={this.clickHandlerConfirmRemove}
        renderRemoveStep={this.state.renderRemoveStep}
        unrenderRemoveStep={this.props.unrenderRemoveStep}
        idToRemove={this.state.idToRemove}
        targetUser={this.props.targetUser}
        loggedInUser={this.props.loggedInUser}
        // nextPropsCurrentGoalSteps={nextPropsCurrentGoalSteps}
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
    console.log(stepIndex)
    console.log(editedStep)
    this.props.dispatch(actions.editStep(stepIndex, editedStep))
    this.setState({editedStep: ""})
  }

  clickHandlerRemove(stepIndex, id) {
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: stepIndex
    }))
    this.props.dispatch(actions.setIdToRemove(this.props.stepObj.id))
  }

  clickHandlerAdd(stepIndex) {
    // console.log(stepIndex)
    // this.setState({})
    this.setState(prevState => ({
      indexClicked: stepIndex,
      activeStep: !prevState.activeStep,
      stepIndex: this.props.stepIndex
    }))
  }

  clickHandlerConfirmRemove(e) {
    e.preventDefault()
    actions.unsetStepAndPositionIndex(this.state.indexToRemove)
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      // renderRemoveStep: !prevState.renderRemoveStep,
    }))
  }

  unrenderRemoveStep() {
  this.setState(prevState => (
    {renderRemoveStep: !prevState.renderRemoveStep}
  ))
  }

  clickHandlerCancel() {
    console.log('no clicked')
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: null
    }))
  }

  changestepIndex(newIndex) {
    this.setState({stepIndex: newIndex})
  }


  acceptStep(stepIndex) {
    this.setState(prevState => ({
      acceptStep: !prevState.acceptStep,
      indexClicked: stepIndex,
      activeStep: !prevState.activeStep,
      stepIndex: this.props.stepIndex
    }))
  }

  placeholder() {
    console.log('placeholder')
  }
}

/* export default */  export default SortableElement(OwnStep)
