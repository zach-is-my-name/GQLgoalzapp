/* eslint-disable */

import React, {Component} from 'react'
import TargetUser from '../User/TargetUser'
import SelectGoal from '../Goal/SelectGoal'
import InputGoal  from '../Goal/InputGoal'

export default function Goal(props) {

  return (
    <div>
      <TargetUser />
      <SelectGoal userid={props.userid} />
      {/* <InputGoal /> */}
    </div>
      )
      }
