import React from 'react';

const MockSkeleton = (props) => {
    const { children, ...rest } = props;
    return (
        <div id="skeleton-mock" {...rest}>
            {children}
        </div>
    );
};

export default MockSkeleton;
