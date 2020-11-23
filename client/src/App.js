import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CardComponent from './components/CardComponent';
import CarouselComponent from './components/CarouselComponent';
import FooterComponent from './components/FooterComponent';
import Rotate from 'react-reveal/Rotate';
import Wave from 'react-wavify';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <header className="App-header">
          <div className="intro">
            <img className="intro-selfie" src='assets/selfie_2.png' alt="profile"/>
            <h2>
              GI HUN KO<br/>
              <a href="https://github.com/nordic96"><img className="link-icon" src="assets/github-logo.png" alt="github icon"/></a>
              &nbsp;<a href="https://www.linkedin.com/in/gi-hun-ko-863619184/"><img className="link-icon" src="assets/Linkedin-Icon.png" alt="linkedin icon"/></a>
              &nbsp;<a href="https://www.hackerrank.com/kogihun"><img className="link-icon" src="assets/hackerrank.svg" alt="hackerrank icon"/></a>
            </h2>
            <h5>Software Engineer | NUS Computer Science Undergraduate<br/>Singapore</h5> 
            <div className="intro-desc">
              "I am highly interested in various tech stacks, especially in front/back end web development.
              I am currently specialising my degree in Artificial Intelligence (A.I), and I am most proficient in using Java and Python Programming Language.
              Though I have recently begun learning JavaScript (NodeJS, ReactJS), I love coding in JS framework! 
              In fact, this website is built in Node Express and React Framework :)"
            </div>
            <Wave fill='#f79902'
                  paused={false}
                  options={{
                    height: 25,
                    amplitude: 50,
                    speed: 0.22,
                    points: 3
                  }}
            />
          </div>
        </header>
        <div className="project-list">
          <h2>&lt; My Projects /&gt;</h2>
          <CarouselComponent />
          <Rotate top left>
            <div className="container-design">
                <h2>&lt; Design Works /&gt;</h2>
                <div className="desc-main">
                  <p>Not only just coding, but I have background experience in designing during my Co-Curriculum-Activities. 
                    Below works are the designs that I have worked on.</p>
                  <img className="img-design" src="assets/sticker_lion2.png" alt="design"/>
                </div>
            </div>
          </Rotate>
          <CardComponent displaytext="First Component Data"/>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
