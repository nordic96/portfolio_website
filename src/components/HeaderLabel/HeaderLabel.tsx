import React, { PropsWithChildren } from 'react';

interface HeaderLabelProps {
    class?: string;
}

const HeaderLabel = (props: PropsWithChildren<HeaderLabelProps>) => {
    return (
        <p className="text-2xl text-left font-bold uppercase">
            {props.children}
        </p>
    );
};

export default HeaderLabel;
