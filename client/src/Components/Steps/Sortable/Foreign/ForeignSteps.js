/* eslint-disable */
import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import ForeignStep from './ForeignStep.js'


const ForeignSteps = SortableContainer(({
        newIndex,
        oldIndex,
        clonedSteps,
        indexInMotion,
        targetUser,
        loggedInUserId,
        goalDocId,
        suggestersIndex,
        selectedSuggesterId,
    }) => {
      return (
        <ul className="sortable-container">
            {clonedSteps.map((stepObj, index) => (
                <ForeignStep
                    key={`item-${index}`}
                    index={index}
                    stepIndex={index}
                    stepObj={stepObj}
                    id={stepObj.id}
                    newIndex={newIndex}
                    oldIndex={oldIndex}
                    indexInMotion={indexInMotion}
                    goalDocId={goalDocId}
                    targetUser={targetUser}
                    loggedInUserId={loggedInUserId}
                    selectedSuggesterId={selectedSuggesterId}
                    suggestersIndex={suggestersIndex}
                />
            ))}

        </ul>
      );
    });

    export default ForeignSteps
