/* eslint-disable */
import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import {store} from '../store';


const initialState = {
  currentGoal: '',
  currentGoalID:'',
  currentGoalSteps:[],
  currentGoalOwnerID:'',
}

export const goalReducer = (state = initialState, action) => {

if (action.type === 'SET_USERID') {
  return update(state, {
    currentGoalOwner: {$set: action.id}
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
  })
}

if (action.type === 'SET_STEP') {
  return update(state.goals.currentGoalSteps,
    {$push:action.step},
  )}

return state;
}
