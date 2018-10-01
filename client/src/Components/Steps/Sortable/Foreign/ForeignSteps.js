/* eslint-disable */
import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import ForeignStep from './ForeignStep.js'


export const ForeignSteps = SortableContainer((props) => {
      const {newIndex, oldIndex, clonedSteps, indexInMotion, targetUser, loggedInUser, clickHandlerSuggestAdd} = props
      // console.log('props.items aka currentStepsClone:', items)

      return (
        <ul className="sortable-container">
            {clonedSteps.map((stepObj, index) => (<ForeignStep
                key={`item-${index}`}
                index={index}
                stepIndex={index}
                stepObj={stepObj}
                id={stepObj.id}
                newIndex={newIndex}
                oldIndex={oldIndex}
                indexInMotion={indexInMotion}
                goalDocId={props.goalDocId}
                targetUser={targetUser}
                loggedInUser={loggedInUser}
                clickHandlerSuggestAdd={clickHandlerSuggestAdd}
                                                />))}

        </ul>
      );
    });
