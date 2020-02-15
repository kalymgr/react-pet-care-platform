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
        case ActionTypes.ADD_LOSTPETSINFO :  // add a list of lost pets
            return { ...state, isLoading: false, errMess: null, lostPetsInfo: action.payload }
        case ActionTypes.LOSTPETSINFO_LOADING:  // list of lost pets loading
            return { ...state, isLoading: true, errMess: null, lostPetsInfo: [] }
        case ActionTypes.LOSTPETSINFO_FAILED:  // list of lost pets failed
            return { ...state, isLoading: false, errMess: action.payload }
        case ActionTypes.ADD_LOSTPET: // case of adding a lost pet
            var lostPet = action.payload;
            return { ...state, isLoading: false, errMess: null, lostPetsInfo: state.lostPetsInfo.concat(lostPet) }
        default:
            return state;
    }
}