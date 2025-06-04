import React from 'react';

import LabelContainer from 'labelcontainer';

import HeaderLabel from '../HeaderLabel';
import IconComp from '../common/IcomComp';
import Divider from '../common/Divider';
import Description from '../common/Description';
import SkillSection from './SkillSection/SkillSection';

import { SkillCategoryArr } from './types';

const SkillsContainer = () => {
    const lsInstance = LabelContainer.getInstance();
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
                {SkillCategoryArr.map((category, key) => {
                    return <SkillSection category={category} key={key} />;
                })}
            </div>
        </div>
    );
};

export default SkillsContainer;
