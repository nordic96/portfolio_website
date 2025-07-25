'use client';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    asyncFetchReleasesAtom,
    readOnlyReleasesAtom,
} from '../../store/releasesAtom';
import { readOnlyLoadingAtom } from '../../store/loadingAtom';

import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import LoadingSkeleton from '../../components/ProjectCard/LoadingSkeleton';
import ChangeLog from '../../components/ChangeLog';

const displayLoading = withLoadingSkeleton(LoadingSkeleton);

const ChangelogContent: React.FC<{}> = () => {
    const [, asyncFetchRelease] = useAtom(asyncFetchReleasesAtom);
    const [releases] = useAtom(readOnlyReleasesAtom);
    const [isLoading] = useAtom(readOnlyLoadingAtom);

    useEffect(() => {
        asyncFetchRelease();
    }, []);

    return (
        <div
            className={
                'flex flex-wrap gap-12 py-16 max-sm:py-2 max-sm:gap-8 min-h-[50rem]'
            }>
            {isLoading['releases'] && displayLoading(5)}
            {!isLoading['releases'] &&
                releases.map((r, id) => {
                    return <ChangeLog release={r} key={id} />;
                })}
        </div>
    );
};

export default ChangelogContent;
