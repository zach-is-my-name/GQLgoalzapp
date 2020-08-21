/* eslint-disable */
import React from 'react';
// import '../../../../style/OwnGoalCurrentSteps.css'
import {SortableContainer} from 'react-sortable-hoc';
import OwnStep from './OwnStep.js'

export const OwnSteps = SortableContainer(
  ({goalDocId,
  toggleSuggestedSteps,
  currentGoalSteps,
  currentGoalClonedSteps,
  newIndex,
  oldIndex,
  indexInMotion,
  randomColorStep,
  targetUserId,
  loggedInUserId,
  renderRemoveStepState,
  unrenderRemoveStepFunct,
  getArr,
  selectedSuggesterId,
  proxyAddress,
  currentEthereumAccount
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
                targetUserId={targetUserId}
                loggedInUserId={loggedInUserId}
                proxyAddress={proxyAddress}
                currentEthereumAccount={currentEthereumAccount}
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
                    targetUserId={targetUserId}
                    loggedInUserId={loggedInUserId}
                    selectedSuggesterId={selectedSuggesterId}
                    proxyAddress={proxyAddress}
                    currentEthereumAccount={currentEthereumAccount}
                  />
                )}
              </ul>
                  )
                }
              })
export default OwnSteps
