import React from 'react';
import YesNoPrompt from './YesNoPrompt.js'
import EditStep from './EditStep.js'
import AddStep from './AddStep.js'
import AcceptStep from './AcceptStep.js'
import minus from '../../style/images/minus.jpg'
import plus from '../../style/images/plus_websize.png'

  const StepWithButtons = (props) => {
// console.log(props.value.step)

  return (
    <div className="sortable-item-wrapper">
      <div className="row-1">

        <li className="minus-image"><img key={`imagekey-minus${props.stepIndex}`} onClick={() => props.minusEvent(props.stepIndex)} alt="" src={minus}/></li>

        <span style={props.stepColor}>
          <li onClick={(event) => props.clickHandlerEdit(props.stepIndex, event)} key={props.stepIndex}>{props.value.step}</li>
        </span>
        
        <li className="plus-image"><img key={`imageKey-plus${props.stepIndex}`} onClick={() => props.clickHandlerPlus(props.stepIndex)} alt="" src={plus}/></li>

      </div>

      <div className="row-2">

        {/*remove step*/}
        {(props.toggleConfirmPrompt && (props.stepIndex !== null) && (props.indexToRemove === props.stepIndex && props.value.suggestedStep === false))
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
              clickEventYes={props.clickHandlerReject}
              clickEventNo={props.clickHandlerCancel}/>
          </div>
        : null}

        {/*reject step*/}
        {(props.toggleConfirmPrompt && (props.stepIndex !== null) && (props.indexToRemove === props.stepIndex && props.value.suggestedStep === true))
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt clickEventYes={props.clickHandlerReject} clickEventNo={props.clickHandlerCancel}/></div>
        : null}



        {/*edit step */}
        {(props.editStepOn && props.stepIndex != null && props.activeIndexEditStep === props.stepIndex)
          ? <EditStep handleChange={props.handleChangeEditForm} editedStep={props.editedStep} submitEditedStep={props.submitEditedStep} step={props.value} index={props.stepIndex}/>
        : null}

        {/*add step*/}
        {(props.activeStep && props.stepIndex !== null && (props.indexClicked === props.stepIndex) && !props.value.suggestedStep && !props.toggleSuggestedSteps)
          ?
            <AddStep index={props.stepIndex}/>
        : null}

        {/*accept step */}
        {(props.activeStep && props.stepIndex !== null && (props.indexClicked === props.stepIndex) && props.value.suggestedStep && props.acceptStep)
          ? <AcceptStep step={props.value.step} goalDocId={props.goalDocId} stepId={props.value.id} index={props.stepIndex} />
        : null}
      </div>
    </div>
  )
  }
  export default StepWithButtons
