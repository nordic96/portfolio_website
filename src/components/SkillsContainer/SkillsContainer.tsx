import React from 'react';
import HeaderLabel from '../HeaderLabel';
import { ImgProps } from '../../types';
import { SKILLSECTIONS } from './constants';

export interface SkillSectionProps {
    sectionTitle: string;
    logos: ImgProps[];
}

const SkillSection = (props: SkillSectionProps) => {
    const { sectionTitle, logos } = props;
    return (
        <div className={'flex gap-4 flex-column'}>
            <HeaderLabel>{sectionTitle}</HeaderLabel>
            <div className={'flex flexwrap gap-2 align-center items-center justify-end'}>
                {logos.map((logo, key) => {
                    return <img key={key} {...logo} />;
                })}
            </div>
        </div>
    );
};

const SkillsContainer = () => {
    return (
        <div className={'flex flex-column gap-4 items-end'}>
            {SKILLSECTIONS.map((props, key) => {
                return <SkillSection {...props} key={key} />;
            })}
        </div>
    );
};

export default React.memo(SkillsContainer);
