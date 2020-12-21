import React, { Component } from 'react';
import './App.css';

//Custom Components
import NavBar from './components/NavBar';
import AnchorNavBar from './components/AnchorNavBar';
import CardComponent from './components/CardComponent';
import ProjectCardComponent from './components/ProjectCardComponent';
import FooterComponent from './components/FooterComponent';
import IntroductionBox from './components/IntroductionBox';

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
        <NavBar />
        <IntroductionBox />
        <div className="container-fluid">
          <div className="content">
            <div className="item-intro" id="projects-link">
              <h2 className="display-4"><b>Projects</b></h2>
              <p className="lead">My projects include school projects, as well as self-sourced projects, either in groups or single. Project scope varies from IoT, machine learning, to Software Engineering!</p> 
              <hr className="my-4"/>
              <p>All project source files are hosted in github or displayed in youtube, and you can click the github/youtube icon to see more details about it.</p> 
            </div>
            <div className="project-list">
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
              <hr className="my-4"/>
            </div>
            <div className="item-intro" id="designs-link">
              <h2 className="display-4"><b>Design Works</b></h2>
              <p className="lead">Not only just coding, but I also have background experience in visual designs using illustration tools with group members when I was a member of publicity teams in my CCA organisations.
                Below works are some of the designs that I have worked on :)</p> 
              <hr className="my-4"/>
              <p></p> 
            </div>
            <div className="container-design">
              <div>
                <CardColumns>
                  {this.state.designs.map((design) => {
                    return (
                      <CardComponent 
                      medialink={design.medialink} 
                      name={design.name} 
                      desc={design.desc} 
                      org={design.organisation} 
                      year={design.year}
                      />
                    );
                  })}
                </CardColumns>
              </div>
            </div>
            <hr className="my-4"/>
          </div>
          <AnchorNavBar />
        </div> 
        <FooterComponent />
      </div>
    );
  }
}

export default App;
