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

if (action.type === 'SET_GOALDOC_ID') {
  return update(state, {
    currentGoalID: {$set:action.goalDocID},
  })
}
if (action.type === 'SET_STEP') {
  return update(state.goals.currentGoalSteps,
    {$push:action.step},
  )
}

  if (action.type === 'SET_GOALDOC') {
    // console.log(action.goalDoc);
    return update (state, {
      currentGoal: {$set:action.goalDoc.goal},
    currentGoalID: {$set:action.goalDoc.id},
    currentGoalSteps: {$set:action.goalDoc.steps},
    })
  }

return state;
}
