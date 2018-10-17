/* eslint-disable */
import React from 'react';
import SuggestRemoveStep from '../../../SuggestRemoveStep-smart.js'
import RemoveSuggestedStep from '../../../RemoveSuggestedStep-smart.js'
import minus from '../../../../../style/images/minus.jpg'
import YesNoPrompt from '../../../YesNoPrompt.js'

 const MinusButton = ( {
  clickHandlerSuggestRemove,
  toggleConfirmPrompt,
  stepIndex,
  indexToRemove,
  clickHandlerConfirmSuggestRemove,
  clickHandlerConfirmRemoveSuggestedStep,
  clickHandlerCancel,
  renderSuggestRemoveState,
  renderRemoveSuggestedStepState,
  goalDocId,
  id,
  unrenderSuggestRemoveStepFunction,
  unrenderRemoveSuggestedStepFunction,
  clickHandlerRemoveSuggested,
  stepObj
}) => {
  return (
    <div>
      <div className="row-1">
        <li className="minus-image"><img key={`imagekey-minus${stepIndex}`} onClick={(stepObj) =>
          stepObj.suggestedStep ? clickHandlerRemoveSuggested(stepIndex): clickHandlerSuggestRemove(stepIndex)} alt="" src={minus}/></li>
      </div>
      <div className="row-2">

        {/*Suggest Remove Step*/}
        {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex) && !stepObj.suggestedStep)
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
              clickEventYes={clickHandlerConfirmSuggestRemove}
              clickEventNo={clickHandlerCancel}/>
          </div>
          : null}

        {renderSuggestRemoveState ?
          <SuggestRemoveStep
            indexToRemove={indexToRemove}
            goalDocId={goalDocId}
            id={id}
            unrenderSuggestRemoveStepFunction={unrenderSuggestRemoveStepFunction}
            stepObj={stepObj}
          />
        : null }

        {/*Remove Suggested Step*/}
        {toggleConfirmPrompt &&(stepIndex !== null) && (indexToRemove === stepIndex) && stepObj.suggestedStep
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
              clickEventYes={clickHandlerConfirmRemoveSuggestedStep}
              clickEventNo={clickHandlerCancel}/>
          </div>
          : null}

        {renderRemoveSuggestedStepState ?
          <RemoveSuggestedStep
            indexToRemove={indexToRemove}
            idToRemove={stepObj.id}
            goalDocId={goalDocId}
            unrenderRemoveSuggestedStepFunction={unrenderRemoveSuggestedStepFunction}
            stepObj={stepObj}
          /> : null}

      </div>
    </div>
          )
          }

      export default MinusButton
