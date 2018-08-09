import React from 'react'

export default function YesNoPrompt(props) {
  return (
  <div>
    <button onClick={props.clickEventYes} value="Yes">Yes</button>
    <button onClick={props.clickEventNo} value="No">No</button>
  </div>
)
    }
