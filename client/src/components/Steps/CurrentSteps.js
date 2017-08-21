/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'
import * as actions from '../../Actions/actions.js'
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import YesNoPrompt from './YesNoPrompt.js'
import ForeignCurrentSteps from './ForeignCurrentSteps.js'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import InputStep from './InputSteps.js'
import EditStep from './EditStep.js'

class StepWithButtons extends Component {
    constructor(props){
      super(props)
      this.state = {
      toggleOnYesNoPrompt: false,
      indexToRemove: null,
      activeIndexAddStep: null,
      toggleActiveStep: false,
      eventIndex: null,
    }
      this.clickHandlerRemove = this.clickHandlerRemove.bind(this)
      this.clickHandlerYes = this.clickHandlerYes.bind(this)
      this.clickHandlerNo = this.clickHandlerNo.bind(this)
      this.clickHandlerAdd = this.clickHandlerAdd.bind(this)
      this.changeEventIndex = this.changeEventIndex.bind(this)
    }


    clickHandlerRemove(event, index) {
      console.log('clickHandlerRemove triggered')
      console.log('index to remove', index)
      this.setState(prevState => ({
        toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
      }))
      this.setState({indexToRemove: index,
      eventIndex: this.props.eventIndex})
    }

    clickHandlerYes(event) {
      console.log('yes clicked')
      this.props.dispatch(actions.removeStep(this.state.indexToRemove))
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

    clickHandlerAdd(event, index) {
      console.log(index)
      // this.setState({})
      this.setState(prevState => ({
        activeIndexAddStep: index,
        toggleActiveStep: !prevState.toggleActiveStep
      }))
  }

  changeEventIndex (newIndex) {
    this.setState({eventIndex: newIndex})
  }

componentWillReceiveProps(nextProps) {
  if (this.props !== nextProps) {
    this.setState({eventIndex: nextProps.newIndex})
  }
}

render() {
const {value,eventIndex,newIndex,oldIndex,indexInMotion} = this.props

// if (indexInMotion !== null &&  indexInMotion === oldIndex){
//   this.changeEventIndex(newIndex)
// }
return (
    <div className="sortable-item-wrapper">

      <li className="minus-image"><img key={`imagekey-minus${eventIndex}`} onClick={(e,index) => this.clickHandlerRemove(e,eventIndex)} alt="" src={minus}/>
        {(this.state.toggleOnYesNoPrompt && (this.state.eventIndex !== null) && (this.state.indexToRemove  === this.state.eventIndex))
          ? <div className="prompt">
            <button onClick={this.clickHandlerYes} value="Yes">Yes</button>
            <button onClick={this.clickHandlerNo} value="No">No</button>
            <p>Remove Step?</p>
          </div>
        : null}</li>

      <li className="current-step">{value}</li>

      <li className="plus-image"><img key={`imageKey-plus${eventIndex}`} onClick={(e,index) => this.clickHandlerAdd(e, eventIndex)} alt="" src={plus}/></li>
      {this.state.toggleActiveStep && this.props.newIndex  === eventIndex
        ? <InputStep /> : null}
    </div>
  )
}
}
const SortableStepWithButtons = connect()(SortableElement(StepWithButtons))



  const SortableList = SortableContainer(
    (props) => {
      console.log(props)
      const {newIndex} = props
      const {oldIndex} = props
      const {items} = props
      const {indexInMotion}= props

      return (
            <ul className="sortable-container">
              {items.map((value, index) => (
                <SortableStepWithButtons key={`item-${index}`} index={index} eventIndex={index}  value={value} newIndex={newIndex} oldIndex={oldIndex}
                  indexInMotion={indexInMotion}/>

              ))}
            </ul>
            );
            });



class CurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {

      indexToRemove: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      newIndex: null,
      oldIndex: null,
      indexInMotion: null,
    }
    this.handleChangeEditForm = this.handleChangeEditForm.bind(this);
    this.submitEditedStep = this.submitEditedStep.bind(this);
  }



  clickHandlerEdit(event, index) {
    this.setState(prevState => ({
      editStepOn: !prevState.editStepOn
    }))
    this.setState({activeIndexEditStep: index})
  }

  handleChangeEditForm (e) {
    this.setState({editedStep: e.target.value})
  }

  submitEditedStep(event, index, editedStep) {
    event.preventDefault()
    console.log(index)
    console.log(editedStep)
    this.props.dispatch(actions.editStep(index, editedStep))
    this.setState({editedStep: ""})
  }
  render() {

let steps

if (this.props.loggedInUser !== this.props.targetUser) {
    steps = <ForeignCurrentSteps currentGoalSteps={this.props.currentGoalSteps} />
    }

    steps = this.props.currentGoalSteps

            return (
              <div className="steps-container">
                <p className="currentsteps-label">
                  Steps:
                </p>
                <SortableList
                  items={steps}
                  onSortEnd={this.onSortEnd.bind(this)}
                  onSortStart={this.onSortStart.bind(this)}
                  helperClass="sortable-helper"
                  hideSortableGhost={true}
                  pressDelay={100}
                  newIndex={this.state.newIndex}
                  oldIndex={this.state.oldIndex}
                  indexInMotion={this.state.indexInMotion}
                />

              </div>
            )
          }

          onSortEnd({oldIndex, newIndex}){
                this.setState({newIndex:newIndex,
                oldIndex:oldIndex})
                const newOrderedList =  arrayMove(this.props.currentGoalSteps, oldIndex, newIndex)
                this.props.dispatch(actions.moveStep(newOrderedList))
          }


      onSortStart({index, collection}) {
            this.setState({indexInMotion: index})
        }


}



const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps,
          loggedInUser: state.goals.loggedInUserID,
          targetUser: state.goals.targetUserID,
          }
}

export default connect(mapStateToProps)(CurrentSteps);
