import React from 'react';
import { Loading } from './LoadingComponent';
import { Breadcrumb, BreadcrumbItem, CardImg, CardTitle, CardText } from 'reactstrap';
import {Link} from "react-router-dom";
import { baseUrl } from '../shared/baseUrl';

  

export const PetDetails = (props) => {

    let petId = parseInt(props.match.params.petId);  // get the pet id from the url params

    if (props.lostPetsInfo.isLoading) {  // case data still loading
        return ( <Loading /> )
    }
    else {  // case data done loading
        
        // get the specific pet
        let pet = props.lostPetsInfo.lostPetsInfo.filter((pet => pet.id===petId))[0];

        // return the pet card
        return (
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem>
                    <Link to="/lostfoundpets">Lost/Found Pets</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {pet.contactName}
                    </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Pet owner: {pet.contactName}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    {(() => {
                        if (pet.photo) {
                            return <CardImg top src={baseUrl + pet.photo} alt="pet.contactName" />
                        }
                    })()}
                    
                    <CardTitle>{pet.name}</CardTitle>
                    <CardText className="justify-content-center">
                        <div>Species: {pet.species}</div>
                        <div>Colors: {pet.colors}</div>
                        <div>Area: {pet.area}</div>
                        <div>More info: {pet.moreInfo}</div>
                           
                    </CardText>
                    </div>
                    
                </div>
            </div>
        )
    }
    
}