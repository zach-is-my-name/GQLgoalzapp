import React from 'react'
// import {Link} from 'react-router-dom'
import AddStepSmart from './AddStep-smart.js'
const FirstStep = (props) => {


const addStep = <AddStepSmart stepIndex={0} goalDocId={props.goalDocId}  />
const link =  <a onClick={props.showAddStep}>Enter a step to get started... </a>

  return  (
  props.showAddStepState ? addStep : link
)
}

export default FirstStep
  // > Enter a step to get started...</Link>
