import React from 'react';
import HeaderLabel from '../HeaderLabel';
import LabelContainer from 'labelcontainer';

const HistorySection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div className={'flex flex-column gap-4 items-center'}>
            <HeaderLabel>{lsInstance.getLabel('heading_history')}</HeaderLabel>
            <p className="text-xl text-gray-500 max-w-5xl">
                {lsInstance.getLabel('history_desc')}
            </p>
            <div>
                <img
                    className={'max-w-[72rem]'}
                    src={'assets/images/history_img.PNG'}
                    alt="history_section_img"
                />
            </div>
        </div>
    );
};

export default HistorySection;
