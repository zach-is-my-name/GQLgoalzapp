import React from 'react'
import minus from '../../../../style/images/minus.jpg'
import YesNoPrompt from '../../YesNoPrompt.js'
import RemoveStep from '../../RemoveStep-smart.js'
import RejectStep from '../../RejectStep-smart.js'
import '../../../../style/OwnGoalCurrentSteps.css'
    const MinusButton = ({
        stepIndex,
        clickHandlerMinus,
        stepObj,
        toggleConfirmPrompt,
        indexToRemove,
        toggleSuggestedSteps,
        clickHandlerConfirmRemove,
        clickHandlerConfirmReject,
        clickHandlerCancel,
        renderRemoveStepState,
        idToRemove,
        goalDocId,
        unrenderRemoveStepFunction,
        renderRejectStepState,
        unrenderRejectStepFunction,
    }) => {

return (
        <div>
          <div className="row-1">
            <li className="minus-image">
              <img key={`imagekey-minus${stepIndex}`}
                onClick={() => clickHandlerMinus(stepIndex, stepObj.id)}
                alt="" src={minus}/></li>
          </div>
          <div className="row-2">
            {(toggleConfirmPrompt && (stepIndex !== null) &&
              (indexToRemove === stepIndex && stepObj.suggestedStep === false)) && !toggleSuggestedSteps ?
                <div className="prompt">
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


            {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && toggleSuggestedSteps === true))
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
          </div>
        </div>
                )

                }

                export default MinusButton
