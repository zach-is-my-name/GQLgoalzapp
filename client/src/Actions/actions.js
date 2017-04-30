import 'isomorphic-fetch';

export const SET_GOAL = 'SET_GOAL';
export const setGoal = goal => ({
  type: SET_GOAL,
  goal
});
