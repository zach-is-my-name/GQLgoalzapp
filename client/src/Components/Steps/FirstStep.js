import React from 'react'
// import {Link} from 'react-router-dom'
import AddStepSmart from './AddStep-smart.js'
import '../../style/FirstStep.css'
const FirstStep = (props) => {


const addStep = <AddStepSmart stepIndex={0} goalDocId={props.goalDocId} unrenderAddStepFunction={props.unrenderAddFirstStep}  />
const link =  <a onClick={props.showAddStep}>Enter a step to get started... </a>

  return  (
    <div className="first-step-container">
  {props.showAddStepState ? addStep : link}
  </div>
)
}

export default FirstStep
  // > Enter a step to get started...</Link>
