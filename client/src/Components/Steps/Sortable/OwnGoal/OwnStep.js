/* eslint-disable */
//index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../../../style/OwnGoalCurrentSteps.css'
import * as actions from '../../../../Actions/actions.js'
import {SortableElement} from 'react-sortable-hoc';
import update from 'immutability-helper';
import OwnStepWithButtons from './OwnStepWithButtons.js'

class OwnStep extends Component {

  constructor(props) {
    super(props)
    this.state = {
      renderEditStepState: false,
      toggleConfirmPrompt: false,
      indexToRemove: null,
      idToRemove: null,
      indexClicked: null,
      stepActivated: false,
      stepIndex: null,
      activeIndexEditStep: null,
      renderRemoveStepState: false,
      renderRejectStepState: false,
      renderAcceptStepState: false
    }

    this.clickHandlerRemoveStep = this.clickHandlerRemoveStep.bind(this)
    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this)
    this.changestepIndex = this.changestepIndex.bind(this)
    this.clickHandlerEdit = this.clickHandlerEdit.bind(this)
    this.clickHandlerAcceptStep = this.clickHandlerAcceptStep.bind(this)
    this.clickHandlerRejectStep = this.clickHandlerRejectStep.bind(this)
    this.unrenderRemoveStep = this.unrenderRemoveStep.bind(this)
    this.unrenderRejectStep = this.unrenderRejectStep.bind(this)
    this.unrenderAcceptStep = this.unrenderAcceptStep.bind(this)
    this.clickHandlerConfirmReject = this.clickHandlerConfirmReject.bind(this)
    this.unrenderEdit = this.unrenderEdit.bind(this)
  }

  render() {
    const {stepObj, stepIndex, newIndex, oldIndex, indexInMotion} = this.props
    // if (indexInMotion !== null &&  indexInMotion === oldIndex){
    //   this.changestepIndex(newIndex)
    // }
    let style
        if (stepObj.suggestedStep === false) {
          style = {color: '#000000'}
          }
         else if (stepObj.suggestedStep && stepObj.suggestRemove) {
          style = {color: '#ef3779', textDecoration: 'line-through'}
          }
          else if (stepObj.suggestedStep === true) {
          style =  {color: '#ef3779'}
}
    if (stepObj.suggestedStep === true) {
      return (
        <OwnStepWithButtons
          activeStep={this.state.activeStep}
          indexClicked={this.state.indexClicked}
          clickHandlerCancel={this.clickHandlerCancel}
          clickHandlerConfirmReject={this.clickHandlerConfirmReject}
          clickHandlerEdit={this.clickHandlerEdit}
          clickHandlerMinus={this.clickHandlerRejectStep}
          clickHandlerPlus={this.clickHandlerAcceptStep}
          goalDocId={this.props.goalDocId}
          idToRemove={this.state.idToRemove}
          indexToRemove={this.state.indexToRemove}
          loggedInUser={this.props.loggedInUser}
          renderRejectStepState={this.state.renderRejectStepState}
          stepActivated={this.state.stepActivated}
          style={style}
          stepId={this.props.stepObj.id}
          stepIndex={this.props.stepIndex}
          stepObj={this.props.stepObj}
          targetUser={this.props.targetUser}
          toggleConfirmPrompt={this.state.toggleConfirmPrompt}
          toggleSuggestedSteps={this.props.toggleSuggestedSteps}
          unrenderRejectStepFunction={this.unrenderRejectStep}
          renderAcceptStepState={this.state.renderAcceptStepState}
          unrenderAcceptStepFunction={this.unrenderAcceptStep}
        />)
    } else if (stepObj.suggestedStep === false) {
        return (
          <OwnStepWithButtons
            stepIndex={this.props.stepIndex}
            minusEvent={this.clickHandlerRemoveStep}
            toggleConfirmPrompt={this.state.toggleConfirmPrompt}
            indexToRemove={this.state.indexToRemove}
            clickHandlerEdit={this.clickHandlerEdit}
            stepObj={this.props.stepObj}
            clickHandlerPlus={this.clickHandlerAdd}
            clickHandlerMinus={this.clickHandlerRemoveStep}
            clickHandlerCancel={this.clickHandlerCancel}
            renderEditStepState={this.state.renderEditStepState}
            stepActivated={this.state.stepActivated}
            indexClicked={this.state.indexClicked}
            style={style}
            goalDocId={this.props.goalDocId}
            stepId={this.props.stepObj.id}
            toggleSuggestedSteps={this.props.toggleSuggestedSteps}
            clickHandlerConfirmRemove={this.clickHandlerConfirmRemove}
            idToRemove={this.state.idToRemove}
            targetUser={this.props.targetUser}
            loggedInUser={this.props.loggedInUser}
            renderRemoveStepState={this.state.renderRemoveStepState}
            unrenderRemoveStepFunction={this.unrenderRemoveStep}
            unrenderEditFunction={this.unrenderEdit}
          />


      )
    }
  }

  clickHandlerRejectStep(stepIndex, id) {
    console.log('rejectStep clicked')
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexClicked: stepIndex,
      indexToRemove: stepIndex,
      idToRemove: this.props.stepObj.id
    }))
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

  clickHandlerEdit(stepIndex, event) {
    this.setState(prevState => ({
      renderEditStepState: true,
      stepIndex: this.props.stepIndex
    }))
    // this.setState({activeIndexEditStep: stepIndex, stepIndex: this.props.stepIndex})
  }

  unrenderEdit() {
  this.setState(prevState => ({
  renderEditStepState: false
  }))
}

  clickHandlerRemoveStep(stepIndex, id) {
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
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt
    }))
  }

  unrenderRemoveStep() {
    console.log('called unrender')
    this.setState(prevState => {
      return ({
        renderRemoveStepState: !prevState.renderRemoveStepState
      })
    })
  }
  clickHandlerConfirmReject(e) {
    e.preventDefault()
    this.setState(prevState => ({
      renderRejectStepState: !prevState.renderRejectStepState,
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt
    }))
  }
  unrenderRejectStep() {
    console.log('unrender reject step called')
    this.setState(prevState => {
      return ({
        renderRejectStepState: !prevState.renderRejectStepState
      })
    })
  }

  clickHandlerCancel() {
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
      indexToRemove: null
    }))
  }

  changestepIndex(newIndex) {
    this.setState({stepIndex: newIndex})
  }

  clickHandlerAcceptStep(indexClicked) {
    this.setState(prevState => ({
      renderAcceptStepState: !prevState.renderAcceptStepState,
      stepActivated: !prevState.stepActivated,
      indexClicked: indexClicked
    }))
  }

  unrenderAcceptStep() {
    console.log('unrender accept step called')
    this.setState(prevState => ({
      renderAcceptStepState: !prevState.renderAcceptStepState
    }))
  }


  placeholder() {
    console.log('placeholder')
  }
}

/* export default */
export default SortableElement(OwnStep)
