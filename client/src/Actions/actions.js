import 'isomorphic-fetch';

export const SET_GOAL = 'SET_GOAL';
export const setGoal = goal => ({
  type: SET_GOAL,
  goal
})

export const SET_GOALDOC_ID = 'SET_GOALDOC_ID';
export const setGoalDocID = goalDocID => ({
  type: SET_GOALDOC_ID,
  goalDocID
});

export const SET_STEP = 'SET_STEP';
export const setStep = step =>{
let stepArr = [step]
console.log('STEP ARR', stepArr)
return ( {
  type: SET_STEP,
  step: stepArr
})};

export const SET_GOALDOC = 'SET_GOALDOC'
export const setGoalDoc = goalDoc => {
const {goal, id, steps} = goalDoc
const flatSteps = steps.map(step => step.step)
const flatGoalDoc = { goal,id, flatSteps }
return  {
  type: SET_GOALDOC,
  flatGoalDoc
}};

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
