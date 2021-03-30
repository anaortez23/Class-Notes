import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {
state = { title: "", description: "", isShowing: false } // `isShowing` will help us to toggle add task form

handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({isShowing: false});
    // this.toggleForm(event);
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing project 
                                                // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
    
    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { title, description, projectID })
    .then( () => {
        // after submitting the form, retrieve project one more time so the new task is displayed as well 
        //              |
        this.props.getTheProject();
        this.setState({title: "", description: ""});
    })
    .catch( error => console.log(error) )
}

handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

// toggleForm = (e) => {
//     if(!this.state.isShowing){
// //         // e.target.childNodes[0].data = "Cancel"
//         this.setState({isShowing: true});
//     } else {
// //         // e.target.childNodes[0].data = "Add Note"
//         this.setState({isShowing: false});
//     }
// }

showAddTaskForm = (e) => {
    console.log(e)
    this.setState({isShowing: true});
}
hideAddTaskForm = (e) => {
    console.log(e)
    this.setState({isShowing: false});
}
editTaskForm = () => {
    if(this.state.editTaskForm){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                {/* <label>Title:</label> */}
                <input type="text" name="title" placeholder="Add a note" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                {/* <label>Description:</label>
                <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} /> */}
                
                <input type="submit" value="Done" />
                </form>
            </div>
        )
    }
}

render(){
    return(
    <div>

            {this.state.isShowing
            ?<div>
                <h3>Add Note</h3>
                <form onSubmit={this.handleFormSubmit}>
                {/* <label>Title:</label> */}
                <input type="text" name="title" placeholder="Add a note" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                {/* <label>Description:</label>
                <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} /> */}
                
                <input type="submit" value="Save" />
                </form>
            <button onClick={(e) => this.hideAddTaskForm(e)}> Cancel </button>
            </div>
            : <button onClick={(e) => this.showAddTaskForm(e)}> Add Note </button>
            }


            {/* {!this.state.isShowing? {this.showAddTaskForm()} } */}
    </div>
    )
}
}

export default AddTask;