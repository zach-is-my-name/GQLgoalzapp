/* eslint-disable */
import React from 'react';
// import SuggestRemoveStep from '../../../SuggestRemoveStep-smart.js'
import RemoveSuggestedStep from '../../../RemoveSuggestedStep-smart.js'
import minus from '../../../../../style/images/minus.jpg'
// import YesNoPrompt from '../../../YesNoPrompt.js'

 const MinusButton = ( {
  stepObj,
  clickHandlerSuggestRemove,
  clickHandlerRemoveSuggested,
  stepIndex,
}) => {
  return (
    <div className="minus-button-container">
      <li className="minus-image"><img key={`imagekey-minus${stepIndex}`} onClick={(stepObj) =>
        stepObj.suggestedStep ? clickHandlerRemoveSuggested(stepIndex): clickHandlerSuggestRemove(stepIndex)} alt="" src={minus}/></li>
    </div>
          )
          }

      export default MinusButton
