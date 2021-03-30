import React, { Component } from 'react'

class Apod extends Component {

    state={
        apod: {}
    }
    componentDidMount(){
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
        console.log(response.data)
        this.setState({
            beers: response.data
        })
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default Apod;