import { baseUrl } from '../shared/baseUrl';
import * as ActionTypes from './ActionTypes';


/**
 * Function that sends to the json server the lost pet info, in order to be stored in the json file.
 * It also updates the redux store
 * @param {*} lostPetsInfo 
 */
export const postSubmitLostPetsInfo = (lostPetsInfo) => (dispatch) => {
    // add to the object the date it is inserted in the json db
    lostPetsInfo = Object.assign({}, {
        ...lostPetsInfo, date: new Date().toISOString()
    });

    // add the path to the object photo
    if (lostPetsInfo.photo)  // if there is a pet photo
    {
        var petPhoto = '/assets/images/lostfoundpets/' + lostPetsInfo.photo[0].name;
        lostPetsInfo = Object.assign({}, {...lostPetsInfo, photo: petPhoto});
    }
    

    // send the data to the json server
    return fetch(baseUrl + 'lostPetsInfo', {
        method: 'POST',
        body: JSON.stringify(lostPetsInfo),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {  // response ok
            return response;
        }
        else { // server responded with error
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {  // server hasn't responded
        throw error;
    })  
    .then(response => response.json())
    .then(response => {
        alert('Info about lost/found pet saved in our database\n' + JSON.stringify(response));
    })
    .catch (error => {
        alert('Info about the pet could not be saved in our database\n' + error.message);
    })
}


/**
 * Function that fetches the lost and found pets data from the json server. It updates the redux store
 */
export const fetchLostPetsInfo= () => (dispatch) => {
    // show loading till data is fetched
    dispatch(lostPetsInfoLoading(true));

    // get the lost pets info from the json server
    return fetch(baseUrl + 'lostpetsinfo')
        .then(response => {
            if (response.ok) {  //  server responded ok
                return response;
            }
            else { // server responded with an error
                var error = new Error('Error ' + response.status +': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {  // case the server hasn't responded
            var errmess = new Error(error.message);
            throw errmess;
        }
        ).then(response => response.json())
        .then(lostPetsInfo => dispatch(addLostPetsInfo(lostPetsInfo)))  // update the redux store
        .catch(error => dispatch(lostPetsInfoFailed(error.message)));
}

/**
 * Function used while loading pets data
 */
export const lostPetsInfoLoading = () => ({
    type: ActionTypes.LOSTPETSINFO_LOADING
})


/**
 * Function for case that fetching of lost found pets data failed
 * @param {*} errmess  the error message
 */
export const lostPetsInfoFailed = (errmess) => ({
    type: ActionTypes.LOSTPETSINFO_FAILED, 
    payload: errmess
})

/**
 * Function for updating the lost pets data in the redux store
 * @param {*} lostPetsInfo 
 */
export const addLostPetsInfo = (lostPetsInfo) => ({
    type: ActionTypes.ADD_LOSTPETSINFO,
    payload: lostPetsInfo
})