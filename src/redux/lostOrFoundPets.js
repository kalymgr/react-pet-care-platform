import { actionTypes } from "react-redux-form";
import * as ActionTypes from './ActionTypes';


/**
 * Reducer function for lost or found pets
 * @param {*} state 
 * @param {*} action 
 */
export const LostPetsInfo = (
    state = { isLoading: true, errMess: null, lostPetsInfo: []}, action
) => {
    switch (action.type) {
        case ActionTypes.ADD_LOSTPETSINFO :
            return { ...state, isLoading: false, errMess: null, lostPetsInfo: action.payload }
        case ActionTypes.LOSTPETSINFO_LOADING:
            return { ...state, isLoading: true, errMess: null, lostPetsInfo: [] }
        case ActionTypes.LOSTPETSINFO_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }
        default:
            return state;
    }
}