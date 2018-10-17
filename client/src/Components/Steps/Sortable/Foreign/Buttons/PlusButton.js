/* eslint-disable */
import React from 'react'
import plus from '../../../../../style/images/plus_websize.png'
import SuggestStepSmart from '../../../SuggestStep-smart.js'

const PlusButton = ({
    clickHandlerSuggestAdd,
    stepIndex,
    stepActivated,
    indexClicked,
    goalDocId,
    targetUser,
    loggedInUser,
}) => {
      return (
      <div>
        <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>
        {stepActivated && (stepIndex !== null) && (indexClicked === stepIndex)
          ? <SuggestStepSmart stepIndex={stepIndex} goalDocId={goalDocId} targetUser={targetUser} loggedInUser={loggedInUser}/>
          : null}
      </div>

          )
          }

          export default PlusButton
