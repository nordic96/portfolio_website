import LabelContainer from 'labelcontainer';
import React, { useEffect, useState } from 'react';
import { FullProjectDesc } from '../../globals';
import ProjectCard from '../ProjectCard';

const ProjectSection = () => {
    const labelInstance = LabelContainer.getInstance();
    const [projects, setProjects] = useState<Array<FullProjectDesc>>([]);
    const [isSortLatest, setIsSortLatest] = useState<boolean>(true);
    const [isProjectsLoaded, setIsProjectsLoaded] = useState<boolean>(false);

    function handleLatestClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        isLatest: boolean
    ) {
        e.preventDefault();
        setIsSortLatest(isLatest);
    }

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

    return (
        <div>
            <div className="item-intro" id="projects-link">
                <h2 className="display-4">
                    <b>Projects</b>
                </h2>
                <p className="lead">{labelInstance.getLabel('intro_msg')}</p>
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
                            onClick={(e) => handleLatestClick(e, false)}>
                            Oldest
                        </a>
                    </div>
                </div>
            </div>
            <div className={'flex flex-wrap gap-8'}>
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
        </div>
    );
};

export default ProjectSection;
