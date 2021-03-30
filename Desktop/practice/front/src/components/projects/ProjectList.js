import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
// import { Container } from 'react-bootstrap'

// import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
state = { listOfProjects: [] }

getAllProjects = () =>{
    axios.get(`${process.env.REACT_APP_API_URL}/projects`,
    {withCredentials:true})
    .then(responseFromApi => {
    this.setState({
        listOfProjects: responseFromApi.data
    })
    })
}

componentDidMount() {
    this.getAllProjects();
}

render(){
    return(
    <div>
        <div >
            <div className="album-list">
            
        { this.state.listOfProjects.map( project => {
            // console.log(project.urlFormat)
            return (
                <div className="album py-5 bg-light"  key={project._id}>
    <div className="container">

    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div className="col">
        <div className="card shadow-sm">
            {
                    project.mediaType === 'video'?
                    <>
                    <ReactPlayer 
                        className="bd-placeholder-img card-img-top"
                        width="100%" height="225"
                        url={project.urlFormat}
                        // playing
                        controls
                        volume={1} />
                    
                    </>
                    : project.mediaType === 'audio'?
                    <>
                    <ReactAudioPlayer 
                        // className="bd-placeholder-img card-img-top"
                        // width="100%" height="225"
                        src={project.urlFormat}
                        // playing
                        controls />
                    
                    </>
                    : project.mediaType === 'image'
                    ? 
                    <>
                        <img
                            className="bd-placeholder-img card-img-top"
                            width="100%" height="225"
                            src={project.urlFormat} 
                            alt={project.title} ></img>
                    
                    </>
                    : <p>bob</p>
                }
            <div className="card-body">
            <p className="card-text">{project.title}</p>
            <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                <Link className="btn btn-sm btn-outline-secondary" to={`/projects/${project._id}`}>View</Link>
                {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                </div>
                {/* <small className="text-muted">9 mins</small> */}
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
            // <div key={project._id}>
            //     {
            //         project.mediaType === 'video'?
                    
            //         <ReactPlayer 
            //             classNameName="media-api-data-card-item"
            //             url={project.urlFormat}
            //             // playing
            //             controls
            //             volume={1} />
                    
            //         : project.mediaType === 'audio'?
            //         <ReactAudioPlayer 
            //             classNameName="media-api-data-card-item"
            //             src={project.urlFormat}
            //             // playing
            //             controls />
                    
            //         : project.mediaType === 'image'
            //         ? 
                    
            //             <img
            //                 classNameName="media-api-data-card-item"
            //                 src={project.urlFormat} 
            //                 alt={project.title} ></img>
                    
            //         : <p>bob</p>
            //     }
            //     <Link to={`/projects/${project._id}`}>
            //     <h3>{project.title}</h3>
            //     </Link>
            //     {/*  added so the tasks can be displayed:   */}
            //     {/* <ul>
            //     { project.tasks.map((task, index) => {
            //         return <li key={index}>{task.title}</li>
            //     }) }
            //     </ul>   */}
            //     {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
            // </div>
            )})
        }
        </div>
        </div>
        
            {/* <AddProject getData={() => this.getAllProjects()}/>  */}
        </div>
    )
}
}

export default ProjectList;