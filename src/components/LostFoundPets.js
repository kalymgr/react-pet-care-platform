import React, { Component } from 'react';
import { Media, Breadcrumb, Input, BreadcrumbItem, Button, Row, Col, Label, ModalHeader, Modal, ModalBody, CardImg, CardImgOverlay, Card, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, Form, Errors, Field, controls} from 'react-redux-form';
import {Form as ReactstrapForm} from 'reactstrap';  // use alias so as not to conflict with form from react-redux-form
import * as formValidators from './formValidation';
import { PetSpeciesSelectBox } from './petParamComponents';
import { Loading } from './LoadingComponent';
import { Pagination } from './PaginationComponent';
import { PetList } from './PetInfoComponent';

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

    /**
     * Method when a new lost/found pet info is submitted
     * @param {*} values 
     */
    handleSubmit(values)  {
        // save the data in the redux store
        this.props.postSubmitLostPetsInfo(values);

        // reset the form after submitting
        this.props.resetSubmitLostPetsInfo();  
        // reset the value of the petPhoto file input
        document.getElementById("petPhoto").value = ""
    }

    /**
     * Method called when the search reset button is pressed
     */
    handleResetSubmit(event) {
        // prevent default submit behavior
        event.preventDefault();
        // fetch search results
        this.props.fetchLostPetsInfo(1);
    }

    /**
     * Method called when a search is made
     * @param {*} values the search form values
     */
    handleSearchSubmit(event) {
        // prevent default submit behavior
        event.preventDefault();
        // construct the fetch url
        var searchUrl = this.createSearchUrl();
        // fetch search results
        this.props.fetchLostPetsInfo(1, searchUrl);
    }

    /**
     * Method that creates and returns the fetch url for searching, provided the values
     */
    createSearchUrl() {
        // get form values
        var  colors = document.getElementById("colors_search").value;
        var area = document.getElementById("area_search").value;
        var petSpecies = document.getElementById("petSpecies_search").value;

        // construct search url
        var searchUrl = "";
        if (colors!="")
            searchUrl = searchUrl + "colors_like=" + colors + "&";
        if (area!="")
            searchUrl = searchUrl + "area_like=" + area + "&";
        if (petSpecies!="")
            searchUrl = searchUrl + "species=" + petSpecies;

        return searchUrl;

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
                    <div className="row">
                        <ReactstrapForm className="col-md-10 mt-2 mb-2" 
                        onSubmit= {(event) => this.handleSearchSubmit(event)} >
                            <div className="row">
                                <div className="col-md-4">
                                    <Input type="text" className="form-control" 
                                    name = "area_search" defaultValue="" id="area_search" placeholder="Area ..."/>
                                </div>
                                <div className="col-md-3">
                                    <Input type="text" className="form-control" id="colors_search"
                                    name = "colors_search" defaultValue="" placeholder="Colors ..."/>
                                </div>
                                <div className="col-md-3">
                                    <PetSpeciesSelectBox elementId="petSpecies_search" />
                                </div>
                                <div className="col-md-2">
                                    <Button type="submit" value="search" name="search" color="primary">
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </ReactstrapForm>
                        <ReactstrapForm className="col-md-2 mt-2 mb-2" 
                        onSubmit= {(event) => this.handleResetSubmit(event)} >
                            <div className="row">
                                <div className="col-md-12">
                                <Button type="submit" value="reset" name="reset" color="secondary">
                                    Reset
                                </Button>
                                </div>
                            </div>
                        </ReactstrapForm>
                    </div>
                        
                       
                    
                    <Modal className="modal-lg" isOpen = {this.state.isPetModalOpen} toggle = {this.togglePetModal}>
                        <ModalHeader toggle = {this.togglePetModal}>
                            Submit info about lost/found pet
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
                                        <PetSpeciesSelectBox formModel=".species" elementId="petSpecies" />
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
    
                    <PetList 
                        petsInfo={this.props.lostPetsInfo.lostPetsInfo} 
                        petURL = {'/lostfoundpets/'}
                    />
                    <Pagination 
                        getDataPage = {this.props.fetchLostPetsInfo}
                        pageNumber = {this.props.pageNumber}
                        lastPageNumber = {this.props.lastPageNumber}
                    />
                </div>
                
            )
        }
        
    }

}


export default LostFound;