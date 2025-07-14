import React from 'react';
import HeaderLabel from '../HeaderLabel';
import LabelContainer from 'labelcontainer';
import Link from 'next/link';
import GradientButton from '../GradientButton/GradientButton';
import { LocalOffer } from '@mui/icons-material';

const HistorySection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'flex flex-col gap-8 lg:items-center max-sm:items-start max-sm:text-start'
            }>
            <HeaderLabel>{lsInstance.getLabel('heading_history')}</HeaderLabel>
            <p className="lg:text-xl max-sm:text-base font-italic text-gray-500 dark:text-[#fefefe] max-w-5xl">
                {lsInstance.getLabel('history_desc')}
            </p>
            <Link href={'/changelogs'}>
                <GradientButton>
                    {lsInstance.getLabel('btn_view_changelogs')}
                    <LocalOffer />
                </GradientButton>
            </Link>
            <div>
                <img
                    className={'lg:max-w-[72rem] max-sm:w-full'}
                    src={'assets/images/history_img.PNG'}
                    alt="history_section_img"
                />
            </div>
        </div>
    );
};

export default HistorySection;
