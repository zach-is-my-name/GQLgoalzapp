import React, {Component} from 'react';
import EditStepSmart from '../../EditStep-smart.js'
// import '../../../../style/OwnGoalCurrentSteps.css'

const EditButton = ({
  style,
  clickHandlerEdit,
  stepIndex,
  toggleSuggestedSteps,
  renderEditStepState,
  unrenderEditFunction,
  stepObj,
}) => {
  return (
      <div className="row-1">
        <span style={style}>
          <li onClick={(event) => clickHandlerEdit(stepIndex, event)} key={stepIndex}>
            {!toggleSuggestedSteps && renderEditStepState ?
              <EditStepSmart
                stepObj={stepObj}
                unrenderEditFunction={unrenderEditFunction}
              />
            : stepObj.step} </li>
        </span>
      </div>
        )
        }

        export default EditButton
