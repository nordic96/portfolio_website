'use client';
import React from 'react';

import { Download } from '@mui/icons-material';

interface ResumeBtnProps {
    label: string;
    url: string;
}

const ResumeButton: React.FC<ResumeBtnProps> = (props: ResumeBtnProps) => {
    const { label, url } = props;
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(url, '_blank');
    };

    return (
        <button
            className={
                'rounded-sm px-4 py-2 bg-linear-to-r from-coolblue to-coolred hover:to-blue-600 shadow-lg'
            }
            onClick={onClick}>
            <label
                className={
                    'text-white uppercase font-semibold text-xl max-sm:text-base'
                }>
                {label}
                <Download />
            </label>
        </button>
    );
};

export default ResumeButton;
