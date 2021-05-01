import React, { useState, useEffect, MouseEvent } from 'react';
import './App.css';

//Custom Components
import NavBar from './components/NavBar';
import AnchorNavBar from './components/AnchorNavBar';
import CardComponent from './components/CardComponent';
import ProjectCardComponent from './components/ProjectCardComponent';
import { FullProjectDesc, FullDesignDesc } from './globals';
import FooterComponent from './components/FooterComponent';
import IntroductionBox from './components/IntroductionBox';

import { CardColumns } from 'react-bootstrap';

function Home() {
  const [designs, setDesigns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isSortLatest, setIsSortLatest] = useState(false);
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);
  const [isDesignsLoaded, setIsDesignsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/fetchDesigns')
    .then(res => res.json())
    .then(
      (designs) => {
        setDesigns(designs);
        setIsDesignsLoaded(true);
      },
      (ex) => {
        console.log('Fetch failed, ', ex);
        setIsDesignsLoaded(false);
      }
    );
  }, []);

  useEffect(() => {    
    fetch('/api/fetchProjects')
    .then(res => res.json())
    .then(
      (projects) => {
        setProjects(projects);
        setIsProjectsLoaded(true);
      },
      (ex) => {
        console.log('Fetch failed, ', ex);
        setIsProjectsLoaded(false);
      }
    );
  }, []);

  useEffect(() => {
    if (isSortLatest) {
      setProjects(projects.sort((p1: FullProjectDesc, p2: FullProjectDesc) => p1.devyear - p2.devyear));
    } else {
      setProjects(projects.sort((p1: FullProjectDesc, p2: FullProjectDesc) => p2.devyear - p1.devyear));
    }
  }, [isSortLatest, projects])

  console.log("found " + designs.length + " design items from DB..");
  console.log("found " + projects.length + " project items from DB..");

  function handleLatestClick(e: MouseEvent, isLatest: boolean) {
    e.preventDefault();
    setIsSortLatest(isLatest);
  }

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
            <div className="dropdown show">
              <a className="btn btn-secondary dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort Projects
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="/" onClick={(e) => handleLatestClick(e, true)}>Latest</a> 
                <a className="dropdown-item" href="/" onClick={(e) => handleLatestClick(e, false)}>Oldest</a> 
              </div>
            </div>
          </div>
          <div className="project-list">
            {isProjectsLoaded ? (projects.map((project: FullProjectDesc, index: number) => {
              return(
                <ProjectCardComponent 
                key={index}
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
            })) : "Project details fetch request failed :'( please refresh the page again!"}
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
                {isDesignsLoaded ? (designs.map((design: FullDesignDesc, index: number) => {
                  return (
                    <CardComponent 
                    key={index}
                    medialink={design.medialink} 
                    name={design.name} 
                    desc={design.desc} 
                    organisation={design.organisation} 
                    year={design.year}
                    />
                  );
                })) : "Design details fetch request failed :'( please refresh the page again!"}
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
export default Home;