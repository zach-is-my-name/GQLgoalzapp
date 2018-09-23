import React from 'react'

        const InputGoal = ({submitGoal, handleChange, value}) => {
        <div className="goalinput-form">
          <form onSubmit={this.submitGoal}>
            <input type="text" id="form-text" placeholder=""
              onChange={handleChange}
              value={value}/>
            <input type="submit" value="ZappIt"/>
          </form>
        </div>
      }

export default InputGoal
