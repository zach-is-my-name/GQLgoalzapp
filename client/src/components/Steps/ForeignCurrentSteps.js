import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


import '../../style/ForeignCurrentSteps.css'

import SuggestStep from './SuggestStep.js'
import SuggestEditStep from './SuggestEditStep.js'
import YesNoPrompt from './YesNoPrompt.js'


class ForeignSortableStepWithButtons extends Component {
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
      editedStep: '',
    }
}
clickHandlerEdit(eventIndex, event) {
  this.setState(prevState => ({
    editStepOn: !prevState.editStepOn
  }))
  this.setState({activeIndexEditStep: eventIndex, eventIndex: this.props.eventIndex})
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

  clickHandlerYes(event) {
    console.log('yes clicked')
    this.props.dispatch(actions.suggestRemoveStep(this.state.indexToRemove))
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
  }

  clickHandlerNo(event) {
    console.log('no clicked')
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
      indexToRemove: null
    }))
  }

  clickHandlerSuggestAdd(eventIndex){
    console.log(eventIndex)
    // this.setState({})
    this.setState(prevState => ({
      activeIndexAddStep: eventIndex,
      toggleActiveStep: !prevState.toggleActiveStep,
      eventIndex: this.props.eventIndex
    }))
  }

  clickHandlerSuggestRemove(eventIndex) {
    console.log('index to remove', eventIndex)
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
    this.setState({indexToRemove: eventIndex, eventIndex: this.props.eventIndex})
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

    return (
      <div className="sortable-item-wrapper">
        <div className="row-1">
          <li className="minus-image"><img key={`imagekey-minus${eventIndex}`} onClick={() => this.clickHandlerSuggestRemove(eventIndex)} alt="" src={minus}/></li>

          <li className="current-step" onClick={(event) => this.clickHandlerEdit(eventIndex, event)} key={eventIndex}>{value}</li>

          <li className="plus-image"><img key={`imageKey-plus${eventIndex}`} onClick={() => this.clickHandlerSuggestAdd(eventIndex)} alt="" src={plus}/></li>
        </div>
        <div className="row-2">
          {this.state.toggleActiveStep && (this.state.eventIndex !== null) && (this.state.activeIndexAddStep === this.state.eventIndex)
            ? <SuggestStep />
          : null}

          {(this.state.toggleOnYesNoPrompt && (this.state.eventIndex !== null) && (this.state.indexToRemove === this.state.eventIndex))
            ? <div className="prompt">
              <p>Remove Step?</p>
              <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
          : null}

          {(this.state.editStepOn && (this.state.eventIndex !== null) && this.state.activeIndexEditStep === this.state.eventIndex)
            ? <SuggestEditStep handleChange={this.handleChangeEditForm} editedStep={this.state.editedStep} submitEditedStep={this.submitEditedStep} step={value} index={eventIndex}/>
          : null}

        </div>
      </div>
          )
          }
          }
          const SuggestSortableStepWithButtons = connect()(SortableElement(ForeignSortableStepWithButtons))

          const SuggestSortableList = SortableContainer((props) => {
            console.log(props)
            const {newIndex} = props
            const {oldIndex} = props
            const {items} = props
            const {indexInMotion} = props

            return (
              <ul className="sortable-container">
                {items.map((value, index) => (<SuggestSortableStepWithButtons key={`item-${index}`} index={index} eventIndex={index} value={value} newIndex={newIndex} oldIndex={oldIndex} indexInMotion={indexInMotion}/>))}
              </ul>
            );
          });



          class ForeignCurrentSteps extends Component {
            constructor(props) {
              super(props)
              this.state = {

                  newIndex: null,
                  oldIndex: null,
                  indexInMotion: null
              }
                // this.clickHandlerYes = this.clickHandlerYes.bind(this)
                // this.clickHandlerNo = this.clickHandlerNo.bind(this)
            }

            render() {
                let currentGoalSteps = this.props.currentGoalSteps
              return (
                <div className="steps-container">
                  <SuggestSortableList items={currentGoalSteps} onSortEnd={this.onSortEnd.bind(this)} onSortStart={this.onSortStart.bind(this)} helperClass="sortable-helper" hideSortableGhost={true} pressDelay={100} newIndex={this.state.newIndex} oldIndex={this.state.oldIndex} indexInMotion={this.state.indexInMotion}/>
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

export default connect(mapStateToProps)(ForeignCurrentSteps);
