import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

  

export const PetDetails = (props) => {

    let petId = props.match.params.petId;  // get the pet id from the url params

    return (
        <div>
            Petdetails
        </div>
    )
}