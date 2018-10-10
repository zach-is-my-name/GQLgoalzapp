/* eslint-disable */
import React from 'react';
import YesNoPrompt from '../../YesNoPrompt.js'
import EditStepSmart from '../../EditStep-smart.js'
import AddStepSmart from '../../AddStep-smart.js'
import RemoveStep from '../../RemoveStep-smart.js'
import AcceptStep from '../../AcceptStep-smart.js'
import RejectStep from '../../RejectStep-smart.js'
import minus from '../../../../style/images/minus.jpg'
import plus from '../../../../style/images/plus_websize.png'

  const OwnStepWithButtons = ({
    activeIndexEditStep,
    clickHandlerCancel,
    clickHandlerConfirmReject,
    clickHandlerConfirmRemove,
    clickHandlerEdit,
    clickHandlerMinus,
    clickHandlerPlus,
    goalDocId,
    handleChangeEditForm,
    idToRemove,
    indexClicked,
    indexToRemove,
    loggedInUser,
    renderRejectStepState,
    renderRemoveStep,
    renderRemoveStepState,
    stepActivated,
    stepColor,
    stepId,
    stepIndex,
    stepObj,
    submitEditedStep,
    targetUser,
    toggleConfirmPrompt,
    toggleSuggestedSteps,
    unrenderRejectStepFunction,
    unrenderRemoveStepFunction,
    renderAcceptStepState,
    renderEditStepState,
    unrenderAcceptStepFunction,
    unrenderEditFunction,
  }) => {
    return (
    <div className="sortable-item-wrapper">
      <div className="row-1">

        <li className="minus-image"> <img key={`imagekey-minus${stepIndex}`} onClick={() => clickHandlerMinus(stepIndex, stepObj.id)} alt="" src={minus}/></li>

        <span style={stepColor}>
          <li onClick={(event) => clickHandlerEdit(stepIndex, event)} key={stepIndex}>
            {!toggleSuggestedSteps && renderEditStepState ?
              <EditStepSmart
                stepObj={stepObj}
                unrenderEditFunction={unrenderEditFunction}
              />
            : stepObj.step} </li>
        </span>

        <li className="plus-image"> <img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerPlus(stepIndex)} alt="" src={plus}/> </li>
      </div>

      <div className="row-2">
        {/*remove step*/}
        {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && stepObj.suggestedStep === false)) && !toggleSuggestedSteps
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
              clickEventYes={clickHandlerConfirmRemove}
              clickEventNo={clickHandlerCancel}
            />
          </div>
          : null }
        {renderRemoveStepState === true  && (indexToRemove === stepIndex)  ?
          <RemoveStep
            stepObj={stepObj}
            stepIndex={stepIndex}
            idToRemove={idToRemove}
            goalDocId={goalDocId}
            unrenderRemoveStepFunction={unrenderRemoveStepFunction}
            renderRemoveStepState={renderRemoveStepState}
          />
        : null}


        {/*reject step*/}
        {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && stepObj.suggestedStep === true))
          ? <div className="prompt">
            <p>Reject Step?</p>
            <YesNoPrompt clickEventYes={clickHandlerConfirmReject} clickEventNo={clickHandlerCancel}/></div>
          : null}

        {renderRejectStepState === true && (indexToRemove === stepIndex) ?
          <RejectStep
            idToRemove={idToRemove}
            renderRejectStepState={renderRejectStepState}
            goalDocId={goalDocId}
            unrenderRejectStepFunction={unrenderRejectStepFunction}
          /> : null}

        {/*edit step */}
        {/* {(renderEditStepState && stepIndex != null && activeIndexEditStep === stepIndex)
          ? <EditStep handleChange={handleChangeEditForm} editedStep={editedStep} submitEditedStep={submitEditedStep} step={stepObj} index={stepIndex}/>
          : null}
        */}

        {/*add step*/}
        {(stepActivated && stepIndex !== null && (indexClicked === stepIndex) && !stepObj.suggestedStep && !toggleSuggestedSteps)
          ?
            <AddStepSmart stepIndex={stepIndex} goalDocId={goalDocId}/>
          : null}

        {/*accept step */}
        {(stepActivated && stepIndex !== null && (indexClicked === stepIndex) && stepObj.suggestedStep &&
        renderAcceptStepState)
          ? <AcceptStep
            acceptedStep={stepObj.step}
            goalDocId={goalDocId}
            clonedStepId={stepObj.id}
            clonedStepIndex={stepIndex}
            renderAcceptStepState={renderAcceptStepState}
            unrenderAcceptStepFunction={unrenderAcceptStepFunction}
            />
          : null}
      </div>
    </div>
  )
  }
  export default OwnStepWithButtons
