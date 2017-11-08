/* eslint-disable */
//index is passed down as eventIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/OwnGoalCurrentSteps.css'
import * as actions from '../../Actions/actions.js'
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
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
      eventIndex: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      acceptStep: false,
    }
    // this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
    this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
    this.clickHandlerCancel = this.clickHandlerCancel.bind(this)
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this)
    this.changeEventIndex = this.changeEventIndex.bind(this)
    this.handleChangeEditForm = this.handleChangeEditForm.bind(this);
    this.submitEditedStep = this.submitEditedStep.bind(this)
    this.clickHandlerEdit = this.clickHandlerEdit.bind(this)
    this.acceptStep = this.acceptStep.bind(this)
  }

  clickHandlerEdit(eventIndex, event) {
    this.setState(prevState => ({
      editStepOn: !prevState.editStepOn,
      activeIndexEditStep: eventIndex,
      eventIndex: this.props.eventIndex
    }))
    // this.setState({activeIndexEditStep: eventIndex, eventIndex: this.props.eventIndex})
  }

  handleChangeEditForm(event) {
    this.setState({editedStep: event.target.value})
  }

  submitEditedStep(event, eventIndex, editedStep) {
    event.preventDefault()
    console.log(eventIndex)
    console.log(editedStep)
    this.props.dispatch(actions.editStep(eventIndex, editedStep))
    this.setState({editedStep: ""})
  }

  clickHandlerRemove(eventIndex) {
    console.log('clickHandlerRemove triggered')
    console.log('index to remove', eventIndex)
    this.setState(prevState => ({
      toggleConfirmPrompt: !prevState.toggleConfirmPrompt
    }))
    this.setState({indexToRemove: eventIndex, eventIndex: this.props.eventIndex})
  }

  clickHandlerAdd(eventIndex) {
    console.log(eventIndex)
    // this.setState({})
    this.setState(prevState => ({
      indexClicked: eventIndex,
      activeStep: !prevState.activeStep,
      eventIndex: this.props.eventIndex
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

  changeEventIndex(newIndex) {
    this.setState({eventIndex: newIndex})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({eventIndex: nextProps.newIndex})
    }
  }

  acceptStep(eventIndex) {
    this.setState(prevState => ({
      acceptStep: !prevState.acceptStep,
      indexClicked: eventIndex,
      activeStep: !prevState.activeStep,
      eventIndex: this.props.eventIndex
    }))
  }

  placeholder() {
    console.log('placeholder')
  }

  render() {
    const {value, eventIndex, newIndex, oldIndex, indexInMotion} = this.props

    // if (indexInMotion !== null &&  indexInMotion === oldIndex){
    //   this.changeEventIndex(newIndex)
    // }
    let suggestedStep

    if (value.suggestedStep) {
      return (
        <StepWithButtons
          eventIndex={this.props.eventIndex}
          minusEvent={this.rejectStep}
          minusImg={minus}
          stepColor={this.props.randomColorStep}
          clickHandlerEdit={this.clickHandlerEdit}
          value={this.props.value}
          clickHandlerPlus={this.acceptStep}
          plusImg={plus}
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
        />

      )
    } else if (!value.suggestedStep) {
    let  noStepColor = {
        color: '#000000'
      }
      return (
      <StepWithButtons
        eventIndex={this.props.eventIndex}
        minusEvent={this.clickHandlerRemove}
        toggleConfirmPrompt={this.state.toggleConfirmPrompt}
        indexToRemove={this.state.indexToRemove}
        minusImg={minus}
        stepColor={noStepColor}
        clickHandlerEdit={this.clickHandlerEdit}
        value={this.props.value}
        clickHandlerPlus={this.clickHandlerAdd}
        plusImg={plus}
        clickHandlerMinus={this.clickHandlerRemove}
        clickHandlerCancel={this.clickHandlerCancel}
        editedStep={this.state.editedStep}
        submitEditedStep={this.submitEditedStep}
        activeStep={this.state.activeStep}
        indexClicked={this.state.indexClicked}
        stepColor={noStepColor}
        goalDocId={this.props.goalDocId}
        stepId={this.props.value.id}
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
      {items.map((value, index) => (<OwnSortableStepWithButtons randomColorStep={props.randomColorStep} key={`item-${index}`} index={index} eventIndex={index} value={value} newIndex={newIndex} oldIndex={oldIndex} indexInMotion={indexInMotion}
        goalDocId={props.goalDocId}
                                    />))}
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
        <SortableList randomColorStep={this.props.randomColorStep} items={currentGoalSteps} onSortEnd={this.onSortEnd.bind(this)} onSortStart={this.onSortStart.bind(this)} helperClass="sortable-helper" hideSortableGhost={true} pressDelay={100} newIndex={this.state.newIndex} oldIndex={this.state.oldIndex} indexInMotion={this.state.indexInMotion}
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
