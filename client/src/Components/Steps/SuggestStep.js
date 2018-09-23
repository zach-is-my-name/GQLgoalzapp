import React from 'react'

const SuggestStep = ({_sumbitSuggestedStep, handleChange, value}) => {
return (
        <div className="suggest-step-input">
                <form onSubmit={this._submitSuggestedStep}>
                        <input type="text" onChange={handleChange} placeholder="" value={this.state.step}/>
                        <input className="suggest-step-button" type="submit" value="Suggest Step"/>
                </form>
        </div>)
}
export default SuggestStep
