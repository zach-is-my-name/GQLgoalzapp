import React from 'react'
import OwnStepWithButtons from './OwnStepWithButtons.js'
import {SortableElement} from 'react-sortable-hoc'
const OwnStep = SortableElement((props) => {

  return (
    <div>  <OwnStepWithButtons {...props} /> </div>
  )
})
export default OwnStep
