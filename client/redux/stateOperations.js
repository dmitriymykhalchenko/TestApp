'use strict';

import {fromJS, List, Map, Set} from 'immutable';

export const INITIAL_STATE = fromJS({
  counter: 0,
  saveItem:[],
});

export function incrementCounter(state, value) {
  let currentCounter = state.get('counter');
  let nextCounter = currentCounter + 1;
  let newState = state.set('counter', nextCounter);

  return newState;
}

export function decrementCounter(state, value) {
  let currentCounter = state.get('counter');
  let nextCounter = currentCounter - 1;
  let newState = state.set('counter', nextCounter);

  return newState;
}
export function saveItem(state, value) {
  let newState = state.set('saveItem', value)
  return newState;
}
