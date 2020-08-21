import React from 'react';
import '../../style/OwnSteps.css';

export const OwnerSteps = ({currentGoalSteps}) => {
  return (
  <ul className="sortable-container ownsteps">
                {currentGoalSteps.map((stepObj, index, currentGoalSteps) =>
                  <li key={stepObj.id}> {stepObj.step}</li>
                )}
              </ul>
  )
}
