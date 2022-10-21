import React from 'react';

import Wave from 'react-wavify';
import { Icons } from '../../constants/profileIcons';
import IDCard from '../IDCard';
import IDIcon from '../IDIcon/IDIcon';

const IntroSection = () => {
    return (
        <div className={'flex bg-white flex-1 row'}>
            <div
                className={
                    'flex flex-1 flex-row pt-20 justify-center items-start gap-10'
                }>
                <div className={'flex flex-column items-start'}>
                    <p className={'text-4xl font-bold'}>Hi, I am Gi Hun</p>
                    <p className={'text-2xl'}>
                        Frontend Software Engineer based in Singapore
                    </p>
                    <div className={'flex flex-row gap-2 pt-2'}>
                        {Icons.map((x, i) => {
                            return <IDIcon {...x} key={i} />;
                        })}
                    </div>
                </div>
                <IDCard />
            </div>
            <Wave
                fill="#9c28d3"
                paused={false}
                options={{
                    height: 70,
                    amplitude: 40,
                    speed: 0.22,
                    points: 5,
                }}
            />
        </div>
    );
};

export default IntroSection;
