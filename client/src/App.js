import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CardComponent from './components/CardComponent';
import CarouselComponent from './components/CarouselComponent';
import FooterComponent from './components/FooterComponent';
import Rotate from 'react-reveal/Rotate';
import Wave from 'react-wavify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        designs: []
    };
  } 
  fetchDesigns() {
    fetch('/api/fetchDesigns')
    .then(res => res.json())
    .then(
      (designs) => {
        console.log(designs)
        this.setState({
          isLoaded: true,
          designs: designs
        });
      },
      (ex) => {
        console.log('Fetch failed, ', ex);
      }
    )
  }

  componentDidMount() {
    this.fetchDesigns();
  }

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
              "I am a Korean Computer Science student at NUS. 
              My career goal is to become an expert in software engineering, as well as able to work along with fantastic people to design a software that is easily interactable, with simple, but attractive design. 
              I am currently specialising my degree in Artificial Intelligence (A. I), and I love projects that are hybrid of AI and software engineering. 
              I do not bound myself in A. I and I persistently learn new tech stack to improve my skills! :)"
            </div>
            <div>
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
          </div>
        </header>
        <div className="project-list">
          <h2>&lt; My Projects /&gt;</h2>
          <CarouselComponent />
          <div className="container-design">
              <h2>&lt; Design Works /&gt;</h2>
              <div className="desc-main">
                <p>Not only just coding, but I also have background experience in visual designs using illustration tools with group members when I was a member of publicity teams in my CCA organisations.
                  Below works are some of the designs that I have worked on :)</p>                
              </div>
              <div>
                <Rotate top left>
                  <span>
                    {this.state.designs.map((design) => {
                      return (
                        <CardComponent medialink={design.medialink} name={design.name} desc={design.desc} org={design.organisation} year={design.year}/>
                      );
                    })}
                  </span>
                </Rotate>
              </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
