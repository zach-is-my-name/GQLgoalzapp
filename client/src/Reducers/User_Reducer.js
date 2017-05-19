/* eslint-disable */
import update from 'immutability-helper';
import * as actions from '../Actions/actions';
import {store} from '../store';

const initialState = {
  currentUser: '',
  currentUserID: '',
  ownGoals: [],
  // Object ID^^
}

export const userReducer = (state = initialState, action) => {

if (action.type === 'SET_USERDOC_ID') {
  return update(state, {
    currentUserID: {$set: action.userDocID},
  })
}

if (action.type === 'SET_USERDOC') {
  // console.log(action.userDoc)
  return update(state, {
    currentUser: {$set:action.userDoc.userName},
    currentUserID: {$set:action.userDoc.id},
  })
}

return state;
}
