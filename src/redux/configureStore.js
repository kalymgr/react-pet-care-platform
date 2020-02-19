
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialLostPetForm} from './forms';
import { LostPetsInfo } from './lostOrFoundPets';


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
                ...createForms({  // reducer for forms
                    submitLostPetsInfo: InitialLostPetForm  // the property is also the model name used when declaring the form
                })

            }
        ),
        applyMiddleware(thunk, logger)
    )

    return store;

}