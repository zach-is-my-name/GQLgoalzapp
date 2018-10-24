import React from 'react'

export default function YesNoPrompt(props) {
  return (
  <div className="yes-no-prompt-buttons">
    <button onClick={props.clickEventYes} className="button-yes"  value="Yes">Yes</button>
    <button onClick={props.clickEventNo} className="button-no" value="No">No</button>
  </div>
)
    }
