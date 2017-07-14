/* eslint-disable */
import React, {Component} from 'react'

import InputSteps from '../Steps/InputSteps'
import CurrentSteps from '../Steps/CurrentSteps'
import InputSuggestStep from '../Steps/SuggestStep'
import CurrentSuggestedSteps from '../Steps/CurrentSuggestedSteps'

export default function Steps() {
  return (
    <div>
      <InputSteps />
      <CurrentSteps />
      <InputSuggestStep />
      <CurrentSuggestedSteps />
    </div>
  )
}
