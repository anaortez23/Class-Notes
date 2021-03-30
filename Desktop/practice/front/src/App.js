
import React, { Component } from 'react';
import './App.css';
import './components/navbar/Navbar.css';
import './components/home/Home.css';
import './components/userhome/ApiDataCard.css';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';
import Home from './components/home/Home';
import UserHome from './components/userhome/UserHome';
// import ApiDataCard from './components/userhome/ApiDataCard';


class App extends Component {
  state = { loggedInUser: null }

  service = new AuthService()

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/userHome' component={UserHome} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar />
            <Switch> 
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} />
            </Switch>
        </div>
      );
    }
  }
}
export default App;