import React, { Component } from 'react'
import ReactPlayer from 'react-player';
import rover from '../../no-background-roverblue1.png'
// import homeMoon from '../../moon-removebg-preview.png'


class Home extends Component {
    
    render() {
        return (
        <div className="home-spaceRover">
            <section id="hero" class="hero d-flex align-items-center">

<div class="container">
    <div class="row">
    <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
        <img src={rover} class="img-fluid" alt=""></img>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" class="aos-init aos-animate">Welcome to Space Rover</h1>
        <h2 data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">Explore outer space from anywhere.</h2>
        <div data-aos="fade-up" data-aos-delay="600" class="aos-init aos-animate">
            <div class="text-center text-lg-start">
            <a href="/signup" class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                <span>Get Started</span>
                <i class="bi bi-arrow-right"></i>
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>

</section>
            {/* <div class="col-lg-6 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up" class="aos-init aos-animate">Welcome to Space Rover</h1>
            <h2 data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">Explore outer space from anywhere.</h2>
            <div data-aos="fade-up" data-aos-delay="600" class="aos-init aos-animate">
                <div class="text-center text-lg-start">
                <a href="/signUp" class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>Get Started</span>
                    <i class="bi bi-arrow-right"></i>
                </a>
                </div>
            </div>
        </div> */}
            {/* <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1>Space <br></br>Rover</h1>
                <br></br>
                <h3>Explore outer space from anywhere</h3>
            </div> */}
            {/* <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
                <img src={rover} class="img-fluid" alt=""></img>
            </div> */}
                
        
                {/* <img className="home-moon" src={homeMoon}></img> */}
        </div>
        ) 
    }
}

export default Home;
