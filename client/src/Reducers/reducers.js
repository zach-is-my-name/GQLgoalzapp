/* eslint-disable */
import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import {store} from '../store';


const initialState = {
  currentGoal: '',
  currentGoalID:'',
  currentGoalSteps:[]
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
    // console.log(action.goaldoc);
    return update (state, {
      currentGoal: {$set:action.goaldoc.goal},
    currentGoalID: {$set:action.goaldoc.id},
    currentGoalSteps: {$set:action.goaldoc.steps},
    })
  }

return state;
}
