import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import { useTheme } from 'next-themes';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

const SkeletonComp = (props: SkeletonProps) => {
    const { systemTheme } = useTheme();
    return (
        <Skeleton
            {...props}
            baseColor={systemTheme === 'dark' ? '#24292F' : undefined}
            highlightColor={systemTheme === 'dark' ? '#383C42' : undefined}
        />
    );
};

export default SkeletonComp;
