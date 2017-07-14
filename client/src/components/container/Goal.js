/* eslint-disable */

import React, {Component} from 'react'
import InputGoal  from '../Goal/InputGoal'
import SelectGoal from '../Goal/SelectGoal'
import TargetUser from '../User/TargetUser'

// , SelectGoalData, CurrentGoal
export default function Goal(props) {

  return (
    <div>
      <TargetUser />
      <SelectGoal userid={props.userid} />
      <InputGoal />
    </div>
      )
      }
