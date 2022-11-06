import React from 'react';
import { Grow } from '@mui/material';
import LabelContainer from 'labelcontainer';

import Wave from 'react-wavify';
import { Download } from '@mui/icons-material';
import { Icons } from '../../constants/profileIcons';
import IDCard from '../IDCard';
import IDIcon from '../IDIcon/IDIcon';
import { RESUME_LINK } from '../../constants/constants';

const IntroSection = () => {
    const lsInstance = LabelContainer.getInstance();
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(RESUME_LINK, '_blank');
    };

    return (
        <div className={'block relative'}>
            <div
                className={
                    'flex flex-1 flex-wrap lg:pt-20 md:pt-16 max-sm:pt-8 md:px-4 justify-center items-center lg:gap-24 md:gap-4 '
                }>
                <Grow in timeout={1000}>
                    <div
                        className={
                            'flex flex-column justify-between items-start lg:h-64 md:h-48 max-sm:w-1/2 gap-4'
                        }>
                        <div
                            className={
                                'flex flex-column items-start text-left'
                            }>
                            <p
                                className={
                                    'lg:text-4xl md:text-2xl max-sm:text-base font-bold'
                                }>
                                {lsInstance.getLabel('title')}&nbsp;
                                <span className={'dark:text-fuchsia-500'}>
                                    Gihun, Stephen
                                </span>
                                &#9995;
                            </p>
                            <p
                                className={
                                    'lg:text-2xl md:text-xl max-sm:text-sm'
                                }>
                                {lsInstance.getLabel('title_desc')}
                            </p>
                            <p className={'lg:text-base max-sm:text-xs'}>
                                {lsInstance.getLabel('intro_desc')}
                            </p>
                            <div className={'flex flex-row gap-2 pt-2'}>
                                {Icons.map((x, i) => {
                                    return <IDIcon {...x} key={i} />;
                                })}
                            </div>
                        </div>
                        <div>
                            <button
                                className={
                                    'rounded px-4 py-2 bg-gradient-to-r from-coolblue to-coolred hover:to-blue-600 shadow-lg'
                                }
                                onClick={onClick}>
                                <p
                                    className={
                                        'text-white uppercase font-bold max-sm:text-sm'
                                    }>
                                    View Resume
                                    <Download />
                                </p>
                            </button>
                        </div>
                    </div>
                </Grow>
                <IDCard />
            </div>
            <div className={'-top-4 flex relative'}>
                <Wave
                    fill={'url(#gradient)'}
                    paused={false}
                    options={{
                        height: 75,
                        amplitude: 25,
                        speed: 0.22,
                        points: 5,
                    }}>
                    <defs>
                        <linearGradient
                            id="gradient"
                            gradientTransform="rotate(0)">
                            <stop offset="0%" stopColor="#fa256d" />
                            <stop offset="35%" stopColor="#79096d" />
                            <stop offset="90%" stopColor="#0070ff" />
                        </linearGradient>
                    </defs>
                </Wave>
            </div>
        </div>
    );
};

export default IntroSection;
