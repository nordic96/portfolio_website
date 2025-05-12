import React from 'react';
import { CertificateDTO } from '../../../../models/cetificate/Certificate';

const COLOR_MAP: Record<string, string> = {
    violet: 'shadow-violet-500/50',
    slate: 'shadow-slate-500/50',
    indigo: 'shadow-indigo-500/50',
    teel: 'shadow-teel-500/50',
    default: '',
};

const CertBadge: React.FC<CertificateDTO> = (props: CertificateDTO) => {
    const { theme_color, name, credentials_url, year_obtained, logo_src } =
        props;
    let baseClass =
        'flex flex-col rounded-md radius-1 shadow-md text-center dark:bg-gray-800 px-2 py-1 max-sm:px-1 items-center gap-1 w-36 max-sm:w-32 text-black dark:text-white ';
    baseClass = baseClass.concat(COLOR_MAP[theme_color]);

    return (
        <a
            data-testid={'credentials_url'}
            href={credentials_url}
            target={'_blank'}
            rel="noreferrer">
            <div data-testid={'badge_container'} className={baseClass}>
                <p>{year_obtained}</p>
                <span className={`rounded-full bg-radial backdrop-opacity-10`}>
                    <img
                        alt={'cert-badge'}
                        className={
                            'h-28 max-sm:h-20 motion-safe:hover:animate-bounce'
                        }
                        src={logo_src}
                    />
                </span>
                <p className={'text-base font-semibold uppercase'}>{name}</p>
            </div>
        </a>
    );
};

export default CertBadge;
