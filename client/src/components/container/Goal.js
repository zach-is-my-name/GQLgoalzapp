/* eslint-disable */

import React, {Component} from 'react'
import GoalInput  from '../presentational/GoalInput'
import GoalSelectorData from '../presentational/GoalSelector'
import CurrentGoal from '../presentational/CurrentGoal'

// , GoalSelectorData, CurrentGoal
export default function Goal() {

  return (
    <div>
      <GoalSelectorData/>
      <GoalInput />
    </div>
      )
      }
