import React from 'react';

import Wave from 'react-wavify';

import IDCard from './IDCard';

export default function IntroductionBox(props) {
    return(
        <div className="intro">
        <IDCard />
        <div>
          <Wave fill='#FF4B3E'
                paused={false}
                options={{
                  height: 25,
                  amplitude: 50,
                  speed: 0.22,
                  points: 3
                }}
          />
        </div>
      </div>
    );
}