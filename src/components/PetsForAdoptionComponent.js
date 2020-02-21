import React, { Component } from 'react';
import { Loading } from './LoadingComponent';
import { Media, Breadcrumb, Input, BreadcrumbItem, Button, Row, Col, Label, ModalHeader, Modal, ModalBody, CardImg, CardImgOverlay, Card, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';

/**
 * Class components for showing the pets for adoption page
 */
class PetsForAdoption extends Component {

    constructor (props) {
        super(props);

        this.togglePetModal = this.togglePetModal.bind(this);

        this.state = {
            isPetModalOpen: false
        }
    }

    /**
     * Method that toggles the pet submit modal window
     */
    togglePetModal() {
        this.setState({
            isPetModalOpen: !this.state.isPetModalOpen
        })
    }

    render() {
        return (
        <div className="container">
            <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Pets for adoption
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>Pets for adoption</h3>
                        </div>
                    </div>
            <Modal className="modal-lg" isOpen = {this.state.isPetModalOpen} toggle={this.togglePetModal}>
                <ModalHeader toggle={this.togglePetModal}>
                    Submit info about pet for adoption
                </ModalHeader>
                <ModalBody>
                    test
                </ModalBody>
            </Modal>
        </div>

        )
    }
}


export default PetsForAdoption;