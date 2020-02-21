
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialLostPetForm, InitialPetsForAdoptionForm} from './forms';
import { LostPetsInfo } from './lostOrFoundPets';
import {PetsForAdoption} from './petsforadoption';


/**
 * Function that configures the redux store
 * It combines the reducers and it applies middleware
 * @returns store The redux store
 */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                lostpetsinfo: LostPetsInfo,  // reducer for lost/found pets info
                petsforadoption: PetsForAdoption,
                ...createForms({  // reducer for forms
                    submitLostPetsInfo: InitialLostPetForm,  // the property is also the model name used when declaring the form
                    submitPetsforadoption: InitialPetsForAdoptionForm
                })

            }
        ),
        applyMiddleware(thunk, logger)
    )

    return store;

}