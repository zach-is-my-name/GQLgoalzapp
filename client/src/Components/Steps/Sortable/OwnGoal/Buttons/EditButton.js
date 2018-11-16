/* eslint-disable */
import React, {Component} from 'react';
import EditStepSmart from '../../../EditStep-smart.js'
import '../../../../../style/EditButton.css'
// import '../../../../style/OwnGoalCurrentSteps.css'

const EditButton = ({
  style,
  clickHandlerEdit,
  stepIndex,
  renderEditStepState,
  unrenderEditFunction,
  stepObj,
  ownStepsBool,
}) => {
  return (
        <div className="edit-button">
          <span style={style}>
            <li onClick={(event) => clickHandlerEdit(stepIndex, event)} key={stepIndex}>
              {ownStepsBool && renderEditStepState ?
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
