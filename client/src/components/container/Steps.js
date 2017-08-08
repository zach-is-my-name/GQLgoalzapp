/* eslint-disable */
import React, {Component} from 'react'

import InputSteps from '../Steps/InputSteps'
import CurrentSteps from '../Steps/CurrentSteps'
import SuggestStep from '../Steps/SuggestStep'
import CurrentSuggestedSteps from '../Steps/CurrentSuggestedSteps'

export default function Steps() {
  return (
    <div>
      <InputSteps />
      <CurrentSteps />
      {/* <SuggestStep /> */}
      <CurrentSuggestedSteps />
    </div>
  )
}
