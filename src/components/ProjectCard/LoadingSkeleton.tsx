import React from 'react';
import Skeleton from '../SkeletonComp';

const LoadingSkeleton = () => {
    return (
        <div className={'skeleton-container'}>
            <Skeleton height={200} />
            <Skeleton width={'70%'} />
            <Skeleton width={'50%'} />
        </div>
    );
};

export default LoadingSkeleton;
