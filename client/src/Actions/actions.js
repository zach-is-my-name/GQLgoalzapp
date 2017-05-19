import 'isomorphic-fetch';

export const SET_GOALDOC_ID = 'SET_GOALDOC_ID';
export const setGoalDocID = goalDocID => ({
  type: SET_GOALDOC_ID,
  goalDocID
});

export const SET_STEP = 'SET_STEP';
export const setSteps = step =>{
let stepArr = [step]
console.log('STEP ARR', stepArr)
return ( {
  type: SET_STEP,
  step: stepArr
})};

export const SET_GOALDOC = 'SET_GOALDOC'
export const setGoalDoc = goalDoc => ({

  type: SET_GOALDOC,
  goalDoc
});

export const SET_USERDOC_ID = 'SET_USERDOC_ID';
export const setUserDocID = userDocID => ({
  type: SET_USERDOC_ID,
  userDocID
})

export const SET_USERDOC = 'SET_USERDOC';
export const setUserDoc = userDoc => ({
  type: SET_USERDOC,
  userDoc
})
