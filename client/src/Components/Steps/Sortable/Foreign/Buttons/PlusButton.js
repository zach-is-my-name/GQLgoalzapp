/* eslint-disable */
import React from 'react'
import plus from '../../../../../style/images/plus_websize.png'
import SuggestStepSmart from '../../../SuggestStep-smart.js'

const PlusButton = ({
    clickHandlerSuggestAdd,
    stepIndex,
}) => {
      return (
              <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>
                )

          }

          export default PlusButton
