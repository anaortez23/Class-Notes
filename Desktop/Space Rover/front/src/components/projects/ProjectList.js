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
    <div className="album py-5 bg-light">
    <div className="container" >
    <div className="row">
        { this.state.listOfProjects.map( project => {
            // console.log(project.owner, this.props.user )
        if(this.props.user._id === project.owner){
            // console.log(project.urlFormat)
            return (
    
        <div className="col-md-4" key={project._id}>
        <div className="card mb-4 box-shadow">
            {
                    project.mediaType === 'video'?
                    <>
                    <ReactPlayer 
                        className="bd-placeholder-img card-img-top"
                        width="100%" height="225" display="block"
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
                        width="100%" height="225" display="block"
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
        
            
            )}})
        

        }
        </div>
        </div>
        </div>
        </div>
        </div>
        
            {/* <AddProject getData={() => this.getAllProjects()}/>  */}
        </div>
    )

}
}

export default ProjectList;