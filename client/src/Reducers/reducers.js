import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import {store} from '../store';


const initialState = {
  currentGoal: '',
}

export const goalReducer = (state = initialState, action) => {
if (action.type === 'SET_GOAL') {
  console.log(action.goal)
  return update(state, {
    currentGoal: {$set:action.goal}
  })
}
return state;
}
