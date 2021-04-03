import React, { useState} from "react";
import axios from 'axios';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';





const ApiDataCard = props => {
console.log('this is props', props.hideDetails)
const [urlFormat, setUrlFormat] = useState( '' );



if (props.item.data[0].media_type === 'video') {
    // console.log('yes it is')
    axios.get(`https://images-api.nasa.gov/asset/${props.item.data[0].nasa_id}`)
    .then((res) => {
        let originalVideo = res.data.collection.items.find(element => element.href.slice(element.href.length - 8) === 'orig.mp4');
        let makeUrlFormat = 'https'.concat(encodeURI(originalVideo.href).slice(4))
        // console.log(makeUrlFormat)
        setUrlFormat(makeUrlFormat);   
    })
} else if (props.item.data[0].media_type === 'image') {
    axios.get(`https://images-api.nasa.gov/asset/${props.item.data[0].nasa_id}`)
    .then((res) => {
        console.log(res)
        let originalImg = res.data.collection.items.find(element => element.href.slice(element.href.length - 8) === 'orig.png' || 'orig.jpg');
        let makeUrlFormat = 'https'.concat(encodeURI(originalImg.href).slice(4))
        // console.log(makeUrlFormat)
        setUrlFormat(makeUrlFormat);   
    })
} else if (props.item.data[0].media_type === 'audio') {
    axios.get(`https://images-api.nasa.gov/asset/${props.item.data[0].nasa_id}`)
    .then((res) => {
        console.log(res)
        let originalAud = res.data.collection.items.find(element => element.href.slice(element.href.length - 8) === 'orig.mp3');
        let makeUrlFormat = 'https'.concat(encodeURI(originalAud.href).slice(4))
        console.log(makeUrlFormat)
        setUrlFormat(makeUrlFormat); 
    })
}

const handleSave = (e) => {
    e.preventDefault();
    e.target.childNodes[0].data = "Saved"
    const title = props.item.data[0].title;
    const description = props.item.data[0].description;
    const mediaType = props.item.data[0].media_type;
    axios.post(`${process.env.REACT_APP_API_URL}/projects`, { title, description, urlFormat, mediaType},
    {withCredentials:true})
    // .then( () => {
    //     this.props.getData();
    //     this.setState({title: "", description: ""});
    // })
    .catch( error => console.log(error) )
}
return (
    <div className="api-card-div-outer-sr">
    <button className="back-button search-button btn btn-primary" onClick={() => props.hideDetails()}>back</button>
    <div className="api-card-div-sr">

        { props.item.data[0].media_type === 'video'
        ? 
        <div className="api-card-left-sr">
            <ReactPlayer 
                className="media-api-data-card-item"
                url={urlFormat}
                // playing
                controls
                volume={1} />
            {/* <p>{props.item.data[0].description}</p> */}
        </div>
        : props.item.data[0].media_type === 'audio'
        ?
        <div className="api-card-left-sr">
            <ReactAudioPlayer
                className="media-api-data-card-voice"
                src={urlFormat}
                // autoPlay
                controls />
        </div>
        : props.item.data[0].media_type === 'image'
        ? 
        <div className="api-card-left-sr">
            <img
                className="media-api-data-card-item"
                src={urlFormat} 
                alt={props.item.data[0].title} ></img>
            {/* <p>{props.item.data[0].description}</p> */}
        </div>
        : <></>
        }
        <div className="api-card-right-sr">
        <h3>{props.item.data[0].title} {props.item.data[0].media_type.charAt(0).toUpperCase().concat(props.item.data[0].media_type.slice(1))}</h3>
        <p>{props.item.data[0].description?.length > 300
            ? props.item.data[0].description.substring(0, 299) + "..."
            : <p>{props.item.data[0].description}</p> }</p>
        <button onClick={(e) => handleSave(e)}>Save</button>
        </div>

        {/* <p>Description: {props.data[0].description}</p> */}
        </div>
    </div>
);
};

export default ApiDataCard;