import React from 'react';

export interface IDIconProps {
    href: string;
    src: string;
}

const IDIcon = (props: IDIconProps) => {
    const { href, src } = props;
    return (
        <a href={href} target="_blank" rel="noreferrer">
            <img className="link-icon" src={src} alt={src} />
        </a>
    );
};

export default IDIcon;
