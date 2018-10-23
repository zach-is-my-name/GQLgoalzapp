/* eslint-disable */
import React from 'react'
import plus from '../../../../../style/images/plus_websize.png'
// import SuggestStepSmart from '../../SuggestStep-smart.js'

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
            <div className="plus-button-container">
                <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>
            </div>
                )
          }

          export default PlusButton
