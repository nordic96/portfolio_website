import React from 'react';

export interface IDIconProps {
    href: string;
    src: string;
    spanClassName?: string;
}

const IDIcon = (props: IDIconProps) => {
    const { href, src, spanClassName } = props;
    return (
        <span className={spanClassName}>
            <a href={href} target="_blank" rel="noreferrer">
                <img className={'h-8 transition-all duration-200 ease-in-out hover:scale-150'} src={src} alt={src} />
            </a>
        </span>
    );
};

export default IDIcon;
