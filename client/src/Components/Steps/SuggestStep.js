import React from 'react'

const SuggestStep = ({_submitSuggestedStep, handleChange, value}) => {
  return (
    <div className="suggest-step-input">
      <form onSubmit={_submitSuggestedStep}>
        <input type="text" onChange={handleChange} placeholder="" value={value}/>
        <input type="submit"className="suggest-step-button"  value="Suggest Step"/>
      </form>
    </div>)
}
export default SuggestStep
