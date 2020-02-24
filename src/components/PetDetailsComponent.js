import React from 'react';
import { Loading } from './LoadingComponent';
import { Breadcrumb, BreadcrumbItem, CardImg, CardTitle, CardText } from 'reactstrap';
import {Link} from "react-router-dom";
import { baseUrl } from '../shared/baseUrl';

  

export const PetDetails = (props) => {

    let petId = parseInt(props.match.params.petId);  // get the pet id from the url params

    if (props.pets.isLoading) {  // case data still loading
        return ( <Loading /> )
    }
    else {  // case data done loading

        // get the path of the parent url
        var path = props.match.url;
        var arr = path.split('/');
        var parentURL = '/'+arr[1]+'/';
        
        
        // get the specific pet
        if (props.pets.lostPetsInfo){  // case showing info about a lost/found pet
            var pet = props.pets.lostPetsInfo.filter((pet => pet.id===petId))[0];
            var breacrumbText = "Lost/Found Pets";
        }
        else if (props.pets.petsForAdoption) {  // case showing info about a pet for adoption
            var pet = props.pets.petsForAdoption.filter((pet => pet.id===petId))[0];
            var breacrumbText = "Pets for adoption";
        }
        // return the pet card
        return (
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem>
            <Link to={parentURL}>{breacrumbText}</Link>
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
                            return <CardImg top src={pet.photo} alt="pet.contactName" />
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