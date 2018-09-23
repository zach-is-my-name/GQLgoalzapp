/* eslint-disable */
import {store} from '../store.js'
import 'isomorphic-fetch';

export const SET_USERID = 'SET_USERID'
export const setUserId = id => ({type: SET_USERID, id})

export const SET_GOAL = 'SET_GOAL';
export const setGoal = goal => ({type: SET_GOAL, goal})

export const SET_GOALDOC_ID = 'SET_GOALDOC_ID';
export const setGoalDocID = goalDocID => ({type: SET_GOALDOC_ID, goalDocID});

export const SET_GOALDOC = 'SET_GOALDOC'
export const setGoalDoc = goalDoc => {
  const {goal, id, steps, suggestedSteps, clonedSteps} = goalDoc
  let flatSteps = steps.map((stepObj) => {
  return  ({
    step: stepObj.step,
    positionIndex: stepObj.positionIndex,
    suggestedStep: stepObj.suggestedStep,
    id: stepObj.id
  })})

  let flatClonedSteps = clonedSteps.map(clonedStepObj => {
    return ({
      step: clonedStepObj.step,
      suggestedStep: clonedStepObj.suggestedStep,
      id: clonedStepObj.id,
      positionIndex: clonedStepObj.positionIndex,
      suggester: clonedStepObj.suggester
    })
  })

  const flatGoalDoc = {
    goal,
    id,
    flatSteps,
    flatClonedSteps
  }
  return {type: SET_GOALDOC, flatGoalDoc}
};


export const SET_STEP_ID_FROM_SERVER = 'SET_STEP_ID_FROM_SERVER'
export const setStepIdFromServer = (index, id) =>
  ({type: SET_STEP_ID_FROM_SERVER, index, id})

export function setStepAndPositionIndex(step, index) {
   store.dispatch(setStep(step, index))
   store.dispatch(setStepPositionIndex())
  }
export function unsetStepAndPositionIndex(index) {
  store.dispatch(removeStep(index))
  store.dispatch(setStepPositionIndex())
}
export const SET_STEP = 'SET_STEP';
export const setStep = (step, index, id) => {
  const stepObj = {
    step: step,
    suggestedStep: false,
    id,
    positionIndex: null,
    originalId: id
  }

  const setStepObj = {
    type: SET_STEP,
    stepObj,
    index: index
  }
  return setStepObj
};

export const SET_STEP_POSITION_INDEX = 'SET_STEP_POSITION_INDEX'
export const setStepPositionIndex = () =>  {
return (dispatch, getState) => {
   const newSteps = getState().goals.currentGoalSteps.map((stepObj, index) => { return ({...stepObj, positionIndex: index})
 })
const actionObj = {
  type: SET_STEP_POSITION_INDEX,
  stepsArr: newSteps
}
  return dispatch(actionObj)
}
}

export function setClonedStepAndPositionIndex(step, index) {
  store.dispatch(setSuggestedStep(step, index))
  store.dispatch(setClonedStepPositionIndex())
}

//where is the index being passed in SuggestStep.js?
export const SET_SUGGESTED_STEP = 'SET_SUGGESTED_STEP'
export const setSuggestedStep = (suggestedStep, index, id) => {
  const stepObj = {
    step: suggestedStep,
    suggestedStep: true,
    id,
    positionIndex: null
  }
  const setSuggestedStepObj = {
    type: SET_SUGGESTED_STEP,
    stepObj,
    index
  }
  return setSuggestedStepObj
  // return ({type: SET_SUGGESTED_STEP, suggestedStep: stepObj, index: index})
}

export const SET_CLONED_STEP_POSITION_INDEX ='SET_CLONED_STEP_POSITION_INDEX'
export const setClonedStepPositionIndex = () => {
return  (dispatch, getState) => {
  const newSteps = getState().goals.currentGoalStepsClone.map((stepObj, index) => {return ({...stepObj, positionIndex: index})
})
  const actionObj = {
    type: SET_CLONED_STEP_POSITION_INDEX,
    stepsArr:newSteps
  }
  return dispatch(actionObj)
}
}
export const SET_CLONED_STEP_ID_FROM_SERVER = 'SET_CLONED_STEP_ID_FROM_SERVER'
export const setClonedStepIdFromServer = (index,id) => {
  return {type: SET_CLONED_STEP_ID_FROM_SERVER, index, id }
}

export const SET_USERDOC_ID = 'SET_USERDOC_ID';
export const setUserDocID = userDocID => ({type: SET_USERDOC_ID, userDocID})

