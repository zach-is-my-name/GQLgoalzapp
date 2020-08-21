/* eslint-disable */
//index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import EditButton from './Buttons/EditButton.js'
import PlusButton from './Buttons/PlusButton.js'
import MinusButton from './Buttons/MinusButton.js'
import YesNoPrompt from '../../YesNoPrompt.js'
import RemoveStep from '../../RemoveStep-smart.js'
import RejectStep from '../../RejectStep-smart.js'
import AcceptStep from '../../AcceptStep-smart.js'
import AddStepSmart from '../../AddStep-smart.js'
import AcceptNonPayableStep from '../../AcceptNonPayableStep-smart.js'
import '../../../../style/OwnGoalCurrentSteps.css'
import '../../../../style/OwnStepWithButtons.css'

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
      renderAcceptStepState: false,
      renderAddStepState: false,
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
    this.clickHandlerConfirmRemove = this.clickHandlerConfirmRemove.bind(this)
    this.unrenderAddStep = this.unrenderAddStep.bind(this)
  }

  render() {
    const {stepObj, stepIndex, newIndex, oldIndex, indexInMotion} = this.props
    const ownStepsBool = this.props.selectedSuggesterId === this.props.loggedInUserId
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
    <div className="own-step-with-buttons-container">
      <MinusButton
        clickHandlerMinus={this.clickHandlerRejectStep}
        stepObj={this.props.stepObj}
        stepIndex={this.props.stepIndex}
      />

      <EditButton
        loggedInUser={this.props.loggedInUser}
        style={style}
        stepIndex={this.props.stepIndex}
        stepObj={this.props.stepObj}
        targetUserId={this.props.targetUserId}
        clickHandlerEdit={this.clickHandlerEdit}
        renderEditStepState={this.state.renderEditStepState}
        unrenderEditFunction={this.unrenderEdit}
        ownStepsBool={this.props.selectedSuggesterId === this.props.loggedInUserId}
      />

      <PlusButton
        clickHandlerPlus={this.clickHandlerAcceptStep}
        stepIndex={this.props.stepIndex}
      />

      {/*reject step*/}
      {/* {console.log((this.state.toggleConfirmPrompt &&
        (this.state.indexToRemove === this.state.indexClicked &&
        this.props.stepObj.suggestedStep && this.props.targetUserId === this.props.loggedInUserId)))}

      */}
      <div className="own-step-reject container">
        {(this.state.toggleConfirmPrompt
          &&
          (this.state.indexToRemove === this.state.indexClicked &&
          this.props.stepObj.suggestedStep && this.props.targetUserId === this.props.loggedInUserId))
            ?
              <div className="own-step-reject confirm-prompt">
                <div className="own-step-reject text">
                  <p>Reject Step?</p>
                  <YesNoPrompt clickEventYes={this.clickHandlerConfirmReject}
                    clickEventNo={this.clickHandlerCancel}/>
                </div>
              </div>
            : null}

        {this.state.renderRejectStepState === true &&
          (this.state.indexToRemove === this.state.indexClicked) ?
            <RejectStep
              idToRemove={this.state.idToRemove}
              renderRejectStepState={this.state.renderRejectStepState}
              goalDocId={this.props.goalDocId}
              unrenderRejectStepFunction={this.unrenderRejectStep}
              proxyAddress={this.props.proxyAddress}
              currentEthereumAccount={this.props.currentEthereumAccount}
            /> : null}
      </div>

      {/*accept step */}
      {/*todo use this.state.indexClicked and this.props.stepIndex as selected step indicators*/}
      {  (this.state.stepActivated && this.state.stepIndex !== null &&
        (this.state.indexClicked === this.state.stepIndex) &&
        this.props.stepObj.suggestedStep &&
        (!this.props.stepObj.suggestEdit &&
        !this.props.stepObj.suggestMove && !this.props.stepObj.suggestRemove ) &&
        this.state.renderAcceptStepState && this.props.targetUserId ===
        this.props.loggedInUserId) ?
            <div className="own-step-accept">
              <AcceptStep
                stepIndex={this.state.stepIndex}
                acceptedStep={this.props.stepObj.step}
                goalDocId={this.props.goalDocId}
                clonedStepId={this.props.stepObj.id}
                clonedStepIndex={this.state.stepIndex}
                renderAcceptStepState={this.state.renderAcceptStepState}
                unrenderAcceptStepFunction={this.unrenderAcceptStep}
                proxyAddress={this.props.proxyAddress}
                currentEthereumAccount={this.props.currentEthereumAccount}
              />
            </div>
           : null}
          {/* accept non-payable step*/}
        { (this.state.stepActivated && this.state.stepIndex !== null && this.state.indexClicked !== null &&
        (this.state.indexClicked === this.state.stepIndex) &&
        this.props.stepObj.suggestedStep && (this.props.stepObj.suggestEdit ||
        this.props.stepObj.suggestMove || this.props.stepObj.suggestRemove) &&
        this.state.renderAcceptStepState && this.props.targetUserId ===
        this.props.loggedInUserId) ?
            <div className="own-step-accept">
              <AcceptNonPayableStep
                stepObj={this.props.stepObj}
                suggestRemove={this.props.stepObj.suggestRemove}
                suggestMove={this.props.stepObj.suggestMove}
                suggestEdit={this.props.stepObj.suggestEdit}
                stepIndex={this.state.stepIndex}
                acceptedStep={this.props.stepObj.step}
                goalDocId={this.props.goalDocId}
                clonedStepId={this.props.stepObj.id}
                clonedStepIndex={this.state.stepIndex}
                renderAcceptStepState={this.state.renderAcceptStepState}
                unrenderAcceptStepFunction={this.unrenderAcceptStep}
              />
            </div> : null }
    </div>
    )}


        else if (stepObj.suggestedStep === false) {
          return (
            <div>
              <div className="own-step-with-buttons-container">
                <MinusButton
                  clickHandlerMinus={this.clickHandlerRemoveStep}
                  stepIndex={this.props.stepIndex}
                  stepObj={this.props.stepObj}

                />
                <EditButton
                  loggedInUser={this.props.loggedInUser}
                  style={style}
                  stepIndex={this.props.stepIndex}
                  stepObj={this.props.stepObj}
                  targetUserId={this.props.targetUserId}
                  clickHandlerEdit={this.clickHandlerEdit}
                  renderEditStepState={this.state.renderEditStepState}
                  unrenderEditFunction={this.unrenderEdit}
                  selectedSuggesterId={this.props.selectedSuggesterId}
                  ownStepsBool={this.props.selectedSuggesterId === this.props.loggedInUserId}
                />

                <PlusButton
                  stepIndex={this.props.stepIndex}
                  clickHandlerPlus={this.clickHandlerAdd}
                />
              </div>


              {/******** RENDER LOGIC******/}
              {/*remove step*/}
              <div className='own-step-remove container'>
                {(this.state.toggleConfirmPrompt && (this.state.indexClicked !== null) &&
                  (this.state.indexToRemove === this.state.indexClicked &&
                  this.props.stepObj.suggestedStep === false)) && this.props.targetUserId === this.props.loggedInUserId ?
                    <div className="own-step-remove confirm-prompt">
                      <div className="own-step-remove text">
                        <p>Remove Step?</p>
                        <YesNoPrompt
                          clickEventYes={this.clickHandlerConfirmRemove}
                          clickEventNo={this.clickHandlerCancel}
                        />
                      </div>
                    </div>
                  : null }

                {this.state.renderRemoveStepState === true  && (this.state.indexToRemove === this.state.indexClicked)  ?
                  <RemoveStep
                    stepObj={this.props.stepObj}
                    stepIndex={this.state.stepIndex}
                    idToRemove={this.state.idToRemove}
                    goalDocId={this.props.goalDocId}
                    unrenderRemoveStepFunction={this.unrenderRemoveStep}
                    renderRemoveStepState={this.state.renderRemoveStepState}
                  />
                : null}
              </div>
              {/*add step */}
              { (this.state.stepActivated && this.state.stepIndex !== null &&
                (this.state.indexClicked === this.state.stepIndex) &&
                !this.props.stepObj.suggestedStep &&
              this.props.selectedSuggesterId === this.props.loggedInUserId) && this.state.renderAddStepState ?
                <div className="own-step-add">
                  <AddStepSmart
                    stepIndex={this.state.stepIndex}
                    goalDocId={this.props.goalDocId}
                    unrenderAddStepFunction={this.unrenderAddStep}
                  />
                </div>
              : null}

              {/* </div> */}

            </div>
  )
  }
  else { return null}
  }

  clickHandlerRejectStep(stepIndex, id) {
        // console.log('rejectStep clicked', 'stepIndex', stepIndex)
        this.setState(prevState => ({
          toggleConfirmPrompt: !prevState.toggleConfirmPrompt,
          indexClicked: stepIndex,
          indexToRemove: this.props.stepIndex,
          idToRemove: this.props.stepObj.id
        }))
      }


  clickHandlerAdd(stepIndex) {
    this.setState(prevState => ({
      indexClicked: stepIndex,
      stepActivated: !prevState.stepActivated,
      stepIndex: this.props.stepIndex,
      renderAddStepState: !prevState.renderAddStepState,
    }))
  }

  unrenderAddStep() {
    this.setState({
      renderAddStepState: false,
      indexClicked: null,
      stepActivated: false,
      stepIndex: null,
    })
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
    // console.log('called unrender')
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
      indexClicked: indexClicked,
      stepIndex: this.props.stepIndex,
    }))
  }

  unrenderAcceptStep() {
    // console.log('unrender accept step called')
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
