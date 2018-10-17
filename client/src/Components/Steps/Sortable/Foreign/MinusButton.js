import React from 'react';
import SuggestRemoveStep from '../../SuggestRemoveStep-smart.js'
import minus from '../../../../style/images/minus.jpg'
import YesNoPrompt from '../../YesNoPrompt.js'

 const MinusButton = ( {
  clickHandlerSuggestRemove,
  toggleConfirmPrompt,
  stepIndex,
  indexToRemove,
  clickHandlerConfirmSuggestRemove,
  clickHandlerCancel,
  renderSuggestRemoveState,
  goalDocId,
  id,
  unrenderSuggestRemoveStepFunction,
  stepObj
}) => {
  return (
    <div>
      <div className="row-1">
        <li className="minus-image"><img key={`imagekey-minus${stepIndex}`} onClick={() => clickHandlerSuggestRemove(stepIndex)} alt="" src={minus}/></li>
      </div>
      <div className="row-2">
        {/*Suggest Remove*/}
        {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex))
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
      </div>
    </div>
      )
      }

      export default MinusButton
