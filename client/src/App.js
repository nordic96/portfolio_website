import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CardComponent from './components/CardComponent';
import CarouselComponent from './components/CarouselComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <div className="intro">
            <img className="intro-selfie" src='assets/selfie_2.png' />
            <h3>KO GI HUN</h3>
            <h5>Software Engineer | NUS Computer Science Undergraduate</h5>
            <div className="intro-desc">
              "I am highly interested in various tech stacks, especially in front/back end web development.
              I am currently specialising my degree in Artificial Intelligence (A.I), and I am most proficient in using Java and Python Programming Language.
              Though I have recently begun learning JavaScript (NodeJS, ReactJS), I love coding in JS framework! 
              In fact, this website is built in Node Express and React Framework :)"
            </div>
          </div>
        </header>
        <div className="project-list">
          <h2>Interesting Projects</h2>
        </div>
        <CarouselComponent/>
        <CardComponent displaytext="First Component Data"/>
      </div>
    );
  }
}

export default App;
