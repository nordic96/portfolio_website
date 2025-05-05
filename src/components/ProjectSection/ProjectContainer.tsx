import React from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectSection from './ProjectSection';

const ProjectContainer = () => {
    return (
        <div
            className={
                'flex flex-col gap-5 justify-center max-w-xl lg:items-end'
            }>
            <ProjectHeader />
            <ProjectSection />
        </div>
    );
};

export default ProjectContainer;
