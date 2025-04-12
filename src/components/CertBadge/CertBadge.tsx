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
        <div
            className={
                'flex flex-column radius-1 items-center gap-1 w-32 max-sm:w-24'
            }>
            <p className={'flex rounded-full bg-sky-900 px-2 text-white'}>
                {desc}
            </p>
            <a href={href} target={'_blank'} rel="noreferrer">
                <span className={spanClassName}>
                    <img
                        alt={'cert-badge'}
                        className={'w-full hover:motion-safe:animate-bounce'}
                        src={src}
                    />
                </span>
                <p className={'text-sky-900 font-semibold text-base'}>
                    {title}
                </p>
            </a>
        </div>
    );
};

export default CertBadge;
