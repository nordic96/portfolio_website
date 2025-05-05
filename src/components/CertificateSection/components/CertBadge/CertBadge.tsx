import React from 'react';

export interface CertBadgeProps {
    href: string;
    src: string;
    title: string;
    desc: string;
}

const CertBadge = (props: CertBadgeProps) => {
    const { src, href, title, desc } = props;
    return (
        <a href={href} target={'_blank'} rel="noreferrer">
            <div
                className={
                    'flex flex-col rounded-md radius-1 shadow-md text-center dark:bg-gray-800 px-2 py-1 max-sm:px-1 items-center gap-1 w-36 max-sm:w-32 text-black dark:text-white'
                }>
                <p>{desc}</p>
                <span
                    className={
                        'rounded-full bg-radial from-teal-400 from-5% to-teal-100 backdrop-opacity-10'
                    }>
                    <img
                        alt={'cert-badge'}
                        className={
                            'h-28 max-sm:h-20 motion-safe:hover:animate-bounce'
                        }
                        src={src}
                    />
                </span>
                <p className={'text-base font-semibold uppercase'}>{title}</p>
            </div>
        </a>
    );
};

export default CertBadge;
