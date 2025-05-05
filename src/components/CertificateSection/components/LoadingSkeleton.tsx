import React from 'react';
import Skeleton from '../../SkeletonComp';

const LoadingSkeleton = () => {
    return (
        <div className={'min-w-36 max-sm:min-w-32'}>
            <Skeleton height={28} />
            <Skeleton width={'50%'} />
        </div>
    );
};

export default LoadingSkeleton;
