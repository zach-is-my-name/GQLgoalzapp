import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import OwnSortableStepWithButtons from '../Container/OwnSortableStepWithButtons.js'

export const SortableStepsContainer = SortableContainer(({goalDocId, toggleSuggestedSteps, currentGoalSteps, currentGoalStepsClone, newIndex, oldIndex, indexInMotion, randomColorStep}) => {
  if (toggleSuggestedSteps === true) {
    return (
    <ul className="sortable-container">
      {currentGoalStepsClone.map((stepObj, index, currentGoalStepsClone) =>
        <OwnSortableStepWithButtons
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
        />)}
    </ul>
    )
  } else {
  return (
    <ul className="sortable-container">
      {currentGoalSteps.map((stepObj, index, currentGoalSteps) =>
        <OwnSortableStepWithButtons
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
        />)}
    </ul>
  );
}});
