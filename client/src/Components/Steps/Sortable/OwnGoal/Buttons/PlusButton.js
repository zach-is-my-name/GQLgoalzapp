/* eslint-disable */
import React from 'react';
import plus from '../../../../../style/images/plus_websize.png'
import AddStepSmart from '../../../AddStep-smart.js'
import AcceptStep from '../../../AcceptStep-smart.js'
import '../../../../../style/PlusButton.css'
import {SortableElement} from 'react-sortable-hoc';

const PlusButton = ({
  stepIndex,
  stepActivated,
  indexClicked,
  stepObj,
  toggleSuggestedSteps,
  goalDocId,
  renderAcceptStepState,
  unrenderAcceptStepFunction,
  clickHandlerPlus,
}) => {
  return (
    <div>
      <li className="plus-image"> <img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerPlus(stepIndex)} alt="" src={plus}/> </li>
      
      <div className="row-2">

        {(stepActivated && stepIndex !== null && (indexClicked === stepIndex) &&
        !stepObj.suggestedStep && !toggleSuggestedSteps) ?
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
  )}


      export default PlusButton
