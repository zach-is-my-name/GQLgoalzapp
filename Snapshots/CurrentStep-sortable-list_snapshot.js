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

import InputStep from './InputSteps.js'

import EditStep from './EditStep.js'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(
  ({value}) =>
    <li className="current-step">{value}</li>
  );

const SortableList = SortableContainer(
  ({items}) => {
    return (
          <ul className="sortable-container">
            {items.map((value, index) => (
              // <div className="sortable-step-row">
              {/* <li className="minus-image"><img key={`imagekey-minus${index}`} onClick={e => this.clickHandlerRemove(e, index)} alt="" src={minus}/></li> */}

                <SortableItem key={`item-${index}`} index={index} value={value} />

              {/* <li className="plus-image"><img key={`imageKey-plus${index}`} onClick={e => this.clickHandlerAdd(e, index)} alt="" src={plus}/></li> */}
              // </div>
            ))}
          </ul>
          );
          });
          //should be mapping over a group of 3 li's.
class CurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndexAddStep: null,
      toggleOnYesNoPrompt: false,
      indexToRemove: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      items:[] ,
    }
    console.log('constructor', this.props.currentGoalSteps)
    this.clickHandlerYes = this.clickHandlerYes.bind(this)
    this.clickHandlerNo = this.clickHandlerNo.bind(this)
    this.handleChangeEditForm = this.handleChangeEditForm.bind(this);
    this.submitEditedStep = this.submitEditedStep.bind(this);
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

  clickHandlerRemove(event, index) {
    console.log('index to remove', index)
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
    this.setState({indexToRemove: index})
  }

  clickHandlerAdd(event, index) {
    this.setState({activeIndexAddStep: index})
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


          // <div key={`divKey${index}`} className="wrapped-step-list">
          // </div>
  render() {
let steps

if (this.props.loggedInUser !== this.props.targetUser) {
    steps = <ForeignCurrentSteps currentGoalSteps={this.props.currentGoalSteps} />
    }

    steps = this.props.currentGoalSteps.map((step, index) => {
      return (
            <ul className="mapped-return-wrapped-ul">


              <li className="mapped-return-wrapped-li" onClick={e => this.clickHandlerEdit(e, index)} key={index}>{step}</li>

              {this.state.activeIndexAddStep === index
                ? <InputStep /> : null}

              {this.state.toggleOnYesNoPrompt && this.state.indexToRemove === index ? <div className="prompt">
                <p>Remove Step?</p>
                <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
              : null}

              {this.state.editStepOn && this.state.activeIndexEditStep === index
                ? <EditStep handleChange={this.handleChangeEditForm} editedStep={this.state.editedStep}   submitEditedStep={this.submitEditedStep} step={step} index={index} /> : null}
            </ul>
            )
          })

            return (
            <div className="steps-container">
              <p className="currentsteps-label">
                Steps:
              </p>
              {/* <ul> {steps} </ul> */}
              <SortableList
                items={steps}
                onSortEnd={this.onSortEnd.bind(this)}
                helperClass="sortable-helper"
                hideSortableGhost={false}
              />

                </div>
          )
          }

                onSortEnd({oldIndex, newIndex}){
                      const newOrderedList =  arrayMove(this.props.currentGoalSteps, oldIndex, newIndex)
                      this.props.dispatch(actions.moveStep(newOrderedList))
                }
            }

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps,
          loggedInUser: state.goals.loggedInUserID,
          targetUser: state.goals.targetUserID,
          renderedSteps: state.goals.renderedSteps
          }
}

export default connect(mapStateToProps)(CurrentSteps);
