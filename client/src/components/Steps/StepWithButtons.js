import React from 'react';
import YesNoPrompt from './YesNoPrompt.js'
import EditStep from './EditStep.js'
import InputStep from './InputSteps.js'
import AcceptStep from './AcceptStep.js'

  const StepWithButtons = (props) => {

  return (
    <div className="sortable-item-wrapper">
      <div className="row-1">
        <li className="minus-image"><img key={`imagekey-minus${props.eventIndex}`} onClick={() => props.minusEvent(props.eventIndex)} alt="" src={props.minusImg}/></li>

        <span style={props.randomColorStep}>
          <li onClick={(event) => props.clickHandlerEdit(props.eventIndex, event)} key={props.eventIndex}>{props.value.step}</li>
        </span>

        <li className="plus-image"><img key={`imageKey-plus${props.eventIndex}`} onClick={() => props.clickHandlerPlus(props.eventIndex)} alt="" src={props.plusImg}/></li>

      </div>
      <div className="row-2">

        {(props.toggleOnYesNoPrompt && (props.eventIndex !== null) && (props.indexToRemove === props.eventIndex))
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt clickEventYes={props.clickHandlerReject} clickEventNo={props.clickHandlerCancel}/></div>
        : null}

        {(props.editStepOn && (props.eventIndex !== null) && props.activeIndexEditStep === props.eventIndex)
          ? <EditStep handleChange={props.handleChangeEditForm} editedStep={props.editedStep} submitEditedStep={props.submitEditedStep} step={props.value} index={props.eventIndex}/>
        : null}

        {(props.toggleActiveStep && (props.eventIndex !== null) && (props.activeIndexAddStep === props.eventIndex) && props.value.step.suggestedStep === false)
          ? <InputStep index={props.eventIndex}/>
        : null}

        {(props.toggleActiveStep && (props.eventIndex !== null) && (props.activeIndexAddStep === props.eventIndex) && props.value.step.suggestedStep === true)
          ? <AcceptStep index={props.eventIndex} />
        : null}

      </div>
    </div>
  )
}
export default StepWithButtons
