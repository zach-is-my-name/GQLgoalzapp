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
  selectedSuggesterId,
  loggedInUserId,
  targetUser,
  style,
    }) => {
        return (
        <div className="edit-button-container">
          <span style={style}>
            <li className="current-step" onClick={(event) => clickHandlerSuggestEdit(stepIndex, event)} key={stepIndex}>
              {renderSuggestEditState ?
                <SuggestEditStep
                  stepObj={stepObj}
                  unrenderSuggestEditStepFunction={unrenderSuggestEditStepFunction}
                  loggedInUserId={loggedInUserId}
                  targetUser={targetUser}
                />
              :stepObj.step}</li>
          </span>
          {/*Suggest Edit */}
          {(editStepOn && (stepIndex !== null) && activeIndexEditStep === stepIndex) && loggedInUserId === selectedSuggesterId
            ? <SuggestEditStep id={id} index={stepIndex}/>
            : null}
        </div>
)}

  export default EditButton
