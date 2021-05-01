import React from 'react';

import Wave from 'react-wavify';

import IDCard from './IDCard';

function IntroductionBox() {
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
export default React.memo(IntroductionBox);