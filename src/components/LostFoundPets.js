import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, ModalHeader, Modal, ModalBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, Form, Errors, Field} from 'react-redux-form';

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
                <Modal isOpen = {this.state.isPetModalOpen} toggle = {this.togglePetModal}>
                    <ModalHeader toggle = {this.togglePetModal}>
                        Submit pet info
                    </ModalHeader>
                    <ModalBody>
                        <Form model="submitLostPetInfo" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                            <Control.radio model=".petFoundOrLost" name="petFoundOrLost" className="form-control">
                                    
                            </Control.radio>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            
        )
    }

}


export default LostFound;