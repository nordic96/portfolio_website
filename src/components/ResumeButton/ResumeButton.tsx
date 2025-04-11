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
                'rounded px-4 py-2 bg-gradient-to-r from-coolblue to-coolred hover:to-blue-600 shadow-lg'
            }
            onClick={onClick}>
            <p className={'text-white uppercase font-semibold text-lg max-sm:text-sm'}>
                View Resume
                <Download />
            </p>
        </button>
    );
};

export default ResumeButton;
