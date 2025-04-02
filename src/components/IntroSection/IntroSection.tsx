import React from 'react';

import IDCard from '../IDCard';
import ResumeButton from '../ResumeButton';

import {
    generateCertificateIcons,
    generateIcons,
} from '../../constants/profileIcons';
import IDIcon from '../IDIcon/IDIcon';
import CertBadge from '../CertBadge';

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
                <div className={'flex flex-column items-start text-left gap-2 py-4'}>
                    <p className={'text-5xl font-bold drop-shadow-md'}>
                        <span
                            className={
                                'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-600'
                            }>
                            {'GIHUN KO STEPHEN'}
                        </span>
                    </p>
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
                <div className="flex flex-row gap-2 h-auto">
                    {generateCertificateIcons().map((x, i) => {
                        return <CertBadge {...x} key={i} />;
                    })}
                </div>
                <p className={'text-2xl font-bold text-left'}>
                    {
                        'Curious Learner since 2018, Mastering my profession in Front-end & DevOps'
                    }
                </p>
                <p className={'text-xl text-left font-italic'}>
                    {
                        '"Hey there! nice to meet ya :) I am currently showcasing my projects that I have accomplished at University and during my free itme over this website,"'
                    }
                </p>
                <ResumeButton />
            </div>
        </div>
    );
};

export default IntroSection;
