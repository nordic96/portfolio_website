'use client';

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    asyncFetchSkillsByCategory,
    readOnlySkillsAtom,
} from '../../../../store/skillsAtom';
import { SkillCategory } from '../../types';
import { readOnlyLoadingAtom } from '../../../../store/loadingAtom';
import Skeleton from '../../../SkeletonComp';
import withLoadingSkeleton from '../../../../utils/withLoadingSkeleton';
import SkillLogo from './SkillLogo';

interface LogoContainerProps {
    category: SkillCategory;
}

const LoadingSkeleton = () => {
    return (
        <div
            className={
                'flex items-center justify-center min-w-12 max-sm:min-w-8'
            }>
            <Skeleton height={40} width={40} borderRadius={16} />
        </div>
    );
};

const LogoContainer: React.FC<LogoContainerProps> = (
    props: LogoContainerProps
) => {
    const { category } = props;
    const [isLoading] = useAtom(readOnlyLoadingAtom);
    const [, fetchSkill] = useAtom(asyncFetchSkillsByCategory);
    const [skills] = useAtom(readOnlySkillsAtom);

    useEffect(() => {
        if (skills[category].length === 0) {
            fetchSkill(category);
        }
    }, []);

    return (
        <div
            className={
                'flex flex-wrap gap-2 items-center w-full lg:justify-end'
            }>
            {!isLoading['skills']
                ? skills[category].map((skill, key) => (
                      <SkillLogo key={key} skill={skill} />
                  ))
                : withLoadingSkeleton(LoadingSkeleton)(5)}
        </div>
    );
};

export default LogoContainer;
