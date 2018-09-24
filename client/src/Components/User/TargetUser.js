/* eslint-disable */
import React from 'react';
import '../../style/TargetUser.css'

const TargetUser = ({targetUserName}) =>  {
  return (
      <div className="target-user-wrapper">
        <p className="target-user-p">Target User: {targetUserName} </p>
      </div>
  )
  }
export default TargetUser
