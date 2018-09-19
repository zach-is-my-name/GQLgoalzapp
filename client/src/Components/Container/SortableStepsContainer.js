import React from 'react';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {OwnSortableStepWithButtons} from '../Container/OwnSortableStepWithButtons.js'

export const SortableStepsContainer = SortableContainer((props) => {
  const toggleSuggestedSteps = props.toggleSuggestedSteps
  const items = props.items
  const newIndex = props.newIndex
  const oldIndex = props.oldIndex
  const indexInMotion = props.indexInMotion
  // items, newIndex, oldIndex, indexInMotion = {props}
  return (
    <ul className="sortable-container">
      {items.map((value, index) =>
        <OwnSortableStepWithButtons
          randomColorStep={props.randomColorStep}
          key={`item-${index}`}
          index={index}
          stepIndex={index}
          value={value}
          newIndex={newIndex}
          oldIndex={oldIndex}
          indexInMotion={indexInMotion}
          goalDocId={props.goalDocId}
          toggleSuggestedSteps={props.toggleSuggestedSteps}
        />)}
    </ul>
  );
});
