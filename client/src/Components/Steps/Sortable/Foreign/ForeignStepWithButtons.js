/* eslint-disable */
import React from 'react';
import SuggestStepSmart from '../../SuggestStepSmart.js'
import SuggestEditStep from '../../SuggestEditStep.js'
import YesNoPrompt from '../../YesNoPrompt.js'
import SuggestRemoveStep from '../../SuggestRemoveStep.js'
import plus from '../../../../style/images/plus_websize.png'
import minus from '../../../../style/images/minus.jpg'

const ForeignStepWithButtons = ({toggleOnYesNoPrompt, indexToRemove, value, stepIndex,
  newIndex, clickHandlerEdit, clickHandlerSuggestAdd, clickHandlerYes,clickHandlerNo, renderRemoveMutation,id, editStepOn, activeIndexEditStep, indexClicked, activeStep,
  oldIndex, indexInMotion, goalDocId, targetUser, loggedInUser, clickHandlerSuggestRemove, stepObj}) =>{
    return (
      <div className="sortable-item-wrapper">
        <div className="row-1">
          <li className="minus-image"><img key={`imagekey-minus${stepIndex}`} onClick={() => clickHandlerSuggestRemove(stepIndex)} alt="" src={minus}/></li>

          <li className="current-step" onClick={(event) => clickHandlerEdit(stepIndex, event)} key={stepIndex}>{stepObj.step}</li>

          <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>
        </div>

        <div className="row-2">
          {(toggleOnYesNoPrompt && (stepIndex !== null) && (indexToRemove === stepIndex))
            ? <div className="prompt">
              <p>Remove Step?</p>
              <YesNoPrompt clickEventYes={clickHandlerYes} clickEventNo={clickHandlerNo}/></div>
            : null}

          {renderRemoveMutation ? <SuggestRemoveStep indexToRemove={indexToRemove} id={id} /> : null }

          {(editStepOn && (stepIndex !== null) && activeIndexEditStep === stepIndex)
            ? <SuggestEditStep id={id} index={stepIndex}/>
            : null}

          {activeStep && (stepIndex !== null) && (indexClicked === stepIndex)
            ? <SuggestStepSmart stepIndex={stepIndex} goalDocId={goalDocId} targetUser={targetUser} loggedInUser={loggedInUser}/>
                  : null}

          </div>
      </div>
  )}
  export default ForeignStepWithButtons
