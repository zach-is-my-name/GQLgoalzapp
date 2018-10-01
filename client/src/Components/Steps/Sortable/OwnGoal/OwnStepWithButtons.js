/* eslint-disable */
import React from 'react';
import YesNoPrompt from '../../YesNoPrompt.js'
import EditStep from '../../EditStep.js'
import AddStepSmart from '../../AddStep-smart.js'
import RemoveStep from '../../RemoveStep.js'
import AcceptStep from '../../AcceptStep.js'
import minus from '../../../../style/images/minus.jpg'
import plus from '../../../../style/images/plus_websize.png'

  const OwnStepWithButtons = ({
        stepIndex,
        minusEvent,
        toggleConfirmPrompt,
        indexToRemove,
        clickHandlerEdit,
        clickHandlerPlus,
        clickHandlerMinus,
        clickHandlerCancel,
        editedStep,
        submitEditedStep,
        activeStep,
        indexClicked,
        stepColor,
        goalDocId,
        stepId,
        clickHandlerRejectStep,
        toggleSuggestedSteps,
        editStepOn,
        activeIndexEditStep,
        handleChangeEditForm,
        acceptStep,
        stepObj,
        clickHandlerConfirmRemove,
        renderRemoveStep,
        unrenderRemoveStep,
        nextPropsCurrentGoalSteps=[],
        targetUser,
        loggedInUser,
  }) => {
    return (
    <div className="sortable-item-wrapper">
      <div className="row-1">

        <li className="minus-image"> <img key={`imagekey-minus${stepIndex}`} onClick={() => minusEvent(stepIndex, stepObj.id)} alt="" src={minus}/></li>

        <span style={stepColor}>
          <li onClick={(event) => clickHandlerEdit(stepIndex, event)} key={stepIndex}> {stepObj.step} </li>
        </span>

        <li className="plus-image"> <img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerPlus(stepIndex)} alt="" src={plus}/> </li>
      </div>

      <div className="row-2">
        {/*remove step*/}
        {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && stepObj.suggestedStep === false))
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
              clickEventYes={clickHandlerConfirmRemove}
              clickEventNo={clickHandlerCancel}
            />
          </div>
          : null }
        {}
        {/* {renderRemoveStep /*&& (indexClicked === stepIndex)  ? <RemoveStep stepIndex={stepIndex}  unrenderRemoveStep={unrenderRemoveStep} nextPropsCurrentGoalSteps={nextPropsCurrentGoalSteps} /> : null}
        */}

        {/*reject step*/}
        {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && stepObj.suggestedStep === true))
          ? <div className="prompt">
            <p>Reject Step?</p>
            <YesNoPrompt clickEventYes={clickHandlerMinus} clickEventNo={clickHandlerCancel}/></div>
          : null}

        {/*edit step */}
        {(editStepOn && stepIndex != null && activeIndexEditStep === stepIndex)
          ? <EditStep handleChange={handleChangeEditForm} editedStep={editedStep} submitEditedStep={submitEditedStep} step={stepObj} index={stepIndex}/>
          : null}

        {/*add step*/}
        {(activeStep && stepIndex !== null && (indexClicked === stepIndex) && !stepObj.suggestedStep && !toggleSuggestedSteps)
          ?
            <AddStepSmart stepIndex={stepIndex} goalDocId={goalDocId}/>
          : null}

        {/*accept step */}
        {(activeStep && stepIndex !== null && (indexClicked === stepIndex) && stepObj.suggestedStep && acceptStep)
          ? <AcceptStep step={stepObj.step} goalDocId={goalDocId} stepId={stepObj.id} index={stepIndex} />
          : null}
      </div>
    </div>
  )
  }
  export default OwnStepWithButtons
