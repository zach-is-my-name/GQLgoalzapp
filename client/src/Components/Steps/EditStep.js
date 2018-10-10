import React from 'react'
import '../../style/EditStep.css'

const EditStep = (props) => {
return  (
<div className="editstep-form">
  <form onSubmit={props._submitEditedStep}>
    <input  type="text" onChange={props.handleChange} value={props.value}
    autoFocus className="edit-step-input"   />
    {/* <input type="submit" className="edit-step-submit" value="Edit Step" /> */}
  </form>
</div>
)
}

export default EditStep

// onBlur={props.unrenderEditFunction}
