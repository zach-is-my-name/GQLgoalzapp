/* eslint-disable */
// CSS it seems the previous version of OwnStepWithButtons had a shared div "row-2" enclosing all buttons
//CSS sortable-item-wrapper wraps everything including the conditional components
import React from 'react'
import minus from '../../../../../style/images/minus.jpg'
// import YesNoPrompt from '../../../YesNoPrompt.js'
// import RemoveStep from '../../../RemoveStep-smart.js'
// import RejectStep from '../../../RejectStep-smart.js'
import '../../../../../style/MinusButton.css'
    const MinusButton = ({
        stepIndex,
        clickHandlerMinus,
        stepObj,
    }) => {

return (
        <div className="minus-button-container">
            <li className="minus-image">
                <img key={`imagekey-minus${stepIndex}`}
                    onClick={() => clickHandlerMinus(stepIndex, stepObj.id)}
                    alt="" src={minus}/>
            </li>
            <div className="row-2">


            </div>
        </div>
                )

                }

                export default MinusButton
