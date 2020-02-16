import * as ActionTypes from './ActionTypes';


/**
 * Reducer function for counters
 * @param {*} state 
 * @param {*} action 
 */
export const Counters = (
    state = { errMess: null, counters: {} }, action
) => {
    switch (action.type) {
        case ActionTypes.ADD_COUNTERS:  // case for updating the counters data
            return { ...state, errMess: null, counters: action.payload }
        case ActionTypes.COUNTERS_FAILED:  // case fetching data failed
            return { ...state, errMess: action.payload };
        default:  // default case
            return state;
    }
}