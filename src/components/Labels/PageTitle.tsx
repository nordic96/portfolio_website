import React, { PropsWithChildren } from 'react';

const PageTitle: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
    return (
        <label className={'text-3xl max-sm:text-2xl font-bold'}>
            {props.children}
        </label>
    );
};

export default PageTitle;
