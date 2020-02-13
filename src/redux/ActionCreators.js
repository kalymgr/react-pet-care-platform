import { baseUrl } from '../shared/baseUrl';



/**
 * Function that sends to the json server the lost pet info, in order to be stored in the json file.
 * It also updates the redux store
 * @param {*} lostPetInfo 
 */
export const postSubmitLostPetInfo = (lostPetInfo) => (dispatch) => {
    // add to the object the date it is inserted in the json db
    lostPetInfo = Object.assign({}, {
        ...lostPetInfo, date: new Date().toISOString()
    });

    // send the data to the json server
    return fetch(baseUrl + 'lostpetinfo', {
        method: 'POST',
        body: JSON.stringify(lostPetInfo),
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