import React from 'react';
import HeaderLabel from '../HeaderLabel';

const HistorySection = () => {
    return (
        <div className={'flex flex-column gap-2 items-center'}>
            <HeaderLabel>{'ON CONSTANT DEVELOPMENT SINCE 2021'}</HeaderLabel>
            <p className="text-xl">
                {
                    'It first started as my stand-out purpose while I was a graduate student, deseparately looking for job'
                }
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

export default React.memo(HistorySection);
