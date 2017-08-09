/* eslint-disable */
import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import {store} from '../store';


const initialState = {
  currentGoal: '',
  currentGoalID:'',
  currentGoalSteps:[],
  currentSuggestedSteps:[],
  loggedInUserID:'',
  loggedInUserName:'',
  loggedIn: false,
  targetUser: '',

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
  currentSuggestedSteps: {$set:action.flatGoalDoc.flatSuggestedSteps},
  })
}

if (action.type === 'SET_STEP') {
  console.log(action.step)
  return update(state, {
  currentGoalSteps:  {$push:action.step},
  })
}

if (action.type === 'SET_SUGGESTED_STEP'){
  return update(state, {
    currentSuggestedSteps: {$push:action.suggestedStep},
  })
}

if (action.type === 'SET_LOGIN_STATUS'){
  return update( state, {
    loggedIn: {$set: true}
  })
}

if (action.type ==='SET_TARGET_USER'){
  return update( state, {
    targetUser: {$set: action.targetUser}
  })
}

if (action.type === 'SET_CURRENT_USERNAME'){
  return update( state, {
    loggedInUserName: {$set:action.userName}
  })
}

if (action.type === 'REMOVE_STEP'){
  return update( state, {
  currentGoalSteps: {$splice: [[action.index, action.index + 1]]}
})}

return state;
}
