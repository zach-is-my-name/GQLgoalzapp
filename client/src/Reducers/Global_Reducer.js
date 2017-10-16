/* eslint-disable */
import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import {store} from '../store';


const initialState = {
  currentGoal: '',
  currentGoalID:'',
  currentGoalSteps:[],
  currentGoalStepsClone: [],
  loggedInUserID:'',
  loggedInUserName:'',
  loggedIn: false,
  targetUserID: '',
  targetUserName: '' ,
  // currentSuggestedSteps:[],
  // currentSuggestedRemoveSteps: [],
}

export const goalReducer = (state = initialState, action) => {

if (action.type === 'SET_USERID') {
  return update(state, {
    loggedInUserID: {$set: action.id}
  })
}

if (action.type === 'SET_GOAL') {
  return update(state, {
    currentGoal: {$set:action.goal},
  })
}

if (action.type === 'SET_GOALDOC_ID') {
  return update(state, {
    currentGoalID: {$set:action.goalDocID},
  })
}
// keep an eye on this state change
if (action.type === 'SET_GOALDOC') {
  return update (state, {
  currentGoal: {$set:action.flatGoalDoc.goal},
  currentGoalID: {$set:action.flatGoalDoc.id},
  currentGoalSteps: {$set:action.flatGoalDoc.flatSteps},
  // currentSuggestedSteps: {$set:action.flatGoalDoc.flatSuggestedSteps},
  })
}

if (action.type === 'SET_STEP') {
  return update(state, {
    currentGoalSteps: {$splice:[[action.index , 0, action.step]]
  }
})}

if (action.type === 'SET_SUGGESTED_STEP'){
  // console.log('action.suggestedStep',action.suggestedStep)
  // console.log('action.index suggestedStep',action.index)
  return update(state, {
    currentGoalStepsClone: {$splice:[[action.index , 0, action.suggestedStep]]
  }
  })
}

if (action.type === 'SET_POSITION_INDEX') {
  return update (state, {
    currentGoalStepsClone: {$set: action.stepsArr}
  })
}

if (action.type === 'SET_SUGGESTED_STEP_ID_FROM_SERVER'){
  return update(state, {
    currentGoalStepsClone: {[action.index]: {id: { $set: action.id}}}
  })
}


if (action.type === 'SET_LOGIN_STATUS'){
  return update( state, {
    loggedIn: {$set: true}
  })
}

if (action.type ==='SET_TARGET_USER_ID'){
  return update( state, {
    targetUserID: {$set: action.targetUserID}
  })
}

if (action.type === 'SET_TARGET_USER_NAME') {
  return update( state, {
    targetUserName: {$set: action.targetUserName}
  })
}

if (action.type === 'SET_CURRENT_USERNAME'){
  return update( state, {
    loggedInUserName: {$set:action.userName}
  })
}

if (action.type === 'REMOVE_STEP'){
  return update( state, {
  currentGoalSteps: {$splice: [[action.index, 1]]}
  })
}

if (action.type === 'SUGGEST_REMOVE_STEP') {
    console.log(action.index)
  return update( state, {
  currentGoalStepsClone:
{$splice: [[action.index, 1]]}
  })
}

if(action.type === 'EDIT_STEP') {
  return update( state, {
  currentGoalSteps: {[action.index]: {$set:action.editedStep }}
  })
}

if(action.type === 'SUGGEST_EDIT_STEP') {
  return update( state, {
  currentGoalStepsClone: {[action.index]: {$set:action.editedStep }}
  })
}

if (action.type === 'MOVE_STEP' ){
  return update( state, {
    currentGoalSteps: {$set:action.newStepOrder}
  })
}

if (action.type === 'MOVE_STEP_ON_CLONE' ){
  return update( state, {
    currentGoalStepsClone: {$set:action.newStepOrder}
  })
}

if (action.type === 'CLONE_CURRENT_STEPS_FOR_SUGGESTIONS') {
  // console.log(action.flatSteps)
  return update (state, {
    currentGoalStepsClone: {$set: action.flatSteps}
  })
}

if (action.type === 'SET_CLONED_STEPS') {
  return update(state, {
    currentGoalStepsClone: {$set: action.flatSteps}
  })
}

// if (action.type === 'MERGE_STEPS_CLONE') {
//   return update( state, {
//
//   })
// }

return state;
}
