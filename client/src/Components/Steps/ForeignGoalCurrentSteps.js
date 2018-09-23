/* eslint-disable */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../../style/ForeignGoalCurrentSteps.css'

import SuggestStepSmart from './SuggestStepSmart.js'
import SuggestEditStep from './SuggestEditStep.js'
import YesNoPrompt from './YesNoPrompt.js'
import SuggestRemoveStep from './SuggestRemoveStep.js'

class ForeignSortableStepWithButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleOnYesNoPrompt: false,
      indexToRemove: null,
      activeIndexAddStep: null,
      activeStep: false,
      stepIndex: null,
      activeIndexEditStep: null,
      editStepOn: false,
      editedStep: '',
      renderRemoveMutation:false,
    }

    this.clickHandlerNo = this.clickHandlerNo.bind(this)
    this.clickHandlerYes = this.clickHandlerYes.bind(this)
}

  clickHandlerEdit(stepIndex, event) {
    this.setState(prevState => ({
      editStepOn: !prevState.editStepOn
    }))
    this.setState({activeIndexEditStep: stepIndex, stepIndex: this.props.stepIndex})
  }

  clickHandlerYes(event) {
    console.log('yes clicked')
    this.setState(prevState => ({
      renderRemoveMutation: !prevState.renderRemoveMutation
    // toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
  }))
  }

  clickHandlerNo(event) {
    console.log('no clicked')
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
      indexToRemove: null
    }))
  }

  clickHandlerSuggestAdd(stepIndex){
    // console.log(stepIndex)
    // this.setState({})
    this.setState(prevState => ({
      activeIndexAddStep: stepIndex,
      activeStep: !prevState.activeStep,
      stepIndex: this.props.stepIndex
    }))
  }

  clickHandlerSuggestRemove(stepIndex) {
    console.log('index to remove', stepIndex)
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
    this.setState({indexToRemove: stepIndex, stepIndex: this.props.stepIndex})
  }

  // changestepIndex(newIndex) {
  //     this.setState({stepIndex: newIndex})
  //   }


  //USED TO MAINTAIN POSITION ON DRAG BUT
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.stepIndex !== nextProps.newIndex) {
  //     console.log("componentWillReceiveProps called from ForeignGoalCurrentSteps")
  //     this.setState({stepIndex: nextProps.newIndex})
  //     this.props.dispatch(actions.setClonedStepPositionIndex())
  //   }
  // }

  render() {
    const {value, stepIndex, newIndex, oldIndex, indexInMotion} = this.props

    return (
      <div className="sortable-item-wrapper">
        <div className="row-1">
          <li className="minus-image"><img key={`imagekey-minus${stepIndex}`} onClick={() => this.clickHandlerSuggestRemove(stepIndex)} alt="" src={minus}/></li>

          <li className="current-step" onClick={(event) => this.clickHandlerEdit(stepIndex, event)} key={stepIndex}>{value}</li>

          <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => this.clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>
        </div>
        <div className="row-2">

          {(this.state.toggleOnYesNoPrompt && (this.state.stepIndex !== null) && (this.state.indexToRemove === this.state.stepIndex))
            ? <div className="prompt">
              <p>Remove Step?</p>
              <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
            : null}

          {this.state.renderRemoveMutation ? <SuggestRemoveStep indexToRemove={this.state.indexToRemove} id={this.props.id} /> : null }

          {(this.state.editStepOn && (this.state.stepIndex !== null) && this.state.activeIndexEditStep === this.state.stepIndex)
            ? <SuggestEditStep id={this.props.id} index={stepIndex}/>
            : null}

          {this.state.activeStep && (this.state.stepIndex !== null) && (this.state.activeIndexAddStep === this.state.stepIndex)
            ? <SuggestStepSmart index={stepIndex}/>
            : null}

        </div>
      </div>
          )
          }
          }

const SuggestSortableStepWithButtons = connect()(SortableElement(ForeignSortableStepWithButtons))

const SuggestSortableList = SortableContainer((props) => {
      const {newIndex} = props
      const {oldIndex} = props
      const {items} = props
      const {indexInMotion} = props
      // console.log('props.items aka currentStepsClone:', items)

      return (
        <ul className="sortable-container">
          {items.map((value, index) => (<SuggestSortableStepWithButtons key={`item-${index}`} index={index} stepIndex={index} value={value.step} id={value.id} newIndex={newIndex} oldIndex={oldIndex} indexInMotion={indexInMotion}/>))}
        </ul>
      );
    });



class ForeignGoalCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {

        newIndex: null,
        oldIndex: null,
        indexInMotion: null,
        toggleOnZappButton: true,
    }
      // this.clickHandlerYes = this.clickHandlerYes.bind(this)
      // this.clickHandlerNo = this.clickHandlerNo.bind(this)
  }

  render() {
      let currentGoalStepsClone = this.props.currentGoalStepsClone
    return (
      <div className="steps-container">
        <SuggestSortableList items={currentGoalStepsClone} onSortEnd={this.onSortEnd.bind(this)} onSortStart={this.onSortStart.bind(this)} helperClass="sortable-helper" hideSortableGhost={true} pressDelay={100} newIndex={this.state.newIndex} oldIndex={this.state.oldIndex} indexInMotion={this.state.indexInMotion}/>
        {/* {this.state.toggleOnZappButton ? <ZappButton /> : null} */}
      </div>
)
}
  onSortEnd({oldIndex, newIndex}) {
    this.setState({newIndex: newIndex, oldIndex: oldIndex})
    const newOrderedList = arrayMove(this.props.currentGoalStepsClone, oldIndex, newIndex)
    this.props.dispatch(actions.moveStepOnClone(newOrderedList))
  }

  onSortStart({index, collection}) {
    this.setState({indexInMotion: index})
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID, currentGoalStepsClone: state.goals.currentGoalStepsClone}
}

export default connect(mapStateToProps)(ForeignGoalCurrentSteps);
