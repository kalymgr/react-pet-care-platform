import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LostFound from './LostFoundPets';


class Main extends Component {
    render () {
        return (
            <div className = 'container'>
                <Header />
                    <Switch location = { this.props.location }>
                        <Route exact path='/lostfoundpets' component = {LostFound} />
                    </Switch>

                <Footer />
            </div>
        )
    }
}


export default Main;