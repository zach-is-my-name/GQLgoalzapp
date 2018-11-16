/* eslint-disable */
import React from 'react';
import plus from '../../../../../style/images/plus_websize.png'
// import AddStepSmart from '../../../AddStep-smart.js'
import AcceptStep from '../../../AcceptStep-smart.js'
import '../../../../../style/PlusButton.css'
import {SortableElement} from 'react-sortable-hoc';

const PlusButton = ({
  stepIndex,
  clickHandlerPlus,
}) => {
   //{/* <div className="row-2"> */}
      {/*add step */}
  return (
      <li className="plus-image"> <img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerPlus(stepIndex)} alt="" src={plus}/> </li>
      )}


      export default PlusButton
