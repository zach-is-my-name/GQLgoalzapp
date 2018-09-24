import React from 'react'

const CurrentGoal = () => {
  return (
          <div className="currentgoal-container">
                  <p className="currentgoal-label">Current Goal:
                  </p>
                  <p className="currentgoal">
                          {this.props.id
                                  ? this.props.GoalDoc.goal
                                  : null
                          }
                  </p>
          </div>)
}

export default CurrentGoal
