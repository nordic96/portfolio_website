import React, { useEffect, useState } from 'react';

import LabelContainer from 'labelcontainer';
import { FullProjectDesc } from '../../globals';
import ProjectCard from '../ProjectCard';
import { Grow } from '@mui/material';

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
        fetch('/api/projects')
            .then((res) => res.json())
            .then(
                (json) => {
                    if (isSortLatest) {
                        setProjects(
                            json.projects.sort(
                                (p1: FullProjectDesc, p2: FullProjectDesc) =>
                                    p2.devyear - p1.devyear
                            )
                        );
                    } else {
                        setProjects(
                            json.projects.sort(
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
        <div className={'pt-4'}>
            <div id="projects-link" className={'flex flex-column flex-1'}>
                <Grow in timeout={2000}>
                    <div
                        className={
                            'flex items-center flex-1 justify-center flex-column'
                        }>
                        <img
                            className={'lg:w-80 md:w-60 max-sm:w-48'}
                            src={'assets/images/sticker_lion.png'}
                            alt={'lion'}
                        />
                        <p
                            className={
                                'lg:text-2xl md:text-xl max-sm:text-base w-1/2 max-sm:w-full text-black'
                            }>
                            <i>{`"${labelInstance.getLabel('intro_msg')}"`}</i>
                            &nbsp; &#128522;
                        </p>
                    </div>
                </Grow>
                <hr className="my-4" />
                <div
                    className={
                        'flex flex-row gap-2 align-middle justify-center'
                    }>
                    {/* <p>{labelInstance.getLabel('intro_note')}</p> */}
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
            </div>
            <div className={'flex flex-wrap gap-8 justify-center pt-4'}>
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
