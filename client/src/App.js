import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CardComponent from './components/CardComponent';
import CarouselComponent from './components/CarouselComponent';
import FooterComponent from './components/FooterComponent';
import Rotate from 'react-reveal/Rotate';
import Wave from 'react-wavify';
import IDCard from './components/IDCard';
import { Tabs, Tab } from 'react-bootstrap';

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
    //const [key, setKey] = useState('home');
    return (
      <div className="App">
        <div className="header-top">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <header className="App-header">
          <div className="intro">
            <IDCard />
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
        <div id="content">
          <div id="right">
            <div id="menu-header">
              <b>&lt; My Projects /&gt;</b>
            </div>
            <div className="project-list">
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
          </div> 
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
