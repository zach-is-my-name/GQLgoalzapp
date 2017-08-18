/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'
import * as actions from '../../Actions/actions.js'
//HAHAHAHAHAHHAHAHAHA
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import YesNoPrompt from './YesNoPrompt.js'
import ForeignCurrentSteps from './ForeignCurrentSteps.js'

import InputStep from './InputSteps.js'
import EditStep from './EditStep.js'

class CurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndexAddStep: null,
      toggleOnYesNoPrompt: false,
      indexToRemove: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: ''
    }
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
  render() {

let steps

if (this.props.loggedInUser !== this.props.targetUser) {
    steps = <ForeignCurrentSteps currentGoalSteps={this.props.currentGoalSteps} />
    }

    steps = this.props.currentGoalSteps.map((step, index) => {
      return (
        <div key={`divKey${index}`} className="currentstep-wrapper">
          <li className="minus-image"><img key={`imagekey-minus${index}`} onClick={e => this.clickHandlerRemove(e, index)} alt="" src={minus}/></li>

          <li className="plus-image"><img key={`imageKey-plus${index}`} onClick={e => this.clickHandlerAdd(e, index)} alt="" src={plus}/></li>

          <li className="current-step" onClick={e => this.clickHandlerEdit(e, index)} key={index}>{step}</li>

          {this.state.activeIndexAddStep === index
            ? <InputStep /> : null}

          {this.state.toggleOnYesNoPrompt && this.state.indexToRemove === index ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
          : null}

          {this.state.editStepOn && this.state.activeIndexEditStep === index
            ? <EditStep handleChange={this.handleChangeEditForm} editedStep={this.state.editedStep}   submitEditedStep={this.submitEditedStep} step={step} index={index} /> : null}
        </div>
      )
    })

            return (
              <div className="steps-container">
                <p className="currentsteps-label">
                  Steps:
                </p>
                <ul> {steps} </ul>
              </div>
            )
          }}


const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps,
          loggedInUser: state.goals.loggedInUserID,
          targetUser: state.goals.targetUserID,
          }
}

export default connect(mapStateToProps)(CurrentSteps);
