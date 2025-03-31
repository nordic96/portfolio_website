import React from 'react';

export interface IDIconProps {
    href: string;
    src: string;
    className?: string;
    spanClassName?: string;
}

const IDIcon = (props: IDIconProps) => {
    const { href, src, className, spanClassName } = props;
    return (
        <span className={spanClassName}>
            <a href={href} target="_blank" rel="noreferrer">
                <img className={className ?? 'link-icon'} src={src} alt={src} />
            </a>
        </span>
    );
};

export default IDIcon;
