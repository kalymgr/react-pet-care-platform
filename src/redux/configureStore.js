
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialLostPetForm} from './forms';
import { LostPetsInfo } from './lostOrFoundPets';
import { Counters } from './counters';


/**
 * Function that configures the redux store
 * It combines the reducers and it applies middleware
 * @returns store The redux store
 */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                lostpetsinfo: LostPetsInfo,
                counters: Counters,
                ...createForms({
                    submitLostPetsInfo: InitialLostPetForm  // the property is also the model name used when declaring the form
                })

            }
        ),
        applyMiddleware(thunk, logger)
    )

    return store;

}