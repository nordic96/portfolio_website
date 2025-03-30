import React from 'react';

import IDCard from '../IDCard';
import { Grow } from '@mui/material';
import ResumeButton from '../ResumeButton';

import LabelContainer from 'labelcontainer';

const IntroSection = () => {
    const lsInstance = LabelContainer.getInstance();

    return (
        <div className={'flex relative flex-column items-center'}>
            <div
                className={
                    'flex flex-1 flex-wrap lg:pt-10 md:pt-10 max-sm:pt-8 md:px-4 justify-center items-center lg:gap-24 md:gap-4 '
                }>
                <Grow in timeout={1000}>
                    <div
                        className={
                            'flex flex-column justify-between items-start lg:h-64 md:h-48 w-1/2 gap-4'
                        }>
                        <div
                            className={
                                'flex flex-column items-start text-left'
                            }>
                            <p
                                className={
                                    'lg:text-4xl md:text-2xl max-sm:text-base font-bold'
                                }>
                                {lsInstance.getLabel('title')}
                            </p>
                            <p
                                className={
                                    'lg:text-3xl md:text-xl max-sm:text-sm'
                                }>
                                {lsInstance.getLabel('title_desc')}
                            </p>
                            <p
                                className={
                                    'bg-yellow-400 lg:text-2xl md:text-lg max-sm:text-sm'
                                }>
                                {lsInstance.getLabel('title_desc2')}
                            </p>
                            <p className={'lg:text-base max-sm:text-xs'}>
                                {lsInstance.getLabel('intro_desc')}
                            </p>
                        </div>
                        <ResumeButton />
                    </div>
                </Grow>
                <IDCard />
            </div>
        </div>
    );
};

export default IntroSection;
