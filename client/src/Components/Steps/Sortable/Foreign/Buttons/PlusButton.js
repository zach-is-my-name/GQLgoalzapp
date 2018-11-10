/* eslint-disable */
import React from 'react'
import plus from '../../../../../style/images/plus_websize.png'
import SuggestStepSmart from '../../../SuggestStep-smart.js'

const PlusButton = ({
    clickHandlerSuggestAdd,
    stepIndex,
    stepActivated,
    goalDocId,
    targetUser,
    loggedInUserId,
    indexClicked,
    selectedSuggesterId,
}) => {
      return (
            <div className="plus-button-container">
              <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>

              {/*suggest step */}
              {stepActivated && (stepIndex !== null) && (indexClicked === stepIndex) && loggedInUserId === selectedSuggesterId
                ? <div className="foreign-step-suggest-step">
                  <SuggestStepSmart stepIndex={stepIndex} goalDocId={goalDocId} targetUser={targetUser} loggedInUserId={loggedInUserId}/>
                </div>
                : null }
            </div>

                )

          }

          export default PlusButton
