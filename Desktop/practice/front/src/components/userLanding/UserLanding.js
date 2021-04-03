import React, { Component } from 'react'

class UserLanding extends Component {
    

    render() {
        
        return (
            <div className="user-instructions">
                {/* <h3>Hi there {this.props.user.username}</h3> */}
                <h2>Hi there 👋🏼 Just some quick instructions :</h2>
                <h3>This app is dedicated to a small section of NASA's media library.<br></br>
                You can type words like star, galaxy, Apollo, asteroid, or black hole. <br></br>
                Honestly, anything NASA related that pops up to your mind.<br></br>
                Once you click on one of your search results you will have the option <br></br>
                to save it to your gallery!<br></br>
                Explore your search results and save some awesome media to your gallery<br></br> 
                take notes on what you think about it and even edit the media to your likes!<br></br>
                ...<br></br>
                That's it for now! Enjoy the app ❤️
                </h3>

                
            </div>
        )
    }
}
export default UserLanding;