import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LostFound from './LostFoundPets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postSubmitLostPetsInfo, fetchLostPetsInfo, fetchCounters } from '../redux/ActionCreators';
import { PetDetails } from './PetDetailsComponent';

/**
 * Mapping the state to the props
 * @param {*} state 
 */
const mapStateToProps = state => {
    return {
        lostpetsinfo: state.lostpetsinfo,
        counters: state.counters
    }
}

/**
 * Function that makes actions available for use, by mapping them to props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
    resetSubmitLostPetsInfo: () => { dispatch(actions.reset('submitLostPetsInfo')) },
    postSubmitLostPetsInfo: (lostPetsInfo) => { dispatch(postSubmitLostPetsInfo(lostPetsInfo)) },
    fetchLostPetsInfo: (pageNumber) => {dispatch(fetchLostPetsInfo(pageNumber))},
    // fetchCounters: () => {dispatch(fetchCounters())}
})


class Main extends Component {

    componentDidMount() {
        this.props.fetchLostPetsInfo(1);  // fetch the first page of results (10 results)
        // this.props.fetchCounters();
    }

    render () {
        return (
            <div className = 'container'>
                <Header />
                    <Switch location = { this.props.location }>
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
                        <Route exact path = '/lostfoundpets/:petId' 
                            component = {({match}) => <PetDetails match={match}  />} />} 
                        />
                    </Switch>

                <Footer />
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));