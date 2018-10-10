/* eslint-disable */
import React from 'react';
import SuggestStepSmart from '../../SuggestStepSmart.js'
import SuggestEditStep from '../../SuggestEditStep-smart.js'
import YesNoPrompt from '../../YesNoPrompt.js'
import SuggestRemoveStep from '../../SuggestRemoveStep-smart.js'
import plus from '../../../../style/images/plus_websize.png'
import minus from '../../../../style/images/minus.jpg'

const ForeignStepWithButtons = ({
  toggleOnYesNoPrompt,
  indexToRemove,
  value,
  stepIndex,
  newIndex,
  clickHandlerSuggestEdit,
  clickHandlerSuggestAdd,
  clickHandlerCancel,
  renderRemoveMutation,
  id,
  editStepOn,
  activeIndexEditStep,
  indexClicked,
  stepActivated,
  oldIndex,
  indexInMotion,
  goalDocId,
  targetUser,
  loggedInUser,
  clickHandlerSuggestRemove,
  clickHandlerConfirmSuggestRemove,
  renderSuggestRemoveState,
  renderSuggestEditState,
  unrenderSuggestRemoveStepFunction,
  unrenderSuggestEditStepFunction,
  stepObj,}) =>{
    return (
      <div className="sortable-item-wrapper">
        <div className="row-1">
          <li className="minus-image"><img key={`imagekey-minus${stepIndex}`} onClick={() => clickHandlerSuggestRemove(stepIndex)} alt="" src={minus}/></li>

          <li className="current-step" onClick={(event) => clickHandlerSuggestEdit(stepIndex, event)} key={stepIndex}>
            {renderSuggestEditState ?
              <SuggestEditStep
                stepObj={stepObj}
                unrenderSuggestEditStepFunction={unrenderSuggestEditStepFunction}
              />
            :stepObj.step}</li>

          <li className="plus-image"><img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerSuggestAdd(stepIndex)} alt="" src={plus}/></li>
        </div>

        <div className="row-2">
          {/*Suggest Remove*/}
          {(toggleOnYesNoPrompt && (stepIndex !== null) && (indexToRemove === stepIndex))
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

          {/*Suggest Edit */}
          {(editStepOn && (stepIndex !== null) && activeIndexEditStep === stepIndex)
            ? <SuggestEditStep id={id} index={stepIndex}/>
            : null}

          {/*Suggest Step */}
          {stepActivated && (stepIndex !== null) && (indexClicked === stepIndex)
            ? <SuggestStepSmart stepIndex={stepIndex} goalDocId={goalDocId} targetUser={targetUser} loggedInUser={loggedInUser}/>
            : null}

        </div>
      </div>
  )}
  export default ForeignStepWithButtons
