import React from 'react';

import IDCard from '../IDCard';
import ResumeButton from '../ResumeButton';

import { generateIcons } from '../../constants/profileIcons';
import IDIcon from '../IDIcon/IDIcon';
import LabelContainer from 'labelcontainer';
import CertificateSection from '../CertificateSection';

const IntroSection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'flex flex-col lg:items-start max-w-xl lg:sticky lg:top-[20px] h-fit'
            }>
            <div className={'flex flex-col justify-between items-start gap-4'}>
                <div
                    className={
                        'flex flex-col max-sm:flex-row max-sm:w-full max-sm:justify-between'
                    }>
                    <IDCard />
                    <div
                        className={
                            'flex flex-col items-start lg:text-left max-sm:text-right gap-2 lg:py-4 md:py-4 max-sm:max-w-[12.5rem] max-sm:justify-between'
                        }>
                        <label
                            className={
                                'lg:text-5xl max-sm:text-4xl font-bold drop-shadow-md'
                            }>
                            <span
                                className={
                                    'text-transparent bg-clip-text bg-linear-to-r from-siablue to-cyan-600 dark:from-indigo-600'
                                }>
                                {lsInstance.getLabel('title')}
                            </span>
                        </label>
                        <label
                            className={
                                'text-3xl max-sm:text-2xl font-bold uppercase'
                            }>
                            {lsInstance.getLabel('title_desc')}
                        </label>
                    </div>
                </div>
                <p
                    className={
                        'text-2xl max-sm:text-lg font-bold lg:text-left max-sm:text-right'
                    }>
                    {lsInstance.getLabel('intro_msg')}
                </p>
                <p
                    className={
                        'text-xl max-sm:text-sm lg:text-left max-sm:text-right font-italic lg:w-[30.2rem]'
                    }>
                    {lsInstance.getLabel('intro_msg2')}
                </p>
                <div
                    className={
                        'flex flex-row gap-2 pt-2 w-[100%] items-center max-sm:justify-end'
                    }>
                    <ResumeButton
                        label={lsInstance.getLabel('btn_resume')}
                        url={lsInstance.getLabel('url_resume')}
                    />
                    {generateIcons(false).map((x, i) => {
                        return <IDIcon {...x} key={i} />;
                    })}
                </div>
                <CertificateSection />
            </div>
        </div>
    );
};

export default IntroSection;
