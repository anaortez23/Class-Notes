import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject';
import AddTask from '../tasks/AddTask';
import EditTask from '../tasks/EditTask'
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import backArrow from '../../back-removebg-preview.png'


class ProjectDetails extends Component {
state = {editForm: false, editTaskForm: false, currentTask: null}

componentDidMount(){
    this.getSingleProject();
}

getSingleProject = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/projects/${params.id}`,
    {withCredentials:true})
    .then( responseFromApi =>{
        const theProject = responseFromApi.data;
        this.setState(theProject);
    })
    .catch((err)=>{
        console.log(err)
    })
}
renderEditForm = (e) => {
    console.log(e)
    e.preventDefault();
        this.setState({editForm: true})
}
hideEditForm = () => {
        this.setState({editForm: false})
}
// DELETE PROJECT:
deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_API_URL}/projects/${params.id}`,
    {withCredentials:true})
    .then( () =>{
        this.getSingleProject();
        this.props.history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
}
//**************************************************** */
renderAddTaskForm = () => {
    if(!this.state.title){
        this.getSingleProject();
    } else {     
                // pass the project and method getSingleProject() as a props down to AddTask component
        return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
    }
}
showEditTaskForm = (e) => {
    console.log(e)
    e.preventDefault();
        this.setState({editTaskForm: true})
}
hideEditTaskForm = () => {
    this.setState({editTaskForm: false})
}
renderEditTaskForm = (e, task) => {
    if(!this.state.title){
        this.getSingleProject();
    } else {    
        e.preventDefault();
            this.setState({editTaskForm: true, currentTask: task})
                // pass the project and method getSingleProject() as a props down to AddTask component
        // return <EditTask task={task} theProject={this.state} getTheProject={this.getSingleProject} />
    }
}
// DELETE Task:
deleteTask = (e, task) => {
    console.log(e, task)
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`,
    {withCredentials:true})
    .then( () =>{
        this.getSingleProject();
        this.props.history.push(`/projects/${params.id}`); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
}
ownershipCheck = (project) => {
    if(this.props.loggedInUser && project.owner === this.props.loggedInUser._id){
    return (
        <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div >
        {this.ownershipCheck(this.state)}
        </div>
        <Link to={'/projects'}><img className="back-arrow" src={backArrow}></img></Link>
        </div>
    )
    } 
}
render(){
    return(
    <div className="api-card-div-outer">
        <Link  to={'/projects'}><img className="back-arrow" src={backArrow}></img></Link>

        <div className="api-card-div">
        {/* <p>{this.state.description}</p> */
        console.log(this.state.theProject)}
        {

                    this.state.mediaType === 'video'?
                    <div className="api-card-left" >
                    <ReactPlayer border-radius="1 0 0 1"
                    width="87%"
                    margin-left="-6vw"
                    height="100%"
                    padding-bottom="6%"
                        className="media-api-data-card-item"
                        url={this.state.urlFormat}
                        // playing
                        controls
                        volume={1} />
                    {/* <p>{this.state.description}</p> */}
                    </div>
                    : this.state.mediaType === 'audio'?
                    <div className="api-card-left" >
                    <ReactAudioPlayer 
                        // className="media-api-data-card-item"
                        src={this.state.urlFormat}
                        // playing
                        controls />
                    {/* <p>{this.state.description}</p> */}
                    </div>
                    : this.state.mediaType === 'image'
                    ? 
                    <div className="api-card-left" >
                        <img
                            className="media-api-data-card-item"
                            src={this.state.urlFormat} 
                            alt={this.state.title} ></img>
                        {/* <p>{this.state.description}</p> */}
                    </div>
                    : <p>Not Supported</p>
                }
    <div className="api-card-right">
        <div className="edit-delete-project-details">
        <button onClick={(e) => this.renderEditForm(e)} >Edit</button>
        <button onClick={() => this.deleteProject()}>Delete</button> {/* <== !!! */}
        </div>
        <h2>{this.state.title}</h2>
        <h7>{this.state.description?.length > 300
            ? this.state.description.substring(0, 299) + "..."
            : <p>{this.state.description}</p> }
        </h7>
        {/* {this.state.description.length > 300? this.state.description.substring(0, 299) + "..."
        :<p>{this.state.description}</p>} */}
        {/* show the task heading only if there are tasks */}
        { this.state.tasks && this.state.tasks.length > 0 && <h3>Notes </h3> }
        {/* map through the array of tasks and... */}
        { this.state.tasks && this.state.tasks.map((task, index) => {
            // console.log(task._id)
            // let taskId = task._id;
            return(
                <div key={ index }>
                {/* ... make each task's title a link that goes to the task details page */}
                        <li>{ task.title }</li> 
                        {/* <Link to={`/projects/${this.state._id}/tasks/${task._id}`}><button task={task} onClick={(e, task) => this.renderEditTaskForm(e, task)} >Edit</button></Link> */}
                        <button onClick={(e) => this.renderEditTaskForm(e, task)}>Edit</button> {/* <== !!! */}
                        <button onClick={(e) => this.deleteTask(e, task)}>Delete</button> {/* <== !!! */}

                        {/* <AddTask/> */}

        
                </div>
            )
            
        }) }
        {}
        {this.state.editForm && <EditProject hideEditForm={this.hideEditForm} theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />}
        {this.state.editTaskForm && <EditTask hideEditTaskForm={this.hideEditTaskForm} theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />}
        <br/>
        <div>{this.renderAddTaskForm()} </div>
        <br/><br/><br/><br/><br/>
    </div>
    </div>
    </div>
    )
}
}

export default ProjectDetails;