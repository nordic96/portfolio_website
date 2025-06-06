import React from 'react';

import HeaderLabel from '../../../HeaderLabel';
import IconComp from '../../../common/IcomComp';
import { SkillCatIconMap } from '../../constants';
import LabelContainer from 'labelcontainer';
import LogoContainer from '../LogoContainer/LogoContainer';
import { SkillCategory } from '../../types';

export interface SkillSectionProps {
    category: SkillCategory;
}

const SkillSection = (props: SkillSectionProps) => {
    const { category } = props;
    const lsInstance = LabelContainer.getInstance();
    return (
        <div className={'flex gap-4 flex-col items-end max-sm:items-start'}>
            <HeaderLabel>
                <IconComp icon={SkillCatIconMap[category]} />
                {lsInstance.getLabel(`section_title_${category}`)}
            </HeaderLabel>
            <LogoContainer category={category} />
        </div>
    );
};

export default SkillSection;
