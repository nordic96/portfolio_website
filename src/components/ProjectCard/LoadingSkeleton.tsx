import React from 'react';
import Skeleton from '../SkeletonComp';

const LoadingSkeleton = () => {
    return (
        <div className={'w-1/4 max-sm:w-full flex flex-column text-left'}>
            <Skeleton height={200} />
            <Skeleton width={'70%'} />
            <Skeleton width={'50%'} />
        </div>
    );
};

export default LoadingSkeleton;
