import React from 'react';

import SkillSection from './components/SkillSection/SkillSection';

import { SkillCategoryArr } from './types';
import withHeader from '../../app/hooks/withHeader';

const SkillsContainer = () => {
    return (
        <div
            className={
                'flex flex-col items-start text-start gap-4 lg:pb-8 max-sm:pb-4'
            }>
            {SkillCategoryArr.map((category, key) => {
                return <SkillSection category={category} key={key} />;
            })}
        </div>
    );
};

export default withHeader(SkillsContainer, 'skills', { icon: 'EmojiObjects' });
