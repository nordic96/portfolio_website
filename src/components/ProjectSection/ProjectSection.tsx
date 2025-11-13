'use client';
import React, { useEffect, useState } from 'react';

import ProjectCard from '../ProjectCard';
import LoadingSkeleton from '../ProjectCard/LoadingSkeleton';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    asyncFetchProjectsAtom,
    readonlyProjectsAtom,
    SortOrder,
} from '../../store/projectsAtom';
import { IProject } from '../../models/project/Project';
import withSuspense from '../../app/hooks/withSuspense';
import { readOnlyLoadingAtom } from '../../store/loadingAtom';

const LoadingComp = withLoadingSkeleton(LoadingSkeleton)(3);
const ProjectSection = () => {
    const fetchProjects = useSetAtom(asyncFetchProjectsAtom);
    const projects = useAtomValue(readonlyProjectsAtom);
    const loading = useAtomValue(readOnlyLoadingAtom);
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
                    ? LoadingComp
                    : projects.map((project: IProject, _: number) => {
                          return (
                              <MemoizedProjectCard
                                  key={project.id}
                                  projectDesc={project}
                              />
                          );
                      })}
            </div>
        </div>
    );
};

const MemoizedProjectCard = React.memo(ProjectCard);
export default withSuspense(ProjectSection, LoadingComp);
