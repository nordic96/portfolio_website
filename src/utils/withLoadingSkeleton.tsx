import React from 'react';

const withLoadingSkeleton = (Component: React.ComponentType) => {
    return function (n: number): React.ReactNode {
        const arr = new Array(n).fill(0);
        return (
            <>
                {arr.map((_x, i) => {
                    return <Component key={i} />;
                })}
            </>
        );
    };
};

export default withLoadingSkeleton;
