/* eslint-disable */
import React from 'react';
import SuggestEditStep from '../../../SuggestEditStep-smart.js'

const EditButton = ({
  clickHandlerSuggestEdit,
  stepIndex,
  renderSuggestEditState,
  stepObj,
  unrenderSuggestEditStepFunction,
  editStepOn,
  activeIndexEditStep,
  id,
    }) => {
        return (
        <div className="edit-button-container">
          <li className="current-step" onClick={(event) => clickHandlerSuggestEdit(stepIndex, event)} key={stepIndex}>
            {renderSuggestEditState ?
              <SuggestEditStep
                stepObj={stepObj}
                unrenderSuggestEditStepFunction={unrenderSuggestEditStepFunction}
              />
            :stepObj.step}</li>

          {/*Suggest Edit */}
          {(editStepOn && (stepIndex !== null) && activeIndexEditStep === stepIndex)
            ? <SuggestEditStep id={id} index={stepIndex}/>
            : null}
        </div>
)}

  export default EditButton
