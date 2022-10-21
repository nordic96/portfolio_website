import React from 'react';
import { Grow } from '@mui/material';
import LabelContainer from 'labelcontainer';

import Wave from 'react-wavify';
import { Icons } from '../../constants/profileIcons';
import IDCard from '../IDCard';
import IDIcon from '../IDIcon/IDIcon';

const IntroSection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div className={'block bg-white'}>
            <div
                className={
                    'flex flex-1 flex-row pt-20 justify-center items-start gap-10'
                }>
                <Grow in timeout={1000}>
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
                </Grow>
                <IDCard />
            </div>
            <div className={'-top-20 flex relative'}>
                <Wave
                    fill={'url(#gradient)'}
                    paused={false}
                    options={{
                        height: 75,
                        amplitude: 35,
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
