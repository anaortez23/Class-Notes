// import React, { useState} from 'react';
// import axios from 'axios';

// const AddProject = props => {
// // state = { title: "", description: "" }
// const [title, setTitle] = useState( '' );
// cont [description, setDescription] = useState( '' );
// const [urlFormat, setUrlFormat] = useState( '' );
// const [mediaType, setMediaType] = useState( '' );
// setTitle(props.title)
// setDescription(props.description)
// setUrlFormat(props)


// const handleSave = (e) => {
//     e.preventDefault();
//     axios.post("http://localhost:5000/api/projects", { title, description, urlFormat, mediaType},
//     {withCredentials:true})
// }
// //     event.preventDefault();
// //     const title = this.state.title;
// //     const description = this.state.description;
// //     axios.post("http://localhost:5000/api/projects", { title, description },
// //     {withCredentials:true})
// //     .then( () => {
// //         this.props.getData();
// //         this.setState({title: "", description: ""});
// //     })
// //     .catch( error => console.log(error) )
// // }

// // handleChange = (event) => {  
// //     const {name, value} = event.target;
// //     this.setState({[name]: value});
// // }


//     return(
//     <div>
//         {/* <form onSubmit={this.handleFormSubmit}>
//         <label>Title:</label>
//         <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
//         <label>Description:</label>
//         <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
        
//         <input type="submit" value="Submit" />
//         </form> */}
//         {/* onClick={() => props.hideDetails()} */}
//         <button onClick={() => console.log("Saved yeyyy", props.item, props.urlFormat)}>Save</button>
//     </div>
//     )

// }

// export default AddProject;