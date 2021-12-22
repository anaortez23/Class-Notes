import React, { Component } from 'react';
import axios from 'axios';

class EditProject extends Component {
state = {
    title: this.props.theProject.title, 
    description: this.props.theProject.description
}

handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.hideEditForm();
    const title = this.state.title;
    const description = this.state.description;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}/projects/${this.props.theProject._id}`, { title, description },
    {withCredentials:true})
    .then( () => {
        this.props.getTheProject();
        // after submitting the form, redirect to '/projects'
        this.props.history.push(`/projects/${this.props.theProject._id}`);    
    })
    .catch( error => console.log(error) )
}

handleChangeTitle = (event) => {  
    this.setState({
    title:event.target.value
    })
}

handleChangeDesc = (event) => {  
    this.setState({
    description:event.target.value
    })
}

render(){
    return (
    <div>
        <hr />
        <h3>Edit Media</h3>
        <form onSubmit={this.handleFormSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
        <br></br>
        <label>Description:</label>
        <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
        
        <button type="submit" value="Submit">Save</button>
        </form>
    </div>
    )
}
}

export default EditProject;