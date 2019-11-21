'use strict';

import {List} from 'immutable';
import {combineReducers} from 'redux';
import * as stateOps from './stateOperations';
import * as ActionTypes from './types';

const appData = (state = stateOps.INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_COUNTER:
      return stateOps.incrementCounter(state, action.data);

    case ActionTypes.DECREMENT_COUNTER:
      return stateOps.decrementCounter(state, action.data);
    case ActionTypes.SAVE_ITEM:
      return stateOps.saveItem(state, action.data);

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  appData,
});
export default rootReducer;
