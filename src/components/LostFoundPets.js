import React, { Component } from 'react';
import { Media, Breadcrumb, Input, BreadcrumbItem, Button, Row, Col, Label, ModalHeader, Modal, ModalBody, CardImg, CardImgOverlay, Card, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, Form, Errors, Field, controls} from 'react-redux-form';
import * as formValidators from './formValidation';
import { PetSpeciesSelectBox } from './petParamComponents';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { Pagination } from './PaginationComponent';


 // Get the validators needed for the form
var required = formValidators.required;
var minLength = formValidators.minLength;
var maxLength = formValidators.maxLength;
var validEmail = formValidators.validEmail;
var isNumber = formValidators.isNumber;
var greaterOrEqualTo = formValidators.greaterOrEqualTo;

// get the component that shows the errors
var myFormErrors  = formValidators.myFormErrors;


/**
 * Functional component for showing a pet info
 */
function PetInfo({pet}) {
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
                <Media heading>Contact name: {pet.contactName}</Media>
                <p>Species: {pet.species}</p>
                <p>Colors: {pet.colors}</p>
                <p>Date: {new Date(pet.date).toLocaleDateString('el-GR')}</p>
            </Media>
        </Media>
    )
}


/**
 * Functional component that shows a list of lost/found pets
 * @param {*} props 
 */
const PetList = (props) => {
    const petList = props.lostPetsInfo.map((pet) => {
        return (
            <div key={pet.id} className="col-12 col-md-12 m-1">
                <PetInfo pet={pet} />
            </div>
        )
    });
    return (
        <div className="row">{petList}</div>
    )
}


/**
 * Component for the lost and found pets page
 */
class LostFound extends Component {

    constructor (props) {
        super(props);

        this.togglePetModal = this.togglePetModal.bind(this);

        this.state = {
            isPetModalOpen: false
        }

    }

    handleSubmit(values)  {
        console.log('handleSubmit called');

        // save the data in the redux store
        this.props.postSubmitLostPetsInfo(values);

        // reset the form after submitting
        this.props.resetSubmitLostPetsInfo();  
        // reset the value of the petPhoto file input
        document.getElementById("petPhoto").value = ""
    }

    /**
     * Toggles the pet submit modal window
     */
    togglePetModal() {
        this.setState({
            isPetModalOpen: !this.state.isPetModalOpen
        })
    }

