import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import Matches from './views/Matches/Matches'
import Settings from './views/Settings/Settings'
import Info from './views/Info/Info'


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path='/' component={Login} exact/>
            <Route path='/home' component={Home}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/matches' component={Matches}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/info' component={Info}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
