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
        ...lostPetsInfo, date: Date.now()
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
        // alert('Info about lost/found pet saved in our database\n' + JSON.stringify(response));
        dispatch(addLostPet(response));  // update the redux store
    })
    .catch (error => {
        alert('Info about the pet could not be saved in our database\n' + error.message);
    })
}


/**
 * Function that fetches the lost and found pets data from the json server. It updates the redux store
 * By default, it fetches the first page of data (first 10 results)
 * @param pageNumber The page of results fetched
 */
export const fetchLostPetsInfo= (pageNumber = 1, extraURLParams=null) => (dispatch) => {
    // show loading till data is fetched
    dispatch(lostPetsInfoLoading(true));
    let lastPageNumber = 1;  // initialize last page number

    // construct the fetch url
    let fetchUrl = baseUrl + 'lostpetsinfo' + '?_page=' + pageNumber + '&';
    if (extraURLParams)  // if there are extra url params, add them to the url
        fetchUrl = fetchUrl  + extraURLParams;

    // get the lost pets info from the json server
    return fetch(fetchUrl)
        .then(response => {
            if (response.ok) {  //  server responded ok 
                lastPageNumber =  getLastPageNumberFromLinkHeader(response);  // set the last page number
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
        .then(lostPetsInfo => dispatch(addLostPetsInfo(lostPetsInfo, pageNumber, lastPageNumber)))  // update the redux store
        .catch(error => dispatch(lostPetsInfoFailed(error.message)));
}


/**
 * Function that takes the fetch response object and extracts the content of the link header
 * @param response the fetch Response object
 * @returns result the link header content (null if the link header does not exist)
 */
const getResponseLinkHeader = (response) => {
    let resHeaders = [...response.headers];  // spread the response headers in an array
    let result = null;
    for (let i=0; i<resHeaders.length;i++) {  // search for the link header
        // console.log(resHeaders[i][0]);
        if (resHeaders[i][0] == "link")
            result = resHeaders[i][1];  // set the link header content as the result
    }
    return result;
}

/**
 * Function that get the number of the last page, from the link header response
 * @param {*} response the response object
 * @returns the number of the last page of data
 */
const getLastPageNumberFromLinkHeader = (response) => {
    // get the link header
    let linkHeader = getResponseLinkHeader(response);
    // get the page number from the link header
    
    let pageNo = 1;  // initialize page number value
    if (linkHeader != "") {  // if there is a link header
        let linksList = linkHeader.split(',');
        let lastPageLink = linksList[linksList.length-1].split(';')[0];
        let pageParameter = lastPageLink.split('?')[1].trim();
        pageNo = pageParameter.split('=')[1].substr(0,1);
    }
    

    return pageNo;
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
 * @param pageNumber the number of page of data fetched from server
 * @param lastPageNumber the number of the last page of data from the server
 */
export const addLostPetsInfo = (lostPetsInfo, pageNumber, lastPageNumber) => ({
    type: ActionTypes.ADD_LOSTPETSINFO,
    payload: {
        lostPetsInfo, pageNumber, lastPageNumber
    }
})


/**
 * Function for adding a lost pet to the lost pet list
 * @param {*} lostPet 
 */
export const addLostPet = (lostPet) => ({
    type: ActionTypes.ADD_LOSTPET,
    payload: lostPet
})

export const postSubmitPetForAdoptionInfo = (petForAdoptionInfo) => (dispatch) => {
    // add to the object the date it is inserted in the json db
    petForAdoptionInfo = Object.assign({}, {
        ...petForAdoptionInfo, date: Date.now()
    });

    // add the path to the object photo
    if (petForAdoptionInfo.photo) {  // case there is a photo
        var petPhoto='/assets/images/petsforadoption' + petForAdoptionInfo.photo[0].name;
        petForAdoptionInfo = Object.assign({}, {...petForAdoptionInfo, photo: petPhoto});
    }

    // send the data to the json server
    return fetch(baseUrl + 'petsforadoption', {
        method: 'POST',
        body: JSON.stringify(petForAdoptionInfo),
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
        dispatch(addPetForAdoption(response));  // update the redux store
    })
    .catch (error => {
        alert('Info about the pet could not be saved in our database\n' + error.message);
    })
}

/**
 * Function for adding a pet for adoption to the list of pets
 */
export const addPetForAdoption = (petForAdoption) => ({
    type: ActionTypes.ADD_PETFORADOPTION,
    payload: petForAdoption
})

