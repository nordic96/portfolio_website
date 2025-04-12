import React from 'react';
import HeaderLabel from '../HeaderLabel';
import { ImgProps } from '../../types';
import { generateSkillSections } from './constants';

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
    return (
        <div
            className={
                'flex flex-column gap-4 lg:items-end max-sm:items-start'
            }>
            {generateSkillSections().map((props, key) => {
                return <SkillSection {...props} key={key} />;
            })}
        </div>
    );
};

export default SkillsContainer;
