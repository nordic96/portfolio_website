import React from 'react';

const HistorySection = () => {
    return (
        <div className={'flex flex-column gap-2'}>
            <p className={'text-2xl font-bold'}>
                {'ON CONSTANT DEVELOPMENT SINCE 2021'}
            </p>
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
