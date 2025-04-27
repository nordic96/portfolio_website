'use client';
import React from 'react';

import LabelContainer from 'labelcontainer';
import { Download } from '@mui/icons-material';

const ResumeButton = () => {
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
                {lsInstance.getLabel('btn_resume')}
                <Download />
            </label>
        </button>
    );
};

export default ResumeButton;
