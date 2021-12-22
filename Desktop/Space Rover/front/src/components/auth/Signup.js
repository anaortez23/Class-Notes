
import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from '../../spaceRoverLogo.png';



class Signup extends Component {

state = { username: '', password: '', message: ''}

service = new AuthService()

handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.signup(username, password)
    .then( res => {
        if (res.message) {
            this.setState({message: res.message})
        } else {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.getUser(res)
        this.props.history.push("/userLanding")
    }})
    .catch( error => console.log({error}) )
}

handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

render(){
    return(
    <div>
    
    <main class="form-signin">
    <form onSubmit={this.handleFormSubmit}>
        <img class="mb-4" src={logo} alt="" width="182" height="167"></img>
        <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
    
        <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}>
        </input>
        <label for="floatingInput">Username:</label>
        </div>
        <div class="form-floating">
        <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} autoComplete="off" class="form-control" id="floatingPassword" placeholder="Password"></input>
        <label for="floatingPassword">Password</label>
        </div>
    
        {/* <div class="checkbox mb-3"> */}
        {/* <label> */}
            {this.state.message && <p>{this.state.message}</p>}
            {/* <input type="checkbox" value="remember-me"></input> Remember me */}
        {/* </label> */}
        {/* </div> */}
        <button class="w-100 btn btn-lg btn-primary" type="submit" >Sign Up</button>
        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p> 
        {/* <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
    </form>
    </main>

    
        {/* <form onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
        
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} autoComplete="off"/>

            <input type="submit" value="Signup" />
        </form>
        {this.state.message && <p>{this.state.message}</p>}

        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p> */}

    </div>
    )
}
}

export default withRouter(Signup);