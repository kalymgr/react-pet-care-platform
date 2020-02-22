import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LostFound from './LostFoundPets';
import PetsForAdoption from './PetsForAdoptionComponent';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postSubmitLostPetsInfo, postSubmitPetForAdoptionInfo, fetchLostPetsInfo, fetchPetsforadoption, fetchCounters } from '../redux/ActionCreators';
import { PetDetails } from './PetDetailsComponent';

/**
 * Mapping the state to the props
 * @param {*} state 
 */
const mapStateToProps = state => {
    return {
        lostpetsinfo: state.lostpetsinfo,
        petsforadoption: state.petsforadoption
    }
}

/**
 * Function that makes actions available for use, by mapping them to props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
    resetSubmitLostPetsInfo: () => { dispatch(actions.reset('submitLostPetsInfo')) },
    postSubmitLostPetsInfo: (lostPetsInfo) => { dispatch(postSubmitLostPetsInfo(lostPetsInfo)) },
    resetPetForAdoptionInfo: () => { dispatch(actions.reset('submitPetsforadoption')) },
    postSubmitPetForAdoptionInfo: (petForAdoptionInfo) => { dispatch(postSubmitPetForAdoptionInfo(petForAdoptionInfo)) },
    fetchLostPetsInfo: (pageNumber, extraURLParams) => {dispatch(fetchLostPetsInfo(pageNumber, extraURLParams))},
    fetchPetsforadoption: (pageNumber, extraURLParams) => {dispatch(fetchPetsforadoption(pageNumber, extraURLParams))},
})


class Main extends Component {

    componentDidMount() {
        this.props.fetchLostPetsInfo(1);  // fetch the first page of results (10 results)
        this.props.fetchPetsforadoption(1);  // fetch the first page of results (10 results)
    }

    render () {
        return (
            <div className = 'container'>
                <Header />
                    <Switch location = { this.props.location }>
                        /* Route for page of lost and found pets */
                        <Route exact path='/lostfoundpets' 
                            component = {() => 
                                <LostFound 
                                    lostPetsInfo = {this.props.lostpetsinfo} 
                                    resetSubmitLostPetsInfo={this.props.resetSubmitLostPetsInfo}
                                    postSubmitLostPetsInfo = { this.props.postSubmitLostPetsInfo }
                                    fetchLostPetsInfo = { this.props.fetchLostPetsInfo }
                                    pageNumber = {this.props.lostpetsinfo.pageNumber}
                                    lastPageNumber = {this.props.lostpetsinfo.lastPageNumber}
                                />
                            } 
                        />
                        
                        /* Route for single lost/found pet */
                        <Route exact path = '/lostfoundpets/:petId' 
                            component = {({match}) => <PetDetails match={match} pets = {this.props.lostpetsinfo} />} />} 
                        />
                            
                        /* Router for page for pets for adoption */
                        <Route exact path='/petsforadoption' 
                            component = {() => 
                                <PetsForAdoption 
                                    petsForAdoption = {this.props.petsforadoption}
                                    postSubmitPetForAdoptionInfo ={this.props.postSubmitPetForAdoptionInfo}
                                    resetPetForAdoptionInfo = {this.props.resetPetForAdoptionInfo}
                                    fetchPetsForAdoptionInfo = { this.props.fetchPetsforadoption }
                                    pageNumber = {this.props.petsforadoption.pageNumber}
                                    lastPageNumber = {this.props.petsforadoption.lastPageNumber}
                                />
                            } 
                        />
                        /* Route for single pet for adoption */
                        <Route exact path = '/petsforadoption/:petId' 
                            component = {({match}) => <PetDetails match={match} pets = {this.props.petsforadoption} />} />} 
                        />
                    </Switch>

                <Footer />
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));