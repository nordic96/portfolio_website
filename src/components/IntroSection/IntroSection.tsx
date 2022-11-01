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
        <div className={'block bg-white relative'}>
            <div
                className={
                    'flex flex-1 flex-wrap pt-20 justify-center items-center gap-24'
                }>
                <Grow in timeout={1000}>
                    <div
                        className={
                            'flex flex-column justify-between items-start h-64'
                        }>
                        <div className={'flex flex-column items-start'}>
                            <p className={'text-4xl font-bold'}>
                                {lsInstance.getLabel('title')}&#9995;
                            </p>
                            <p className={'text-2xl'}>
                                {lsInstance.getLabel('title_desc')}
                            </p>
                            <p className={'text-base'}>
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
                                    'flex flex-row rounded px-4 py-2 bg-gradient-to-r from-coolblue to-coolred hover:to-blue-600 shadow-lg'
                                }
                                onClick={onClick}>
                                <p className={'text-white uppercase font-bold'}>
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
