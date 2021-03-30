import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
import logo from '../../spaceRoverLogo.png';


class Navbar extends Component {
state = { loggedInUser: null }

service = new AuthService()

UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
}

logoutUser = () =>{
    this.service.logout()
    .then(() => {
    this.setState({ loggedInUser: null });
    this.props.getUser(null);  
    })
}

render(){
    console.log('user In navbar', this.state.loggedInUser)
    if(this.state.loggedInUser){
    return(
        <nav className="nav-style">
        <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li><Link to='/userHome' style={{ textDecoration: 'none' }}>Home</Link></li>
            <li><Link to='/projects' style={{ textDecoration: 'none' }}>Gallery</Link></li>

            <li>
            <Link to='/'>
                <button onClick={this.logoutUser}>Logout</button>
            </Link>
            </li>
        </ul>
        </nav>
    )
    } else {
    return ( 
        <nav className="nav-style">
        <ul>
            <li><img src={logo} alt="space-rover"></img></li>
            <li><button className="login-button"><Link to='/login' style={{ textDecoration: 'none' }}>Log in</Link></button></li>
            <li><button className="signup-button"><Link to='/signup' style={{ textDecoration: 'none' }}>Sign up</Link></button></li>
        </ul>
        </nav>
    )
    }
}
}

export default Navbar;
