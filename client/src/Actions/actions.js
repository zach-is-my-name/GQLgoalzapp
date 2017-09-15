/* eslint-disable */
import 'isomorphic-fetch';

export const SET_USERID ='SET_USERID'
export const setUserId = id => ({
  type: SET_USERID,
  id
})

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
export const setStep = (step,index) => {
// console.log('STEP ARR', stepArr)
return ( {
  type: SET_STEP,
  step,
  index: [index] + 1
})

};

//where is the index being passed in SuggestStep.js?
export const SET_SUGGESTED_STEP = 'SET_SUGGESTED_STEP'
export const setSuggestedStep = (suggestedStep,index,id) => {
  const stepObj = {step: suggestedStep, suggestedStep: true, id}
  return ( {
  type: SET_SUGGESTED_STEP,
  suggestedStep: stepObj,
  index: [index] + 1
})
}

export const SET_GOALDOC = 'SET_GOALDOC'
export const setGoalDoc = goalDoc => {
const {goal, id, steps, suggestedSteps} = goalDoc
let  flatSteps = steps.map(step => step.step)
let flatSuggestedSteps = suggestedSteps.map(suggestedStep => suggestedStep.suggestedStep )
const flatGoalDoc = { goal, id, flatSteps,flatSuggestedSteps}
return  {
  type: SET_GOALDOC,
  flatGoalDoc
}};

export const SET_USERDOC_ID = 'SET_USERDOC_ID';
export const setUserDocID = userDocID => ({
  type: SET_USERDOC_ID,
  userDocID
})

export const SET_CURRENT_USERNAME = 'SET_CURRENT_USERNAME';
export const setCurrentUserName = userName => ({
  type: SET_CURRENT_USERNAME,
  userName
})

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
export const setLoginStatus = () => ({
  type: SET_LOGIN_STATUS,
})

export const SET_TARGET_USER_ID = 'SET_TARGET_USER_ID'
export const setTargetUserID = targetUserID => ({
  type: SET_TARGET_USER_ID,
  targetUserID
})

export const SET_TARGET_USER_NAME = 'SET_TARGET_USER_NAME'
export const setTargetUserName = targetUserName => ({
  type: SET_TARGET_USER_NAME,
  targetUserName
})
export const REMOVE_STEP = 'REMOVE_STEP'
export const removeStep = index => ({
  type: REMOVE_STEP,
  index
})

export const SUGGEST_REMOVE_STEP = 'SUGGEST_REMOVE_STEP'
export const suggestRemoveStep = index => {
  // const indexArr = [index]
return   {
  type: SUGGEST_REMOVE_STEP,
  index
}}
// export const TOGGLE_SUGGEST_STEP_INPUT = 'TOGGLE_SUGGEST_STEP_INPUT'
// export const toggleSuggestStepInput = state => ({
//   type:TOGGLE_SUGGEST_STEP_INPUT,
//   state
// }
// )

export const EDIT_STEP = 'EDIT_STEP'
export const editStep = (index, editedStep) => {
  return  {
    type: EDIT_STEP,
    index,
    editedStep
  }}

export const SUGGEST_EDIT_STEP = 'SUGGEST_EDIT_STEP'
export const suggestEditStep = (index, editedStep, id) => {
  let stepKey =  [index]["step"]
  let stepObj = {step: editedStep, suggestedStep: true, id}
  return  {
    type: SUGGEST_EDIT_STEP,
    index,
    editedStep: stepObj,
    stepKey
  }}

export const MOVE_STEP = 'MOVE_STEP'
export const moveStep = (newStepOrder) => {
  return {
    type: MOVE_STEP,
    newStepOrder
  }
}

export const MOVE_STEP_ON_CLONE = 'MOVE_STEP_ON_CLONE'
export const moveStepOnClone = (newStepOrder) => {
  return {
    type: MOVE_STEP_ON_CLONE,
    newStepOrder
  }
}

export const CLONE_CURRENT_STEPS_TO_SUGGESTED_STEPS = 'CLONE_CURRENT_STEPS_TO_SUGGESTED_STEPS'
export const cloneCurrentStepsToSuggestedSteps = (steps) => {
    // console.log(steps)
    let flatSteps = steps.map(step => ({step:step.step, suggestedStep: false }))
    // console.log('actions/flatSteps', flatSteps)
    let flatStepsObj = {step: flatSteps, suggestedStep:false}
  return {
    type: CLONE_CURRENT_STEPS_TO_SUGGESTED_STEPS,
    flatSteps: flatSteps
  }
}

// export const MERGE_STEPS_CLONE = 'MERGE_STEPS_CLONE'
// export const mergeStepsClone = () => {
//   return {
//     type: MERGE_STEPS_CLONE
//   }
// }
