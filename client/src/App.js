import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CardComponent from './components/CardComponent';
import CarouselComponent from './components/CarouselComponent';

class App extends Component {
  componentDidMount() {
    const apiUrl = "https://localhost:5000/fetchProjects";
  }
  render() {
    return (
      <div className="App">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <header className="App-header">
          <div className="intro">
            <img className="intro-selfie" src='assets/selfie_2.png' />
            <h2>
              GI HUN KO<br/>
              <a href="https://github.com/nordic96"><img className="link-icon" src="assets/github-logo.png"/></a>
              &nbsp;<a href="https://www.linkedin.com/in/gi-hun-ko-863619184/"><img className="link-icon" src="assets/Linkedin-Icon.png"/></a>
              &nbsp;<a href="https://www.hackerrank.com/kogihun"><img className="link-icon" src="assets/hackerrank.svg"/></a>
            </h2>
            <h5>Software Engineer | NUS Computer Science Undergraduate<br/>Singapore</h5> 
            <div className="intro-desc">
              "I am highly interested in various tech stacks, especially in front/back end web development.
              I am currently specialising my degree in Artificial Intelligence (A.I), and I am most proficient in using Java and Python Programming Language.
              Though I have recently begun learning JavaScript (NodeJS, ReactJS), I love coding in JS framework! 
              In fact, this website is built in Node Express and React Framework :)"
            </div>
          </div>
        </header>
        <div className="project-list">
          <h2>&lt; My Projects /&gt;</h2>
          <CarouselComponent/>
          <CardComponent displaytext="First Component Data"/>
        </div>
      </div>
    );
  }
}

export default App;
