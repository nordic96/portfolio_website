import React, { useEffect, useState } from 'react';

import { FullProjectDesc } from '../../globals';
import ProjectCard from '../ProjectCard';
import LoadingSkeleton from '../ProjectCard/LoadingSkeleton';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import HeaderLabel from '../HeaderLabel/HeaderLabel';
import LabelContainer from 'labelcontainer';
import IconComp from '../common/IcomComp';
import Divider from '@mui/material/Divider';
import Description from '../common/Description';

const ProjectSection = () => {
    const [projects, setProjects] = useState<Array<FullProjectDesc>>([]);
    const [isProjectsLoaded, setIsProjectsLoaded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const lsInstance = LabelContainer.getInstance();

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

    return (
        <div
            className={
                'flex flex-column gap-5 justify-center max-w-xl lg:items-end max-sm:items-center'
            }>
            <div
                className={
                    'flex flex-column text-start w-full justify-start max-w-[32rem]'
                }>
                <HeaderLabel>
                    <IconComp icon={'Description'} />
                    {lsInstance.getLabel('heading_project')}
                </HeaderLabel>
                <Description>
                    {lsInstance.getLabel('project_desc_label')}
                </Description>
                <Divider className={'my-4 lg:w-[32rem] max-sm:w-full'} />
            </div>
            {loading
                ? withLoadingSkeleton(LoadingSkeleton)(5)
                : isProjectsLoaded
                ? projects.map((project: FullProjectDesc, index: number) => {
                      return <ProjectCard key={index} projectDesc={project} />;
                  })
                : "Project details fetch request failed :'( please refresh the page again!"}
        </div>
    );
};

export default ProjectSection;
