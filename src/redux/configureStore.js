
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialLostPetForm} from './forms';
import { LostOrFoundPets } from './lostOrFoundPets';


/**
 * Function that configures the redux store
 * It combines the reducers and it applies middleware
 * @returns store The redux store
 */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                // lostOrFoundPets: LostOrFoundPets,
                ...createForms({
                    submitLostPetInfo: InitialLostPetForm
                })

            }
        ),
        applyMiddleware(thunk, logger)
    )

    return store;

}