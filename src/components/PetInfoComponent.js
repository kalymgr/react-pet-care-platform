import React, { Component } from 'react';
import { Media, Breadcrumb, Input, BreadcrumbItem, Button, Row, Col, Label, ModalHeader, Modal, ModalBody, CardImg, CardImgOverlay, Card, CardTitle } from "reactstrap";
import {baseUrl} from '../shared/baseUrl';
import { Link } from 'react-router-dom';


/**
 * Functional component that shows a list of lost/found pets
 * @param {*} props 
 */
export const PetList = (props) => {
    const petList = props.petsInfo.map((pet) => {
        return (
            <div key={pet.id} className="col-12 col-md-12 m-1">
                <PetInfo pet={pet} petURL={props.petURL} />
            </div>
        )
    });
    return (
        <div className="row">{petList}</div>
    )
}

/**
 * Functional component for showing a pet info
 */
export const PetInfo = ({pet, petURL}) => {
    return (
        <Media key={pet.id}>
            {
                (() => {
                    if (pet.photo) {
                        return (<Media left><img with="100%" src = {baseUrl + pet.photo} alt={pet.name} /></Media>)
                    }
                    else {
                        return (<Media left><img with="100%" src = {'assets/pet_photo_placeholder.jpg'} alt={pet.name} /></Media>)
                    }
                }
                )()
            }
            
            <Media body>
                <Link to={`${petURL}${pet.id}`}>
                <Media heading>Contact name: {pet.contactName}</Media>
                </Link>
                
                <p>Species: {pet.species}</p>
                <p>Colors: {pet.colors}</p>
                <p>Date: {new Date(pet.date).toLocaleDateString('el-GR')}</p>
            </Media>
        </Media>
    )
}
