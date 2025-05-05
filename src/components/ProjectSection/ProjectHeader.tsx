import React from 'react';
import HeaderLabel from '../HeaderLabel';
import LabelContainer from 'labelcontainer';
import IconComp from '../common/IcomComp';
import Description from '../common/Description';
import Divider from '../common/Divider';

const ProjectHeader = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div className={'flex flex-col text-start w-full max-w-[32rem]'}>
            <HeaderLabel>
                <IconComp icon={'Description'} />
                {lsInstance.getLabel('heading_project')}
            </HeaderLabel>
            <Description>
                {lsInstance.getLabel('project_desc_label')}
            </Description>
            <Divider className={'my-4 lg:w-[32rem] max-sm:w-full'} />
        </div>
    );
};

export default ProjectHeader;
