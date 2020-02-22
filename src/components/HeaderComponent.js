import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';


/**
 * Component for the App header
 */
class Header extends Component {
    constructor (props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        }
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return (<div>
            
            <header className="jumbotron">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-3">
                        <img className="img-fluid" src="./assets/images/logo.jpg" />
                    </div>
                    <div className="col-12 col-sm-9 align-self-center">
                        <h1 className="text-center">Pet Care Platform</h1>
                        <p className="text-center">Everything you need about your pet!</p>
                    </div>
                </div>
            </div>
            </header>
            <Navbar dark expand="md">
                
                <div className="container">
                    
                    <NavbarToggler onClick={this.toggleNav} /> 
                    <Collapse isOpen = {this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span className="fa fa-home fa-lg">Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/lostfoundpets'>
                                    <span className="fa fa-search fa-lg">Lost/Found pets</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/petsforadoption'>
                                    <span className="fa fa-paw fa-lg">Pets for adoption</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        
        </div>);
    }
}


export default Header;