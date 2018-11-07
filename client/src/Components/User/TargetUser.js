/* eslint-disable */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight} from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import '../../style/TargetUser.css'

const TargetUser = ({targetUserName}) =>  {
  return (
      <div className="target-user-wrapper">
        <p className="target-user-p">{targetUserName} </p>
        {/* <div className="target-user-arrows-container "> */}
        {/* <span className="fas faCaretLeft"> <FontAwesomeIcon icon={ faCaretLeft } /> </span> */}
        {/* <span className="fas faCaretRight"> <FontAwesomeIcon icon={ faCaretRight } /> </span> */}
        {/* </div> */}
      </div>
          )
  }
export default TargetUser