    render() {
        if (this.props.lostPetsInfo.isLoading) {  // case the data are still being fetched
            return <Loading />
        }
        else if (this.props.lostPetsInfo.errMess) {
            return (
                <div className = "container">
                    <div className = "row"><div className="col-12">{this.props.lostPetsInfo.errMess}</div></div>
                </div>
            )
        }
        else {
            return (
                <div className = "container">
                    <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Lost and found pets
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>Lost and Found Pets</h3>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-12">
                            <Button outline onClick = {this.togglePetModal}>
                                <span className = "fa fa-pencil fa-lg"></span>
                                Submit lost/found pet
                            </Button>
                        </div>
                    </div>
                    <Modal className="modal-lg" isOpen = {this.state.isPetModalOpen} toggle = {this.togglePetModal}>
                        <ModalHeader toggle = {this.togglePetModal}>
                            Submit pet info
                        </ModalHeader>
                        <ModalBody>
                            <Form model="submitLostPetsInfo" onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group align-items-center">
                                    
                                    <Col sm={{size:1, offset: 2}}>
                                    <Control.radio id="petLost" model=".petFoundOrLost" name="petFoundOrLost" className="form-control" value="petLost" />
                                    </Col>
                                    <Label sm={2} for="petLost" className="mb-0">Lost my pet!</Label>
                                    
                                    <Col sm={1}>
                                    <Control.radio id="petFound" model=".petFoundOrLost" name="petFoundOrLost" className="form-control" value="petFound" />
                                    </Col>
                                    <Label for="petFound" className="mb-0">Found a pet!</Label>
                                </Row>
                                <Row className="form-group">
                                    <Label for="contactName" sm={2}>Contact name</Label>
                                    <Col sm={4}>
                                        <Control.text  model=".contactName" id="contactName" name="contactName" placeholder="Contact name" className="form-control" 
                                            validators = {{
                                                required, minLength: minLength(3), maxLength: maxLength(40)
                                            }}
                                        />
                                        {myFormErrors(
                                            ".contactName",
                                                {
                                                    required: 'Required. ',
                                                    minLength: 'Minimum length of 3 characters. ',
                                                    maxLength: 'Maximum length of 40 characters. '
                                                }
                                         )}
                                        
                                    </Col>
                                    <Label for="email" sm={2}>Email</Label>
                                    <Col sm={4}>
                                        <Control.text model=".email" id="email" name="email" placeholder="Email" className="form-control" 
                                            validators = {{
                                                validEmail, required
                                            }}
                                        />
                                        {myFormErrors(
                                            ".email",
                                                {
                                                    required: 'Required. ',
                                                    validEmail: 'Email not valid'
                                                }
                                         )}
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="petName" sm={2}>Pet name</Label>
                                    <Col sm={4}>
                                        <Control.text model=".petName" id="petName" name="petName" placeholder="Pet name" className="form-control"
                                            validators = {{
                                                required, minLength: minLength(3), maxLength: maxLength(20)
                                            }}
                                        />
                                        {myFormErrors(
                                            ".petName",
                                                {
                                                    required: 'Required. ',
                                                    minLength: 'Minimum length of 3 characters. ',
                                                    maxLength: 'Maximum length of 20 characters. '
                                                }
                                         )}
                                        
                                    </Col>
                                    <Label for="species" sm={2}>Species</Label>
                                    <Col sm={3}>
                                        <PetSpeciesSelectBox formModel=".species" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="colors" sm={2}>Colors</Label>
                                    <Col sm={4}>
                                        <Control.text model=".colors" id="colors" name="colors" className="form-control" placeholder="Colors" 
                                            validators = {{
                                                required, minLength: minLength(3), maxLength: maxLength(40)
                                            }}
                                        />
                                        {myFormErrors(
                                            ".colors",
                                                {
                                                    required: 'Required. ',
                                                    minLength: 'Minimum length of 3 characters. ',
                                                    maxLength: 'Maximum length of 40 characters. '
                                                }
                                         )}
                                    </Col>
                                    <Label for="age" sm={2}>Age</Label>
                                    <Col sm={3}>
                                    <Control.text model=".age" id="age" name="age" className="form-control" placeholder="Age" 
                                        validators = {{
                                            isNumber, greaterOrEqualTo: greaterOrEqualTo(1)
                                        }}
                                    />
                                    {myFormErrors(
                                            ".age",
                                                {
                                                    isNumber: 'The field must contain a number. ',
                                                    greaterOrEqualTo: 'Must be greater or equal to 1. '
                                                }
                                         )}
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="area" sm={2}>Area found</Label>
                                    <Col sm={10}>
                                        <Control.text model=".area" id="area" name="area" className="form-control" placeholder="Area found" 
                                            validators = {{
                                                maxLength: maxLength(50)
                                            }}
                                        />
                                        {myFormErrors(
                                            ".area",
                                                {
                                                    maxLength: 'Maximum length of 50 characters. '
                                                }
                                         )}
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="moreInfo" sm={2}>More info</Label>
                                    <Col sm={10}>
                                        <Control.textarea model=".moreInfo" id="moreInfo" name="moreInfo" className="form-control" placeholder="More info..." rows="8" 
                                            validators = {{
                                                maxLength: maxLength(250)
                                            }}
                                        />
                                        {myFormErrors(
                                            ".moreInfo",
                                                {
                                                    maxLength: 'Maximum length of 250 characters. '
                                                }
                                         )}
                                    </Col>
                                </Row>
                                <Row className="form-group align-items-center">
                                    <Label for="photo" sm={2}>Photo</Label>
                                    <Col sm={8}>
                                        <Control.input type = "file" model=".photo" name="photo" id="petPhoto" accept="image/jpeg, image/png" 
                                            value={null}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Submit info
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
    
                    <PetList lostPetsInfo={this.props.lostPetsInfo.lostPetsInfo} />
                    <Pagination 
                        getDataPage = {this.props.fetchLostPetsInfo}
                        pageNumber = {this.props.pageNumber}
                    />
                </div>
                
            )
        }
        
    }

}


export default LostFound;