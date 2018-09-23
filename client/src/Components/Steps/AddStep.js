import React from 'react'

 const AddStep = ({_submitStep, handleChange, value}) => {
      return (<div className="stepinput-form">
          <form onSubmit={_submitStep}>
              <input type="text" onChange={handleChange} placeholder="" value={value}/>
              <input type="submit" value="Submit Step"/>
          </form>
      </div>)
}

export default AddStep
