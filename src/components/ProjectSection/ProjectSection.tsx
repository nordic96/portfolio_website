import React, { useEffect, useState } from 'react';

import LabelContainer from 'labelcontainer';
import { FullProjectDesc } from '../../globals';
import ProjectCard from '../ProjectCard';
import { Grow } from '@mui/material';
import LoadingSkeleton from '../ProjectCard/LoadingSkeleton';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import CertificateSection from '../CertificateSection/CertificateSection';

const ProjectSection = () => {
    const labelInstance = LabelContainer.getInstance();
    const [projects, setProjects] = useState<Array<FullProjectDesc>>([]);
    const [isSortLatest, setIsSortLatest] = useState<boolean>(true);
    const [isProjectsLoaded, setIsProjectsLoaded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function handleLatestClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        isLatest: boolean
    ) {
        e.preventDefault();
        setIsSortLatest(isLatest);
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetch('/api/projects')
                .then((res) => res.json())
                .then(
                    (json) => {
                        const { projects } = json;
                        setProjects(projects);
                        setIsProjectsLoaded(true);
                        setLoading(false);
                    },
                    (ex) => {
                        console.log('Fetch failed, ', ex);
                        setIsProjectsLoaded(false);
                        setLoading(false);
                    }
                );
        }, 500);
    }, []);

    useEffect(() => {
        if (isSortLatest) {
            setProjects(
                projects.sort(
                    (p1: FullProjectDesc, p2: FullProjectDesc) =>
                        p1.devyear - p2.devyear
                )
            );
            return;
        }
        setProjects(
            projects.sort(
                (p1: FullProjectDesc, p2: FullProjectDesc) =>
                    p2.devyear - p1.devyear
            )
        );
    }, [isSortLatest]);

    return (
        <div className={'pt-16 max-sm:pt-24'}>
            <div
                id="projects-link"
                className={'flex flex-column align-middle items-center'}>
                <div className="flex flex-row align-middle lg:px-32 md:px-32 max-sm:px-4 gap-8">
                    <CertificateSection />
                    <Grow in timeout={2000}>
                        <div
                            className={
                                'flex items-center justify-center flex-column w-1/2 align-middle'
                            }>
                            <img
                                className={'lg:w-80 md:w-60 max-sm:w-48'}
                                src={'assets/images/sticker_lion.png'}
                                alt={'lion'}
                            />
                            <p
                                className={
                                    'lg:text-xl md:text-md max-sm:text-base max-sm:w-full'
                                }>
                                <i>{`"${labelInstance.getLabel(
                                    'intro_msg'
                                )}"`}</i>
                                &nbsp; &#128522;
                            </p>
                        </div>
                    </Grow>
                </div>
                <hr className="my-4" />
                <div
                    className={
                        'flex flex-row gap-2 align-middle justify-center'
                    }>
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
            <div className={'flex flex-wrap gap-2 justify-center pt-4 w-full'}>
                {loading
                    ? withLoadingSkeleton(LoadingSkeleton)(5)
                    : isProjectsLoaded
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
