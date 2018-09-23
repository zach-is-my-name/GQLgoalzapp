/* eslint-disable */

import React, {Component} from 'react'
import TargetUser from '../User/TargetUser'
import SelectGoal from '../Goal/SelectGoal-smart'
import InputGoalSmart  from '../Goal/InputGoal-smart'

export default function Goal(props) {

  return (
    <div>
      <TargetUser />
      <SelectGoal userid={props.userid} />
      {/* <InputGoal /> */}
    </div>
      )
      }
