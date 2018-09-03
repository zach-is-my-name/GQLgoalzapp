/* eslint-disable */
//index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/OwnGoalCurrentSteps.css'
import * as actions from '../../Actions/actions.js'
import YesNoPrompt from './YesNoPrompt.js'
import ForeignGoalCurrentSteps from './ForeignGoalCurrentSteps.js'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import StepWithButtons from './StepWithButtons.js'
import InputStep from './AddStep.js'
import EditStep from './EditStep.js'

class StepWithButtonsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggleConfirmPrompt: false,
      indexToRemove: null,
      indexClicked: null,
      activeStep: false,
      stepIndex: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      acceptStep: false,
    }
    // this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
    this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this)
    this.changestepIndex = this.changestepIndex.bind(this)
    this.handleChangeEditForm = this.handleChangeEditForm.bind(this);
    this.submitEditedStep = this.submitEditedStep.bind(this)
    this.clickHandlerEdit = this.clickHandlerEdit.bind(this)
    this.acceptStep = this.acceptStep.bind(this)
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
    this.setState({editedStep: event.target.value})
  }

  submitEditedStep(event, stepIndex, editedStep) {
    event.preventDefault()
    console.log(stepIndex)
    console.log(editedStep)
    this.props.dispatch(actions.editStep(stepIndex, editedStep))
    this.setState({editedStep: ""})
  }

  clickHandlerRemove(stepIndex) {
    console.log('clickHandlerRemove triggered')
    console.log('index to remove', stepIndex)
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt
    }))
    this.setState({indexToRemove: stepIndex, stepIndex: this.props.stepIndex})
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

  clickHandlerConfirmRemove() {
    console.log('yes clicked')
    this.props.dispatch(actions.removeStep(this.state.indexToRemove))
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt
    }))
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

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({stepIndex: nextProps.newIndex})
    }
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

  render() {
    const {value, stepIndex, newIndex, oldIndex, indexInMotion} = this.props

    // if (indexInMotion !== null &&  indexInMotion === oldIndex){
    //   this.changestepIndex(newIndex)
    // }
    let suggestedStep

    if (value.suggestedStep) {
      return (
        <StepWithButtons
          stepIndex={this.props.stepIndex}
          minusEvent={this.rejectStep}
          stepColor={this.props.randomColorStep}
          clickHandlerEdit={this.clickHandlerEdit}
          value={this.props.value}
          clickHandlerPlus={this.acceptStep}
          clickHandlerMinus={this.clickHandlerRejectStep}
          clickHandlerCancel={this.clickHandlerCancel}
          editedStep={this.state.editedStep}
          submitEditedStep={this.placeholder}
          activeStep={this.state.activeStep}
          indexClicked={this.state.indexClicked}
          stepColor={this.props.randomColorStep}
          goalDocId={this.props.goalDocId}
          stepId={this.props.value.id}
          acceptStep={this.state.acceptStep}
          toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        />

      )
    } else if (!value.suggestedStep) {
    let  noStepColor = {
        color: '#000000'
      }
      return (
      <StepWithButtons
        stepIndex={this.props.stepIndex}
        minusEvent={this.clickHandlerRemove}
        toggleConfirmPrompt={this.state.toggleConfirmPrompt}
        indexToRemove={this.state.indexToRemove}
        stepColor={noStepColor}
        clickHandlerEdit={this.clickHandlerEdit}
        value={this.props.value}
        clickHandlerPlus={this.clickHandlerAdd}
        clickHandlerMinus={this.clickHandlerRemove}
        clickHandlerCancel={this.clickHandlerCancel}
        editedStep={this.state.editedStep}
        submitEditedStep={this.submitEditedStep}
        activeStep={this.state.activeStep}
        indexClicked={this.state.indexClicked}
        stepColor={noStepColor}
        goalDocId={this.props.goalDocId}
        stepId={this.props.value.id}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
      />
    )
    }
  }
}

const OwnSortableStepWithButtons = connect()(SortableElement(StepWithButtonsContainer))

const SortableList = SortableContainer((props) => {
  const {newIndex} = props
  const {oldIndex} = props
  const {items} = props
  const {indexInMotion} = props

  return (
    <ul className="sortable-container">
      {items.map((value, index) =>
        <OwnSortableStepWithButtons
          randomColorStep={props.randomColorStep}
          key={`item-${index}`}
          index={index}
          stepIndex={index}
          value={value}
          newIndex={newIndex}
          oldIndex={oldIndex}
          indexInMotion={indexInMotion}
          goalDocId={props.goalDocId}
          toggleSuggestedSteps={props.toggleSuggestedSteps}
        />)}
    </ul>
  );
});

class OwnGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newIndex: null,
      oldIndex: null,
      indexInMotion: null,
      toggleSuggestedSteps: true
    }
    this._toggleSuggestedSteps = this._toggleSuggestedSteps.bind(this)
  }

  _toggleSuggestedSteps() {
    this.setState(prevState => ({
      toggleSuggestedSteps: !prevState.toggleSuggestedSteps
    }))
  }

  render() {
    //suggestedStep manipulation goes here
    let currentGoalSteps
    if (this.state.toggleSuggestedSteps === true) {
      currentGoalSteps = this.props.currentGoalStepsClone
    } else {
      currentGoalSteps =  this.props.currentGoalSteps
    }

    const clonedSteps = <p> Cloned Steps </p>
    const steps = <p> Steps </p>
    return (
      <div>
        <button onClick={this._toggleSuggestedSteps}>Show/Hide Sugguested Steps
        </button>
        {this.state.toggleSuggestedSteps ? clonedSteps : steps}
        <SortableList
          randomColorStep={this.props.randomColorStep}
          items={currentGoalSteps} onSortEnd={this.onSortEnd.bind(this)}
          onSortStart={this.onSortStart.bind(this)}
          helperClass="sortable-helper"
          hideSortableGhost={true}
          pressDelay={100}
          newIndex={this.state.newIndex}
          oldIndex={this.state.oldIndex}
          indexInMotion={this.state.indexInMotion}
          toggleSuggestedSteps={this.state.toggleSuggestedSteps}
          goalDocId={this.props.goalDocId}
          />
        </div>
    )
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({newIndex: newIndex, oldIndex: oldIndex})
    const newOrderedList = arrayMove(this.props.currentGoalSteps, oldIndex, newIndex)
    this.props.dispatch(actions.moveStep(newOrderedList))
  }

  onSortStart({index, collection}) {
    this.setState({indexInMotion: index})
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID}
}

export default connect(mapStateToProps)(OwnGoalCurrentSteps);
