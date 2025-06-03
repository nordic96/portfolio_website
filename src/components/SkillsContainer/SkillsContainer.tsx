import React from 'react';
import HeaderLabel from '../HeaderLabel';
import { generateSkillSections } from './constants';
import IconComp from '../common/IcomComp';
import LabelContainer from 'labelcontainer';
import Divider from '../common/Divider';
import Description from '../common/Description';
import SkillSection from './SkillSection/SkillSection';

const SkillsContainer = () => {
    const lsInstance = LabelContainer.getInstance();
    const isDark = false;
    return (
        <div className={'flex flex-col lg:items-end max-sm:items-start'}>
            <div
                className={
                    'max-w-[32rem] flex flex-col items-start text-start'
                }>
                <HeaderLabel>
                    <IconComp icon={'EmojiObjects'} />
                    {lsInstance.getLabel('heading_skills')}
                </HeaderLabel>
                <Description>
                    {lsInstance.getLabel('skills_desc_label')}
                </Description>
                <Divider className={'my-4 lg:w-[32rem] max-sm:w-full'} />
            </div>
            <div
                className={
                    'flex flex-col lg:items-end max-sm:items-start items-start text-start gap-4 lg:pb-8 max-sm:pb-4'
                }>
                {generateSkillSections(isDark).map((props, key) => {
                    return <SkillSection {...props} key={key} />;
                })}
            </div>
        </div>
    );
};

export default SkillsContainer;
