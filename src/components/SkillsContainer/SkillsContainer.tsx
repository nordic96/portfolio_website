import React from 'react';
import HeaderLabel from '../HeaderLabel';
import { ImgProps } from '../../types';
import { generateSkillSections, SkillCatIconMap } from './constants';
import { useTheme } from 'next-themes';
import { SkillCategory } from './types';
import IconComp from '../common/IcomComp';
import LabelContainer from 'labelcontainer';
import { Divider } from '@mui/material';
import Description from '../common/Description';

export interface SkillSectionProps {
    category: SkillCategory;
    logos: ImgProps[];
}

const SkillSection = (props: SkillSectionProps) => {
    const { logos, category } = props;
    const lsInstance = LabelContainer.getInstance();
    return (
        <div className={'flex gap-4 flex-column items-end max-sm:items-start'}>
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
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const lsInstance = LabelContainer.getInstance();
    const isDark = currentTheme === 'dark';
    return (
        <div className={'flex flex-column lg:items-end max-sm:items-start'}>
            <div
                className={
                    'max-w-[32rem] flex flex-column items-start text-start'
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
                    'flex flex-column lg:items-end max-sm:items-start items-start text-start gap-4'
                }>
                {generateSkillSections(isDark).map((props, key) => {
                    return <SkillSection {...props} key={key} />;
                })}
            </div>
        </div>
    );
};

export default SkillsContainer;
