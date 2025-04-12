import React from 'react';

interface DividerProps {
    className?: string;
}

const Divider = (props: DividerProps) => {
    const { className } = props;
    return <hr className={className ?? 'my-4 lg:w-[70.5rem] max-sm:w-full'} />;
};

export default Divider;
