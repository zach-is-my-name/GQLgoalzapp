import 'isomorphic-fetch';

export const SET_GOALDOC_ID = 'SET_GOALDOC_ID';
export const setGoalID = goalDocID => ({
  type: SET_GOALDOC_ID,
  goalDocID
});

// export const SET_STEP = 'SET_STEP';
// export const setSteps = goalDoc => ({
//   type: SET_STEP,
//   goalDoc
// });

export const SET_GOAL_DOC = 'SET_GOAL_DOC'
export const setGoalDoc = goaldoc => ({

  type: SET_GOAL_DOC,
  goaldoc
});