export const SET_CURRENT_USERNAME = 'SET_CURRENT_USERNAME';
export const setCurrentUserName = userName => ({type: SET_CURRENT_USERNAME, userName})

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
export const setLoginStatus = () => ({type: SET_LOGIN_STATUS})

export const SET_TARGET_USER_ID = 'SET_TARGET_USER_ID'
export const setTargetUserID = targetUserID => ({type: SET_TARGET_USER_ID, targetUserID})

export const SET_TARGET_USER_NAME = 'SET_TARGET_USER_NAME'
export const setTargetUserName = targetUserName => ({type: SET_TARGET_USER_NAME, targetUserName})

export const SET_ID_TO_REMOVE = 'SET_ID_TO_REMOVE'
export const setIdToRemove = idToRemove => ({type: SET_ID_TO_REMOVE, idToRemove})

export const REMOVE_STEP = 'REMOVE_STEP'
export const removeStep = index => ({type: REMOVE_STEP, index})

export const REMOVE_CLONED_STEP = 'REMOVE_CLONED_STEP'
export const removeClonedStep = index => {
  // const indexArr = [index]
  return {type: REMOVE_CLONED_STEP, index}
}

export const SET_SUGGESTED_TO_FALSE = 'SET_SUGGESTED_TO_FALSE'
export const setSuggestedToFalse = (stepObj, index) => {
    const updatedStepObj = {
      step: stepObj.step,
      suggestedStep: false,
      positionIndex: stepObj.positionIndex,
      suggester: stepObj.suggester,
      id: stepObj.id
    }
}

export const suggestRemoveStep = () => {
  return {type:SUGGEST_REMOVE_STEP}
}

// export const TOGGLE_SUGGEST_STEP_INPUT = 'TOGGLE_SUGGEST_STEP_INPUT'
// export const toggleSuggestStepInput = state => ({
//   type:TOGGLE_SUGGEST_STEP_INPUT,
//   state
// }
// )

export const EDIT_STEP = 'EDIT_STEP'
export const editStep = (index, editedStep) => {
  return {type: EDIT_STEP, index, editedStep}
}

export const SUGGEST_EDIT_STEP = 'SUGGEST_EDIT_STEP'
export const suggestEditStep = (index, editedStep, id) => {
  let stepKey = [index]["step"]
  let stepObj = {
    step: editedStep,
    suggestedStep: true,
    id
  }
  return {type: SUGGEST_EDIT_STEP, index, editedStep: stepObj, stepKey}
}

export const MOVE_STEP = 'MOVE_STEP'
export const moveStep = (newStepOrder) => {
  return {type: MOVE_STEP, newStepOrder}
}

export const MOVE_STEP_ON_CLONE = 'MOVE_STEP_ON_CLONE'
export const moveStepOnClone = (newStepOrder) => {
  return {type: MOVE_STEP_ON_CLONE, newStepOrder}
}

export const CLONE_CURRENT_STEPS = 'CLONE_CURRENT_STEPS'
export const cloneCurrentSteps = (steps) => {
  // console.log('cloneCurrentSteps', steps)
  let flatSteps = steps.map(step =>  ({step: step.step, suggestedStep: false, positionIndex: step.positionIndex, id: null, originalId: step.originalId}))
  // console.log('actions/flatSteps', flatSteps)
  // let flatStepsObj = {step: flatSteps, suggestedStep:false}
  return {type: CLONE_CURRENT_STEPS, flatSteps: flatSteps}
}

export const SET_CLONED_STEPS_FROM_SERVER = 'SET_CLONED_STEPS_FROM_SERVER'
export const setClonedStepsFromServer = clonedSteps => {
    let flatSteps = clonedSteps.map(clonedStepObj => ({step: clonedStepObj.step, suggestedStep: clonedStepObj.suggestedStep, positionIndex: clonedStepObj.positionIndex, originalId: clonedStepObj.originalId,
      suggester: clonedStepObj.suggester.userName,
      id:clonedStepObj.id}))
    return {type: SET_CLONED_STEPS_FROM_SERVER, flatSteps}
}


export const RESOLVE_ACCEPT_STEP ='RESOLVE_ACCEPT_STEP'
export const resolveAcceptStep = () => {
  return {type: RESOLVE_ACCEPT_STEP}
}

// export const MERGE_STEPS_CLONE = 'MERGE_STEPS_CLONE'
// export const mergeStepsClone = () => {
//   return {
//     type: MERGE_STEPS_CLONE
//   }
// }
