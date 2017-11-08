import React from 'react';
import YesNoPrompt from './YesNoPrompt.js'
import EditStep from './EditStep.js'
import AddStep from './AddStep.js'
import AcceptStep from './AcceptStep.js'

  const StepWithButtons = (props) => {
console.log(props.value.step)

  return (
    <div className="sortable-item-wrapper">
      <div className="row-1">

        <li className="minus-image"><img key={`imagekey-minus${props.eventIndex}`} onClick={() => props.minusEvent(props.eventIndex)} alt="" src={props.minusImg}/></li>

        <span style={props.stepColor}>
          <li onClick={(event) => props.clickHandlerEdit(props.eventIndex, event)} key={props.eventIndex}>{props.value.step}</li>
        </span>

        <li className="plus-image"><img key={`imageKey-plus${props.eventIndex}`} onClick={() => props.clickHandlerPlus(props.eventIndex)} alt="" src={props.plusImg}/></li>

      </div>
      <div className="row-2">

        {/*remove step*/}
        {(props.toggleConfirmPrompt && (props.eventIndex !== null) && (props.indexToRemove === props.eventIndex && props.value.suggestedStep === false))
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
              clickEventYes={props.clickHandlerReject}
              clickEventNo={props.clickHandlerCancel}/>
          </div>
        : null}

        {/*reject step*/}
        {(props.toggleConfirmPrompt && (props.eventIndex !== null) && (props.indexToRemove === props.eventIndex && props.value.suggestedStep === true))
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt clickEventYes={props.clickHandlerReject} clickEventNo={props.clickHandlerCancel}/></div>
        : null}



        {/*edit step */}
        {(props.editStepOn && (props.eventIndex !== null) && props.activeIndexEditStep === props.eventIndex)
          ? <EditStep handleChange={props.handleChangeEditForm} editedStep={props.editedStep} submitEditedStep={props.submitEditedStep} step={props.value} index={props.eventIndex}/>
        : null}

        {/*add step*/}
        {(props.activeStep && (props.eventIndex !== null) && (props.indexClicked === props.eventIndex) && props.value.suggestedStep === false)
          ? <AddStep index={props.eventIndex}/>
        : null}

        {/*accept step*/}
        {(props.activeStep && (props.eventIndex !== null) && (props.indexClicked === props.eventIndex) && props.value.suggestedStep === true && props.acceptStep)
          ? <AcceptStep step={props.value.step} goalDocId={props.goalDocId} stepId={props.value.id} index={props.eventIndex} />
        : null}

      </div>
    </div>
  )
}
export default StepWithButtons
