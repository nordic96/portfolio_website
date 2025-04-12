import React, { PropsWithChildren } from 'react';

interface HeaderLabelProps {
    class?: string;
}

const HeaderLabel = (props: PropsWithChildren<HeaderLabelProps>) => {
    return (
        <p className="lg:text-2xl max-sm:text-xl text-left font-semibold uppercase">
            {props.children}
        </p>
    );
};

export default HeaderLabel;
