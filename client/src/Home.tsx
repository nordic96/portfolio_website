import React, { useState, useEffect, MouseEvent } from 'react';
import './App.css';

// Custom Components
import NavBar from './components/NavBar';
import AnchorNavBar from './components/AnchorNavBar';
import DesignCard from './components/DesignCard';
import ProjectCard from './components/ProjectCard';
import { FullProjectDesc, FullDesignDesc } from './globals';
import FooterComponent from './components/FooterComponent';
import IntroductionBox from './components/IntroductionBox';

import { CardColumns } from 'react-bootstrap';
import LabelContainer from 'labelcontainer';

const Home = () => {
    const labelInstance = LabelContainer.getInstance();
    const [designs, setDesigns] = useState<Array<FullDesignDesc>>([]);
    const [projects, setProjects] = useState<Array<FullProjectDesc>>([]);
    const [isSortLatest, setIsSortLatest] = useState<boolean>(true);
    const [isProjectsLoaded, setIsProjectsLoaded] = useState<boolean>(false);
    const [isDesignsLoaded, setIsDesignsLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/fetchDesigns')
            .then((res) => res.json())
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
            .then((res) => res.json())
            .then(
                (projects) => {
                    if (isSortLatest) {
                        setProjects(
                            projects.sort(
                                (p1: FullProjectDesc, p2: FullProjectDesc) =>
                                    p2.devyear - p1.devyear
                            )
                        );
                    } else {
                        setProjects(
                            projects.sort(
                                (p1: FullProjectDesc, p2: FullProjectDesc) =>
                                    p1.devyear - p2.devyear
                            )
                        );
                    }
                    setIsProjectsLoaded(true);
                },
                (ex) => {
                    console.log('Fetch failed, ', ex);
                    setIsProjectsLoaded(false);
                }
            );
    }, [isSortLatest]);

    console.log('found ' + designs.length + ' design items from DB..');
    console.log('found ' + projects.length + ' project items from DB..');

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
                        <h2 className="display-4">
                            <b>Projects</b>
                        </h2>
                        <p className="lead">
                            {labelInstance.getLabel('intro_msg')}
                        </p>
                        <hr className="my-4" />
                        <p>{labelInstance.getLabel('intro_note')}</p>
                        <div className="dropdown show">
                            <a
                                className="btn btn-secondary dropdown-toggle"
                                href="/"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Sort Projects
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink">
                                <a
                                    className="dropdown-item"
                                    href="/"
                                    onClick={(e) => handleLatestClick(e, true)}>
                                    Latest
                                </a>
                                <a
                                    className="dropdown-item"
                                    href="/"
                                    onClick={(e) =>
                                        handleLatestClick(e, false)
                                    }>
                                    Oldest
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-list">
                        {isProjectsLoaded
                            ? projects.map(
                                  (project: FullProjectDesc, index: number) => {
                                      return (
                                          <ProjectCard
                                              key={index}
                                              projectDesc={project}
                                          />
                                      );
                                  }
                              )
                            : "Project details fetch request failed :'( please refresh the page again!"}
                        <hr className="my-4" />
                    </div>
                    <div className="item-intro" id="designs-link">
                        <h2 className="display-4">
                            <b>Design Works</b>
                        </h2>
                        <p className="lead">
                            {labelInstance.getLabel('cca_msg')}
                        </p>
                        <hr className="my-4" />
                        <p></p>
                    </div>
                    <div className="container-design">
                        <div>
                            <CardColumns>
                                {isDesignsLoaded
                                    ? designs.map(
                                          (
                                              design: FullDesignDesc,
                                              index: number
                                          ) => {
                                              return (
                                                  <DesignCard
                                                      key={index}
                                                      designProject={design}
                                                  />
                                              );
                                          }
                                      )
                                    : "Design details fetch request failed :'( please refresh the page again!"}
                            </CardColumns>
                        </div>
                    </div>
                    <hr className="my-4" />
                </div>
                <AnchorNavBar />
            </div>
            <FooterComponent />
        </div>
    );
};

export default Home;
