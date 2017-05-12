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
export const setGoalDoc = goaldoc => ({

  type: SET_GOALDOC,
  goaldoc
});
