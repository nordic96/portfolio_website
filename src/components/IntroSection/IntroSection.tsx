import React from 'react';

import IDCard from '../IDCard';
import ResumeButton from '../ResumeButton';

import {
    generateCertificateIcons,
    generateIcons,
} from '../../constants/profileIcons';
import IDIcon from '../IDIcon/IDIcon';

const IntroSection = () => {
    return (
        <div
            className={
                'flex flex-column items-start max-w-xl sticky top-[20px] h-fit'
            }>
            <IDCard />
            <div
                className={
                    'flex flex-column justify-between items-start gap-4'
                }>
                <div className={'flex flex-column items-start text-left gap-2'}>
                    <p className={'text-4xl font-bold'}>{'GIHUN KO STEPHEN'}</p>
                    <div
                        className={
                            'flex flex-row gap-2 pt-2 border-t-4 border-black w-100'
                        }>
                        {generateIcons().map((x, i) => {
                            return <IDIcon {...x} key={i} />;
                        })}
                    </div>
                    <p className={'text-3xl font-bold'}>
                        {'SOFTWARE ENGINEER BASED IN SINGAPORE'}
                    </p>
                </div>
                <div className="flex flex-row gap-2">
                    {generateCertificateIcons().map((x, i) => {
                        return <IDIcon {...x} key={i} />;
                    })}
                </div>
                <p className={'text-2xl font-bold text-left'}>
                    {
                        'Curious Learner since 2018, Mastering my profession in Front-end & DevOps'
                    }
                </p>
                <ResumeButton />
            </div>
        </div>
    );
};

export default IntroSection;
