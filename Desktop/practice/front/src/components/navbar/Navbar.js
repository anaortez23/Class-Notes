import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
import logo from '../../spaceRoverLogo.png';
// import SearchResults from '../searchResults/SearchResults';
// import axios from 'axios';
import { Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom';


class Navbar extends Component {
state = { loggedInUser: null, apiData: null, searchText: ''}

service = new AuthService()

UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
}

logoutUser = () =>{
    this.service.logout()
    .then(() => {
    this.setState({ loggedInUser: null }, () => this.props.getUser(null)); 
    })
}
handleSearchSubmit = () => {
    // console.log(this.props.history)
    if (this.state.searchText) {
        this.props.history.push({
        pathname: "/searchResults",
        state: {
            searchText: this.state.searchText
        }
        });
    } else {
        alert("Please enter some search text!");
    }

}
handleSearchInput = (event) => {
    this.setState({
        searchText: event.target.value
    });
}

render(){
    console.log('nav userForNav', this.state.loggedInUser)
    // console.log('user In navbar', this.state.loggedInUser)
    if(this.state.loggedInUser){
    return(
        <nav className="nav-style-logged navbar navbar-expand-md navbar-dark fixed-top">
        
        <ul>
            <div><li><img src={logo} className="" width="182" height="167"></img></li>
            </div>

            <div className="search-bar"><li>
            <Form inline>
            <FormControl
                onChange={this.handleSearchInput}
                value={this.state.searchText}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                />
            <Button className="search-button" onClick={this.handleSearchSubmit} >Search</Button>
            </Form>     
            </li>
            </div>
            <li className="nav-item dropdown">
                <a className="nav-a btn btn-secondary nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Hi {this.state.loggedInUser.username}!
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item"  to='/projects'>Gallery</Link>
                <Link className="dropdown-item"  to='/userLanding'>Instructions</Link>
                <div class="dropdown-divider"></div>
                <Link className="dropdown-item" onClick={this.logoutUser} to='/'>Log Out</Link>
                </div>
            </li>
            
        </ul>
        </nav>
    )
    } else {
    return ( 
        <nav className="nav-style fixed-top">
        <ul>
            <li><Link to='/' style={{ textDecoration: 'none' }}><img src={logo} alt="space-rover"></img></Link></li>
            <li><button className="login-button"><Link to='/login' style={{ textDecoration: 'none' }}>Log in</Link></button></li>
            <li><button className="signup-button"><Link to='/signup' style={{ textDecoration: 'none' }}>Sign up</Link></button></li>
        </ul>
        </nav>
    )
    }
}
}

export default withRouter(Navbar);
