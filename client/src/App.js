import React, { Component } from 'react';
import './App.css';
import CardComponent from './components/CardComponent';
import ProjectCardComponent from './components/ProjectCardComponent';
import FooterComponent from './components/FooterComponent';
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
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">Ko Gi Hun's Portfolio Website</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                {/* <li class="nav-item">
                  <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
                </li> */}
              </ul>
            </div>
          </nav>
        </div>
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
        <div className="container-fluid">
          <div className="content">
            <div className="item-intro">
              <h2 className="display-4"><b>Projects</b></h2>
              <p className="lead">My projects include school projects, as well as self-sourced projects, either in groups or single. Project scope varies from IoT, machine learning, to Software Engineering!</p> 
              <hr className="my-4"/>
              <p>All project source files are hosted in github or displayed in youtube, and you can click the github/youtube icon to see more details about it.</p> 
            </div>
            <div className="project-list">
              {/* <CarouselComponent /> */}
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
            <div className="item-intro">
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
        </div> 
        <FooterComponent />
      </div>
    );
  }
}

export default App;
