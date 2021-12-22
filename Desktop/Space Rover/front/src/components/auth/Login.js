
import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from '../../spaceRoverLogo.png';


class Login extends Component {
state = { username: '', password: '', message: '' }

service = new AuthService()

handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
    .then( response => {
        if (response.message) {
            this.setState({message: response.message})
        } else {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.getUser(response)
        this.props.history.push("/projects")
    }})
    .catch( error => console.log(error) )
    
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
        <h1 class="h3 mb-3 fw-normal">Log In</h1>
    
        <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}>
        </input>
        <label for="floatingInput">Username:</label>
        </div>
        <div class="form-floating">
        <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} autoComplete="off" class="form-control" id="floatingPassword" placeholder="Password" autoComplete="on" ></input>
        <label for="floatingPassword">Password</label>
        </div>
    
        {/* <div class="checkbox mb-3"> */}
        {/* <label> */}
            {this.state.message && <p>{this.state.message}</p>}
            {/* <input type="checkbox" value="remember-me"></input> Remember me */}
        {/* </label> */}
        {/* </div> */}
        <button class="w-100 btn btn-lg btn-primary" type="submit" >Log In</button>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p> 
        {/* <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
    </form>
    </main>

    </div>
    )
}
}
{/* 
        <form onSubmit={this.handleFormSubmit.bind(this)}>
            <label>Username:</label>
                <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

            <label>Password:</label>
                <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} autoComplete="on" />

            {/* <Link to={"/searchResult"}> */}
                // <button type="submit">Login</button>
            {/* </Link> */}
        // </form>

        // <p>Don't have account? 
            {/* <Link to={"/signup"}> Signup</Link> */}
        {/* </p> */}
        //  */}

export default withRouter(Login);