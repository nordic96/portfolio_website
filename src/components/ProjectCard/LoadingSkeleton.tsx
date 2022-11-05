import { useTheme } from 'next-themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeleton = () => {
    const { systemTheme } = useTheme();
    console.log(systemTheme);
    return (
        <div className={'w-1/4 max-sm:w-full flex flex-column text-left'}>
            <Skeleton
                height={200}
                baseColor={systemTheme === 'dark' ? '#24292F' : undefined}
                highlightColor={systemTheme === 'dark' ? '#383C42' : undefined}
            />
            <Skeleton
                width={'70%'}
                baseColor={systemTheme === 'dark' ? '#24292F' : undefined}
                highlightColor={systemTheme === 'dark' ? '#383C42' : undefined}
            />
            <Skeleton
                width={'50%'}
                baseColor={systemTheme === 'dark' ? '#24292F' : undefined}
                highlightColor={systemTheme === 'dark' ? '#383C42' : undefined}
            />
        </div>
    );
};

export default LoadingSkeleton;
