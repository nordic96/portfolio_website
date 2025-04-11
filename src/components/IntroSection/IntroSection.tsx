import React from 'react';

import IDCard from '../IDCard';
import ResumeButton from '../ResumeButton';

import {
    generateCertificateIcons,
    generateIcons,
} from '../../constants/profileIcons';
import IDIcon from '../IDIcon/IDIcon';
import CertBadge from '../CertBadge';
import HeaderLabel from '../HeaderLabel';
import LabelContainer from 'labelcontainer';

const IntroSection = () => {
    const lsInstance = LabelContainer.getInstance();
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
                <div
                    className={
                        'flex flex-column items-start text-left gap-2 py-4'
                    }>
                    <p className={'text-5xl font-bold drop-shadow-md'}>
                        <span
                            className={
                                'text-transparent bg-clip-text bg-gradient-to-r from-siablue to-cyan-600'
                            }>
                            {lsInstance.getLabel('title')}
                        </span>
                    </p>
                    <p className={'text-3xl font-bold uppercase'}>
                        {lsInstance.getLabel('title_desc')}
                    </p>
                </div>
                <p className={'text-2xl font-bold text-left'}>
                    {lsInstance.getLabel('intro_msg')}
                </p>
                <p className={'text-xl text-left font-italic'}>
                    {lsInstance.getLabel('intro_msg2')}
                </p>
                <div className={'flex flex-row gap-2 pt-2 w-100 items-center'}>
                    <ResumeButton />
                    {generateIcons().map((x, i) => {
                        return <IDIcon {...x} key={i} />;
                    })}
                </div>
                <hr className="my-4 w-[32rem]" />
                <HeaderLabel>
                    {lsInstance.getLabel('heading_achievements')}
                </HeaderLabel>
                <div className="flex flex-row gap-2 h-auto">
                    {generateCertificateIcons().map((x, i) => {
                        return <CertBadge {...x} key={i} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
