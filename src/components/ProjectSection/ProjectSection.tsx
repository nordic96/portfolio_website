'use client';
import React, { useLayoutEffect } from 'react';

import ProjectCard from '../ProjectCard';
import LoadingSkeleton from '../ProjectCard/LoadingSkeleton';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import { useAtom } from 'jotai';
import {
    asyncFetchProjectsAtom,
    readonlyProjectsAtom,
} from '../../store/projectsAtom';
import { readOnlyLoadingAtom } from '../../store/loadingAtom';
import { IProject } from '../../models/projects';

const ProjectSection = () => {
    const [, fetchProjects] = useAtom(asyncFetchProjectsAtom);
    const [projects] = useAtom(readonlyProjectsAtom);
    const [loading] = useAtom(readOnlyLoadingAtom);
    const isLoading = loading['projects'];

    useLayoutEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className={'flex flex-col gap-5 justify-center lg:w-[32rem]'}>
            {isLoading || projects.length <= 0
                ? withLoadingSkeleton(LoadingSkeleton)(5)
                : projects.map((project: IProject, index: number) => {
                      return <ProjectCard key={index} projectDesc={project} />;
                  })}
        </div>
    );
};

export default ProjectSection;
