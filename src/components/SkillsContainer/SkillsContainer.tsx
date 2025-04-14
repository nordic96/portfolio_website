import React from 'react';
import HeaderLabel from '../HeaderLabel';
import { ImgProps } from '../../types';
import { generateSkillSections } from './constants';
import { useTheme } from 'next-themes';

export interface SkillSectionProps {
    sectionTitle: string;
    logos: ImgProps[];
}

const SkillSection = (props: SkillSectionProps) => {
    const { sectionTitle, logos } = props;
    return (
        <div className={'flex gap-4 flex-column items-end max-sm:items-start'}>
            <HeaderLabel>{sectionTitle}</HeaderLabel>
            <div
                className={
                    'flex flex-wrap gap-2 items-center w-full lg:justify-end'
                }>
                {logos.map((logo, key) => {
                    return <img key={key} alt={logo.alt} {...logo} />;
                })}
            </div>
        </div>
    );
};

const SkillsContainer = () => {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    return (
        <div
            className={
                'flex flex-column gap-4 lg:items-end max-sm:items-start'
            }>
            {generateSkillSections(isDark).map((props, key) => {
                return <SkillSection {...props} key={key} />;
            })}
        </div>
    );
};

export default SkillsContainer;
