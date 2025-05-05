'use client';
import React from 'react';

import LabelContainer from 'labelcontainer';
import { Download } from '@mui/icons-material';

interface ResumeBtnProps {
    label: string;
}

const ResumeButton: React.FC<ResumeBtnProps> = (props: ResumeBtnProps) => {
    const { label } = props;
    const lsInstance = LabelContainer.getInstance();
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(lsInstance.getLabel('url_resume'), '_blank');
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
