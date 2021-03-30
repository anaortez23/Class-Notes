
import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

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
        <form onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
        
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

            <input type="submit" value="Signup" />
        </form>
        {this.state.message && <p>{this.state.message}</p>}

        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p>

    </div>
    )
}
}

export default Signup;