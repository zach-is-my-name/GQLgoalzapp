/* eslint-disable */
import React, {Component} from 'react'

import InputSteps from '../Steps/InputSteps'
import CurrentSteps from '../Steps/CurrentSteps'
import SuggestStep from '../Steps/SuggestStep'
import NotificationsOwnGoal from '../Feed/NotificationsOwnGoal'
// import CurrentSuggestedSteps from '../Steps/CurrentSuggestedSteps'

export default function Steps() {
  //bad css
   function getRandomInt1(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

   function getRandomInt2(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

let colorArr = ["33ff99", "00ffff", "66ff33", "ff0066", "6666ff","ff99ff",
,"00ff66", "3300cc", "ffcc33"]

// console.log(getRandomInt(0, colorArr.length))

let randomInt1 = getRandomInt1(0, colorArr.length)

let randomInt2 = getRandomInt2(0, colorArr.length)

let randomColor1 = '#' + colorArr[randomInt1]

let randomColor2 = '#' + colorArr[randomInt2]

// console.log(randomColor)
let spanStyle1 = {
  color: '#65bca3'
}

let spanStyle2= {
  color: '#ef3779'
}

console.log('Step randomColorUserName', randomColor1)
console.log('Step randomColorStep', randomColor2)

  return (
    <div>
      {/* <InputSteps /> */}
      <NotificationsOwnGoal randomColorUserName={spanStyle1} randomColorStep={spanStyle2} />
      <CurrentSteps randomColorStep={spanStyle2} />
      {/* <SuggestStep /> */}
      {/* <CurrentSuggestedSteps /> */}
    </div>
  )
}
