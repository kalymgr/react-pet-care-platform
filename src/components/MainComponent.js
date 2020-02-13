import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LostFound from './LostFoundPets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postSubmitLostPetInfo } from '../redux/ActionCreators';

/**
 * Mapping the state to the props
 * @param {*} state 
 */
const mapStateToProps = state => {
    return {
        lostpetinfo: state.lostpetinfo
    }
}


/**
 * Function that makes actions available for use, by mapping them to props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
    resetSubmitLostPetInfo: () => { dispatch(actions.reset('submitLostPetInfo')) },
    postSubmitLostPetInfo: (lostPetInfo) => { dispatch(postSubmitLostPetInfo(lostPetInfo)) }
})


class Main extends Component {
    render () {
        return (
            <div className = 'container'>
                <Header />
                    <Switch location = { this.props.location }>
                        <Route exact path='/lostfoundpets' 
                            component = {() => 
                                <LostFound  resetSubmitLostPetInfo={this.props.resetSubmitLostPetInfo}
                                postSubmitLostPetInfo = { this.props.postSubmitLostPetInfo }
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