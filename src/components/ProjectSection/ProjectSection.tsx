'use client';
import React, { useEffect, useState } from 'react';

import ProjectCard from '../ProjectCard';
import LoadingSkeleton from '../ProjectCard/LoadingSkeleton';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import { useAtom } from 'jotai';
import {
    asyncFetchProjectsAtom,
    readonlyProjectsAtom,
    SortOrder,
} from '../../store/projectsAtom';
import { readOnlyLoadingAtom } from '../../store/loadingAtom';
import { IProject } from '../../models/project/Project';

const ProjectSection = () => {
    const [, fetchProjects] = useAtom(asyncFetchProjectsAtom);
    const [projects] = useAtom(readonlyProjectsAtom);
    const [loading] = useAtom(readOnlyLoadingAtom);
    const isLoading = loading['projects'];
    const [sortVal, setSortVal] = useState<SortOrder>('DESC');

    useEffect(() => {
        fetchProjects(sortVal);
    }, [sortVal]);

    const onSortValChange: React.ChangeEventHandler<HTMLSelectElement> = (
        event
    ) => {
        event.preventDefault();
        setSortVal(event.target.value as SortOrder);
    };

    return (
        <div className={'flex flex-col gap-8'}>
            <div
                className={
                    'flex flex-row justify-end items-center text-xl max-sm:text-lg gap-3'
                }>
                <select
                    id="project-sort-dropdown"
                    onChange={onSortValChange}
                    className={
                        'bg-siablue text-white px-2 max-sm:px-1 py-1 items-center rounded-md'
                    }>
                    <option value="DESC">Latest</option>
                    <option value="ASC">Earliest</option>
                </select>
            </div>
            <div className={'flex flex-col gap-5 justify-center lg:w-[32rem]'}>
                {isLoading || projects.length <= 0
                    ? withLoadingSkeleton(LoadingSkeleton)(5)
                    : projects.map((project: IProject, index: number) => {
                          return (
                              <ProjectCard key={index} projectDesc={project} />
                          );
                      })}
            </div>
        </div>
    );
};

export default ProjectSection;
