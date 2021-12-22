import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {
    state = {
        title: this.props.theProject.currentTask.title, 
        description: this.props.theProject.currentTask.description
    }
    
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.hideEditTaskForm();
        console.log(this.props.hideEditTaskForm)
        const title = this.state.title;
        const description = this.state.description;
        console.log("this", this.props.theProject.currentTask)
    
        event.preventDefault();
    
        axios.put(`${process.env.REACT_APP_API_URL}/tasks/${this.props.theProject.currentTask._id}`, { title, description },
        {withCredentials:true})
        .then( () => {
            this.props.getTheProject();
            // after submitting the form, redirect to '/projects'
            this.props.history.push(`/projects/${this.props.theProject._id}`);    
        })
        .catch( error => console.log(error) )
    }
    handleChangeTitle = (event) => { 
        console.log(event)
        this.setState({
        title:event.target.value
        })
    }
    render(){
        return(
        <div> 
            <hr />
            <form onSubmit={this.handleFormSubmit}>
            <input type="text" name="title" value={this.state.title} placeholder={this.props.theProject.currentTask.title} onChange={e => this.handleChangeTitle(e)}/>
            {/* <button onClick={ this.props.hideEditTaskForm() }>Cancel</button> */}
            <button type="submit" value="Submit">Save</button>
            </form>
            <button onClick={ this.props.hideEditTaskForm }>Cancel</button>

        </div>
        )
    }
    }
    
    export default EditTask;