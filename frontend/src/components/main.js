import React, { Component } from 'react';
import Home from './home';
import Register from './Register';
import NavBar from './navbar';
// import { connect } from 'react-redux';

// import Explore from './explore';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route path="/home" component={Home} />
                    {/* <Route path="/explore" component={Explore}/> */}
                    <Route path="/Register" component={Register} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Main);