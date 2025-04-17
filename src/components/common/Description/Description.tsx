import React from 'react';

const Description = (props: React.PropsWithChildren<unknown>) => {
    const { children } = props;
    return (
        <p className={'flex text-lg max-sm:text-base max-sm:w-full'}>
            {children}
        </p>
    );
};

export default Description;
