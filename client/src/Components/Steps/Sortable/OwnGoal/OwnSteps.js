/* eslint-disable */
import React from 'react';
// import '../../../../style/OwnGoalCurrentSteps.css'
import {SortableContainer} from 'react-sortable-hoc';
import OwnStep from './OwnStep.js'

export const OwnSteps = SortableContainer(({goalDocId,
  toggleSuggestedSteps,
  currentGoalSteps,
  currentGoalClonedSteps,
  newIndex,
  oldIndex,
  indexInMotion,
  randomColorStep,
  targetUser,
  loggedInUserId,
  renderRemoveStepState,
  unrenderRemoveStepFunct,
  getArr,
  selectedSuggesterId,
 }) => {

    if (selectedSuggesterId !== loggedInUserId) {
    return (
          <ul className="sortable-container">
            {currentGoalClonedSteps.map((stepObj, index, currentGoalClonedSteps) =>
              <OwnStep
                randomColorStep={randomColorStep}
                key={`item-${index}`}
                index={index}
                disabled={true}
                stepIndex={index}
                stepObj={stepObj}
                newIndex={newIndex}
                oldIndex={oldIndex}
                indexInMotion={indexInMotion}
                goalDocId={goalDocId}
                toggleSuggestedSteps={toggleSuggestedSteps}
                currentGoalClonedSteps={currentGoalClonedSteps}
                targetUser={targetUser}
                loggedInUserId={loggedInUserId}
              />
            )}
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
                    loggedInUserId={loggedInUserId}
                    selectedSuggesterId={selectedSuggesterId}
                  />
                )}
              </ul>
                  )
                }
              })
export default OwnSteps
