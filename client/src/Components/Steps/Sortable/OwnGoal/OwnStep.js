/* eslint-disable */
import React from 'react'
import OwnStepWithButtons from './OwnStepWithButtons.js'
import {SortableElement} from 'react-sortable-hoc'

const OwnStep = SortableElement((props) => {

  return (
      <OwnStepWithButtons {...props} />
  )
})
export default OwnStep
  
