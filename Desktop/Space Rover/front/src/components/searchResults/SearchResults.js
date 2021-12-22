import React, { Component } from 'react'
import axios from 'axios';
import ApiDataCard from './ApiDataCard';
// import Navbar from '../navbar/Navbar';
// import { Link } from 'react-router-dom';


class SearchResults extends Component {
    state = {
        // search: '',
        searchResults: [],
        displayApiCard: false,
        displaySearchBarInfo: true,
        displaySearch: false,
        currentItem: null,
        searchText: "",
        isLoading: true,
        
        // saveButton: false
    }


handleSearch = () => {
    if(this.props.location.state){
    let searchText = this.props.location.state.searchText;
        console.log(this.state)
        axios
            .get(`https://images-api.nasa.gov/search?q=${searchText}`)
            .then((res) => {
                // console.log('current', res.data.collection.items.slice(0, 20));
                this.setState({
                    displayApiCard: false,
                    searchResults: res.data.collection.items.slice(0, 20),
                    isLoading: false,
                    searchText: searchText,
                })
            })
    } else {
        return <h3>Perform a search on the search bar</h3>
    }
}
componentDidMount() {
    this.handleSearch();
}
componentDidUpdate(prevProps) {
    let prevSearch = prevProps.location.state.searchText;
    let newSearch = this.props.location.state.searchText;
    if (prevSearch !== newSearch) {
    this.handleSearch();
    }
}

    searchDetails = (e, item) => {
        e.preventDefault();
        this.setState({displayApiCard: true, currentItem: item})
    }
    hideDetails = () => {
        this.setState({displayApiCard: false})
    }
    // handleChange = (e) => {
    //     console.log(e.target.value, e.target.name);
    //     this.setState({ [e.target.name]: e.target.value});
    // }
    render() {
        
        let toRender = this.state.isLoading ? (
            <h1 className="api-card-div-results">Loading...</h1>
        ) : (
            <>
            <div className="api-card-div-results">
            <h1>Your Search Results</h1>
            <ul>
                <li>Search: "{this.state.searchText}"</li>
                {/* <li>Count: {this.state.searchResults.length}</li> */}
            </ul>
            </div>
        
            {!this.state.displayApiCard?
            (  <div className="results-items">{ this.state.searchResults.length > 0?
                (
                    this.state.searchResults.map((item, i) => {
                    return <li className="results-list" key={i} > <a href="#"  onClick={(e) => this.searchDetails(e, item)}> { item.data[0].title } </a>
                                </li>
                    }) 
                ) : ( <p>NO RESULTS FOUND</p> )
            }</div>

            ) : ( <ApiDataCard {...this.props} item={this.state.currentItem} hideDetails={this.hideDetails} /> )
            }
            </>
        );
        
        return ( <div style={{ margin: "20px 0px 0px 20px" }}>{toRender}</div>
            //     <div>  
            //         <div>
            //         {
            //         // this.state.displaySearchBarInfo
            //         // ?   <div>
            //         //     <h2>Hello this is User Home</h2>
            //         //     <h3>Type any keywords for finding incredible media from gallery</h3>
            //         //     <input
            //         //     onChange={this.handleChange}
            //         //     name="search"
            //         //     placeholder="Search.."
            //         //     type="text"
            //         // />
            //         // <button onClick={this.search}>Search</button>
            //         //     </div>   
            //         this.state.displayApiCard 
            //         ? <ApiDataCard {...this.props} item={this.state.currentItem} hideDetails={this.hideDetails} /> 
            //         : this.state.apiData?.length && this.state.apiData.map((item, i) => {
            //             return  <div>
            //                 <li key={i} > <a href="#"  onClick={(e) => this.searchDetails(e, item)}> { item.data[0].title } </a>
            //                     </li>
            //             </div>
    
            //         })
            //         }
            //         </div>
            // </div>
        )
    }
}
export default SearchResults;