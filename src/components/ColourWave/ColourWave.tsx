import React from 'react';
import Wave from 'react-wavify';

const ColourWave = () => {
    return (
        <Wave
            fill={'url(#gradient)'}
            paused={false}
            options={{
                height: 130,
                amplitude: 20,
                speed: 0.22,
                points: 5,
            }}>
            <defs>
                <linearGradient id="gradient" gradientTransform="rotate(0)">
                    <stop offset="0%" stopColor="#fa256d" />
                    <stop offset="35%" stopColor="#79096d" />
                    <stop offset="90%" stopColor="#0070ff" />
                </linearGradient>
            </defs>
        </Wave>
    );
};

export default React.memo(ColourWave);
