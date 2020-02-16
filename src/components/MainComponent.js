import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LostFound from './LostFoundPets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postSubmitLostPetsInfo, fetchLostPetsInfo, fetchCounters } from '../redux/ActionCreators';

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
    fetchLostPetsInfo: () => {dispatch(fetchLostPetsInfo())},
    fetchCounters: () => {dispatch(fetchCounters())}
})


class Main extends Component {

    componentDidMount() {
        this.props.fetchLostPetsInfo();
        this.props.fetchCounters();
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
                                />
                            } 
                        />
                    </Switch>

                <Footer />
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));