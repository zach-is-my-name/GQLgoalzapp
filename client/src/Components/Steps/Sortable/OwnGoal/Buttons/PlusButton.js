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
  goalDocId,
  renderAcceptStepState,
  loggedInUserId,
  unrenderAcceptStepFunction,
  clickHandlerPlus,
  selectedSuggesterId,
  ownStepsBool,
}) => {
   //{/* <div className="row-2"> */}
      {/*add step */}
  return (
    <div className="row-2">
      <li className="plus-image"> <img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerPlus(stepIndex)} alt="" src={plus}/> </li>

      {(stepActivated && stepIndex !== null && (indexClicked === stepIndex) &&
      !stepObj.suggestedStep && ownStepsBool) ?
        <AddStepSmart stepIndex={stepIndex} goalDocId={goalDocId}/>
      : null}

      {/*accept step */}
      {(stepActivated && stepIndex !== null && (indexClicked === stepIndex) && stepObj.suggestedStep &&
      renderAcceptStepState && ownStepsBool )
        ? <AcceptStep
          acceptedStep={stepObj.step}
          goalDocId={goalDocId}
          clonedStepId={stepObj.id}
          clonedStepIndex={stepIndex}
          renderAcceptStepState={renderAcceptStepState}
          unrenderAcceptStepFunction={unrenderAcceptStepFunction}
          />
        : null}
      {/* </div> */}
    </div>
      )}


      export default PlusButton
