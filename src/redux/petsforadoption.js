import * as ActionTypes from './ActionTypes';


/**
 * Reducer function for pets for adoption
 * @param {*} state 
 * @param {*} action 
 */
export const PetsForAdoption = (
    state = { isLoading: true, errMess: null, petsForAdoption: [], pageNumber: 1, lastPageNumber: 1}, action
) => {
    switch (action.type) {
        case ActionTypes.ADD_PETFORADOPTION:
            var petForAdoption = action.payload;
            return {...state, isLoading: false, errMess: null, petsForAdoption: state.petsForAdoption.concat(petForAdoption)}
        default: 
            return state;
    }
}