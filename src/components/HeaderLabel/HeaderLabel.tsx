import React, { PropsWithChildren } from 'react';

interface HeaderLabelProps {
    class?: string;
}

const HeaderLabel = (props: PropsWithChildren<HeaderLabelProps>) => {
    return (
        <p className="lg:text-2xl max-sm:text-lg text-left text-shadow-sm font-semibold uppercase flex gap-1 items-center">
            {props.children}
        </p>
    );
};

export default HeaderLabel;
