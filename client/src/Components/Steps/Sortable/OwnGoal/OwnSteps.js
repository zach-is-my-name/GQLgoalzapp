import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import OwnStep from './OwnStep.js'

export const OwnSteps = SortableContainer(({goalDocId, toggleSuggestedSteps, currentGoalSteps, currentGoalStepsClone, newIndex, oldIndex, indexInMotion, randomColorStep, targetUser, loggedInUser, renderRemoveStepState, unrenderRemoveStepFunct}) => {

  if (toggleSuggestedSteps === true) {
    return (
    <ul className="sortable-container">
      {currentGoalStepsClone.map((stepObj, index, currentGoalStepsClone) =>
        <OwnStep
          randomColorStep={randomColorStep}
          key={`item-${index}`}
          index={index}
          stepIndex={index}
          stepObj={stepObj}
          newIndex={newIndex}
          oldIndex={oldIndex}
          indexInMotion={indexInMotion}
          goalDocId={goalDocId}
          toggleSuggestedSteps={toggleSuggestedSteps}
          currentGoalStepsClone={currentGoalStepsClone}
          targetUser={targetUser}
          loggedInUser={loggedInUser}
        />)}
    </ul>
    )
  } else {
  return (
    <ul className="sortable-container">
      {currentGoalSteps.map((stepObj, index, currentGoalSteps) =>
        <OwnStep
          randomColorStep={randomColorStep}
          key={`item-${index}`}
          index={index}
          stepIndex={index}
          stepObj={stepObj}
          newIndex={newIndex}
          oldIndex={oldIndex}
          indexInMotion={indexInMotion}
          goalDocId={goalDocId}
          toggleSuggestedSteps={toggleSuggestedSteps}
          currentGoalSteps={currentGoalSteps}
          targetUser={targetUser}
          loggedInUser={loggedInUser}
        />)}
    </ul>
  );
}});
