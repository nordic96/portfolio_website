import React from 'react';

export interface CertBadgeProps {
    href: string;
    src: string;
    spanClassName?: string;
    title: string;
    desc: string;
}

const CertBadge = (props: CertBadgeProps) => {
    const { src, href, spanClassName, title, desc } = props;
    return (
        <div className={'flex flex-column radius-1 items-center gap-1 px-1 w-32'}>
            <span className={spanClassName}>
                <img className={'w-32 hover:motion-safe:animate-bounce'} src={src} />
            </span>
            <a href={href}>
                <p className={'text-cyan-600 font-semibold text-base'}>{title}</p>
            </a>
            <p>{desc}</p>
        </div>
    );
};

export default CertBadge;
