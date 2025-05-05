import React, { PropsWithChildren } from 'react';

interface HeaderLabelProps {
    class?: string;
}

const HeaderLabel = (props: PropsWithChildren<HeaderLabelProps>) => {
    return (
        <label className="lg:text-2xl max-sm:text-lg text-left text-shadow-sm font-semibold uppercase flex gap-1 items-center">
            {props.children}
        </label>
    );
};

export default HeaderLabel;
