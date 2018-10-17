/* eslint-disable */
//index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import YesNoPrompt from '../../YesNoPrompt.js'
import EditButton from './Buttons/EditButton.js'
import PlusButton from './Buttons/PlusButton.js'
import MinusButton from './Buttons/MinusButton.js'
import '../../../../style/OwnGoalCurrentSteps.css'

class OwnStepWithButtons extends Component {

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
    <div className="sortable-item-wrapper">
      <MinusButton
        clickHandlerCancel={this.clickHandlerCancel}
        clickHandlerConfirmReject={this.clickHandlerConfirmReject}
        clickHandlerMinus={this.clickHandlerRejectStep}
        goalDocId={this.props.goalDocId}
        idToRemove={this.state.idToRemove}
        indexToRemove={this.state.indexToRemove}
        loggedInUser={this.props.loggedInUser}
        renderRejectStepState={this.state.renderRejectStepState}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUser={this.props.targetUser}
        toggleConfirmPrompt={this.state.toggleConfirmPrompt}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        unrenderRejectStepFunction={this.unrenderRejectStep}
        clickHandlerConfirmRemove={this.clickHandlerConfirmRemove}
        renderRemoveStepState={this.state.renderRemoveStepState}
        unrenderRemoveStepFunction={this.unrenderRemoveStep}
      />

      <EditButton
        loggedInUser={this.props.loggedInUser}
        style={style}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUser={this.props.targetUser}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        clickHandlerEdit={this.clickHandlerEdit}
        renderEditStepState={this.state.renderEditStepState}
        unrenderEditFunction={this.unrenderEdit}
      />

      <PlusButton
        goalDocId={this.props.goalDocId}
        indexClicked={this.state.indexClicked}
        loggedInUser={this.props.loggedInUser}
        stepActivated={this.state.stepActivated}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUser={this.props.targetUser}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        renderAcceptStepState={this.state.renderAcceptStepState}
        unrenderAcceptStepFunction={this.unrenderAcceptStep}
        clickHandlerPlus={this.clickHandlerAdd}
      />
    </div>
  )
      }


        else if (stepObj.suggestedStep === false) {



          return (
    <div className="sortable-item-wrapper">
      <MinusButton
        clickHandlerCancel={this.clickHandlerCancel}
        clickHandlerMinus={this.clickHandlerRejectStep}
        goalDocId={this.props.goalDocId}
        idToRemove={this.state.idToRemove}
        indexToRemove={this.state.indexToRemove}
        loggedInUser={this.props.loggedInUser}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUser={this.props.targetUser}
        toggleConfirmPrompt={this.state.toggleConfirmPrompt}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        clickHandlerConfirmRemove={this.clickHandlerConfirmRemove}
        renderRemoveStepState={this.state.renderRemoveStepState}
        unrenderRemoveStepFunction={this.unrenderRemoveStep}

      />
      <EditButton
        loggedInUser={this.props.loggedInUser}
        style={style}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUser={this.props.targetUser}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        clickHandlerEdit={this.clickHandlerEdit}
        renderEditStepState={this.state.renderEditStepState}
        unrenderEditFunction={this.unrenderEdit}
      />

      <PlusButton
        goalDocId={this.props.goalDocId}
        indexClicked={this.state.indexClicked}
        loggedInUser={this.props.loggedInUser}
        stepActivated={this.state.stepActivated}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUser={this.props.targetUser}
        toggleSuggestedSteps={this.props.toggleSuggestedSteps}
        clickHandlerPlus={this.clickHandlerAdd}
      />
    </div>
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

}

/* export default */
// export default Ownstep
// const sortableElement =  SortableElement(OwnStep)
// export default sortableElement
export default OwnStepWithButtons
