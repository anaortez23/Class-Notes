import React, { Component } from 'react'
import axios from 'axios';
import ApiDataCard from './ApiDataCard';
import { Link } from 'react-router-dom';


class UserHome extends Component {
    state = {
        search: '',
        apiData: null,
        displayApiCard: false,
        displaySearchBar: true,
        currentItem: null,
        // saveButton: false
    }


    search = () => {
        console.log(this.state)
        axios
            .get(`https://images-api.nasa.gov/search?q=${this.state.search}`)
            .then((res) => {
                // console.log('current', res.data.collection.items.slice(0, 20));
                this.setState({
                    apiData: res.data.collection.items.slice(0, 20), displaySearchBar: false
                })
            })
}
    searchDetails = (e, item) => {
        e.preventDefault();
        this.setState({displayApiCard: true, currentItem: item})
    }
    hideDetails = () => {
        this.setState({displayApiCard: false})
    }
    handleChange = (e) => {
        console.log(e.target.value, e.target.name);
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        console.log('------------', this.state.apiData)
        return (
                <div>  
                    <div>
                    {
                    this.state.displaySearchBar
                    ?   <div>
                        <h2>Hello this is User Home</h2>
                        <h3>Type any keywords for finding incredible media from gallery</h3>
                        <input
                        onChange={this.handleChange}
                        name="search"
                        placeholder="Search.."
                        type="text"
                    />
                    <button onClick={this.search}>Search</button>
                    
                        </div>

                    : this.state.displayApiCard 
                    ? <ApiDataCard {...this.props} item={this.state.currentItem} hideDetails={this.hideDetails} /> 
                    : this.state.apiData?.length && this.state.apiData.map((item, i) => {
                            return  <li key={i} > <a href="#"  onClick={(e) => this.searchDetails(e, item)}> { item.data[0].title } </a>
                                    </li>
                        })
                    }
                    </div>
            </div>
        )
    }
}
export default UserHome;