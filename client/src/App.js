import React, { Component } from 'react';
import './App.css';
import CardComponent from './components/CardComponent';
import ProjectCardComponent from './components/ProjectCardComponent';
import FooterComponent from './components/FooterComponent';
import Rotate from 'react-reveal/Rotate';
import Wave from 'react-wavify';
import IDCard from './components/IDCard';
import { CardColumns } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        designs: [],
        projects: []
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
  
  fetchProjects() {
    fetch('/api/fetchProjects')
    .then(res => res.json())
    .then(
      (projects) => {
        console.log(projects)
        this.setState({
          isLoaded: true,
          projects: projects
        });
      },
      (ex) => {
        console.log('Fetch failed, ', ex);
      }
    )
  }

  componentDidMount() {
    this.fetchDesigns();
    this.fetchProjects();
  }

  render() {
    return (
      <div className="App">
        <div className="header-top">
          &nbsp;
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
          <div id="menu-header">
            <b>&lt; My Projects /&gt;</b>
          </div>
          <div className="project-list">
            {/* <CarouselComponent /> */}
            <CardColumns>
              {this.state.projects.map((project) => {
                return(
                  <ProjectCardComponent 
                  name={project.name} 
                  medialink={project.medialink} 
                  projectlink={project.projectlink}
                  videolink={project.videolink}
                  projecttype={project.projecttype} 
                  tags={project.tags}
                  devyear={project.devyear}
                  desc={project.desc}
                  />
                )
              })}
            </CardColumns> 
          </div>
          <div className="container-design">
            <div id="menu-header">
              <b>&lt; Design Works /&gt;</b>
            </div>
            <div className="desc-main">
              <p>Not only just coding, but I also have background experience in visual designs using illustration tools with group members when I was a member of publicity teams in my CCA organisations.
                Below works are some of the designs that I have worked on :)</p>                
            </div>
            <div>
              <Rotate top left>
                <CardColumns>
                  {this.state.designs.map((design) => {
                    return (
                      <CardComponent medialink={design.medialink} name={design.name} desc={design.desc} org={design.organisation} year={design.year}/>
                    );
                  })}
                </CardColumns>
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
