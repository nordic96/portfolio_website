import React from 'react';

import createStyles from './styles';

import Wave from 'react-wavify';
import IDCard from '../IDCard';

const IntroSection = () => {
    const classes = createStyles();
    return (
        <div className={classes.container}>
            <IDCard />
            <Wave
                fill="#9c28d3"
                paused={false}
                options={{
                    height: 25,
                    amplitude: 50,
                    speed: 0.22,
                    points: 3,
                }}
            />
        </div>
    );
};

export default IntroSection;
