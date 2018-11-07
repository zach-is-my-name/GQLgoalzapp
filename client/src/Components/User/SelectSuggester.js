import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight} from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import '../../style/SelectSuggester.css'

const SelectSuggester = (props) => {
  // console.log(props.suggesters)
  return (
      <div className="select-suggester-wrapper">
        <div className="select-suggester-arrows-container ">
          <span className="fas faCaretLeft" onClick={props.prevSuggester}> <FontAwesomeIcon icon={ faCaretLeft } /> </span>
          <span className="far faUser fa-lg"  onClick={props.setSelf}>
            <FontAwesomeIcon icon={faUser}/>
          </span>
          <span className="fas faCaretRight" onClick={props.nextSuggester} > <FontAwesomeIcon icon={ faCaretRight } /> </span>
        </div>
      </div>
  )
}

export default SelectSuggester
