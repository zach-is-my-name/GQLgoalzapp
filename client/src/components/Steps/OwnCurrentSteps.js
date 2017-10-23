/* eslint-disable */
//index is passed down as eventIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/OwnCurrentSteps.css'
import * as actions from '../../Actions/actions.js'
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import YesNoPrompt from './YesNoPrompt.js'
import ForeignCurrentSteps from './ForeignCurrentSteps.js'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import InputStep from './InputSteps.js'
import EditStep from './EditStep.js'

class OwnSortabelStepWithButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleOnYesNoPrompt: false,
      indexToRemove: null,
      activeIndexAddStep: null,
      toggleActiveStep: false,
      eventIndex: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: ''
    }
    // this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
    this.clickHandlerYes = this.clickHandlerYes.bind(this)
    this.clickHandlerNo = this.clickHandlerNo.bind(this)
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this)
    this.changeEventIndex = this.changeEventIndex.bind(this)
    this.handleChangeEditForm = this.handleChangeEditForm.bind(this);
    this.submitEditedStep = this.submitEditedStep.bind(this)
    this.clickHandlerEdit = this.clickHandlerEdit.bind(this)
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
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
    this.setState({indexToRemove: eventIndex, eventIndex: this.props.eventIndex})
  }

  clickHandlerAdd(eventIndex) {
    console.log(eventIndex)
    // this.setState({})
    this.setState(prevState => ({
      activeIndexAddStep: eventIndex,
      toggleActiveStep: !prevState.toggleActiveStep,
      eventIndex: this.props.eventIndex
    }))
  }

  clickHandlerYes() {
    console.log('yes clicked')
    this.props.dispatch(actions.removeStep(this.state.indexToRemove))
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
  }

  clickHandlerNo() {
    console.log('no clicked')
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
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

  render() {
    const {value, eventIndex, newIndex, oldIndex, indexInMotion} = this.props

    // if (indexInMotion !== null &&  indexInMotion === oldIndex){
    //   this.changeEventIndex(newIndex)
    // }
    let randomColorStep
    if (value.suggestedStep) {
      randomColorStep = this.props.randomColorStep
    } else {
      randomColorStep = {
        color: '#000000'
      }
    }

    return (
      <div className="sortable-item-wrapper">
        <div className="row-1">
          <li className="minus-image"><img key={`imagekey-minus${eventIndex}`} onClick={() => this.clickHandlerRemove(eventIndex)} alt="" src={minus}/></li>

          <span style={randomColorStep}>
            <li onClick={(event) => this.clickHandlerEdit(eventIndex, event)} key={eventIndex}>{value.step}</li>
          </span>

          <li className="plus-image"><img key={`imageKey-plus${eventIndex}`} onClick={() => this.clickHandlerAdd(eventIndex)} alt="" src={plus}/></li>
        </div>
        <div className="row-2">

          {(this.state.toggleOnYesNoPrompt && (this.state.eventIndex !== null) && (this.state.indexToRemove === this.state.eventIndex))
            ? <div className="prompt">
                <p>Remove Step?</p>
                <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEv entNo={this.clickHandlerNo}/></div>
            : null}

          {(this.state.editStepOn && (this.state.eventIndex !== null) && this.state.activeIndexEditStep === this.state.eventIndex)
            ? <EditStep handleChange={this.handleChangeEditForm} editedStep={this.state.editedStep} submitEditedStep={this.submitEditedStep} step={value} index={eventIndex}/>
            : null}

          {(this.state.toggleActiveStep && (this.state.eventIndex !== null) && (this.state.activeIndexAddStep === this.state.eventIndex))
            ? <InputStep index={eventIndex}/>
            : null}

        </div>
      </div>
    )
  }
}
const SortableStepWithButtons = connect()(SortableElement(OwnSortabelStepWithButtons))

const SortableList = SortableContainer((props) => {
  const {newIndex} = props
  const {oldIndex} = props
  const {items} = props
  const {indexInMotion} = props

  return (
    <ul className="sortable-container">
      {items.map((value, index) => (<SortableStepWithButtons randomColorStep={props.randomColorStep} key={`item-${index}`} index={index} eventIndex={index} value={value} newIndex={newIndex} oldIndex={oldIndex} indexInMotion={indexInMotion}/>))}
    </ul>
  );
});

class OwnCurrentSteps extends Component {
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
      //monkey fix
      currentGoalSteps =  this.props.currentGoalSteps.map((step) => ({step}))
    }
    return (
      <div>
        <button onClick={this._toggleSuggestedSteps}>Show/Hide Sugguested Steps
        </button>
        <SortableList randomColorStep={this.props.randomColorStep} items={currentGoalSteps} onSortEnd={this.onSortEnd.bind(this)} onSortStart={this.onSortStart.bind(this)} helperClass="sortable-helper" hideSortableGhost={true} pressDelay={100} newIndex={this.state.newIndex} oldIndex={this.state.oldIndex} indexInMotion={this.state.indexInMotion}/>
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

export default connect(mapStateToProps)(OwnCurrentSteps);
