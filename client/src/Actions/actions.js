import 'isomorphic-fetch';

export const SET_GOALDOC_ID = 'SET_GOALDOC_ID';
export const setGoalDocID = goalDocID => ({
  type: SET_GOALDOC_ID,
  goalDocID
});

// export const SET_STEP = 'SET_STEP';
// export const setSteps = goalDoc => ({
//   type: SET_STEP,
//   goalDoc
// });

export const SET_GOALDOC = 'SET_GOALDOC'
export const setGoalDoc = goaldoc => ({

  type: SET_GOALDOC,
  goaldoc
});
