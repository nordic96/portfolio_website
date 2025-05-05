import React from 'react';
import HeaderLabel from '../HeaderLabel';
import { ImgProps } from '../../types';
import { generateSkillSections, SkillCatIconMap } from './constants';
import { SkillCategory } from './types';
import IconComp from '../common/IcomComp';
import LabelContainer from 'labelcontainer';
import Divider from '../common/Divider';
import Description from '../common/Description';

export interface SkillSectionProps {
    category: SkillCategory;
    logos: ImgProps[];
}

const SkillSection = (props: SkillSectionProps) => {
    const { logos, category } = props;
    const lsInstance = LabelContainer.getInstance();
    return (
        <div className={'flex gap-4 flex-col items-end max-sm:items-start'}>
            <HeaderLabel>
                <IconComp icon={SkillCatIconMap[category]} />
                {lsInstance.getLabel(`section_title_${category}`)}
            </HeaderLabel>
            <div
                className={
                    'flex flex-wrap gap-2 items-center w-full lg:justify-end'
                }>
                {logos.map((logo, key) => {
                    const className = `transition-all duration-200 ease-in-out hover:scale-120 ${logo.className}`;
                    return (
                        <img
                            key={key}
                            alt={logo.alt}
                            {...logo}
                            className={className}
                        />
                    );
                })}
            </div>
        </div>
    );
};

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
