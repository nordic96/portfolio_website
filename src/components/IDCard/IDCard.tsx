import React from 'react';

const IDCard = () => {
    return (
        <div
            className={
                'animate-float lg:w-80 lg:h-80 md:h-64 md:w-64 max-sm:w-32 max-sm:h-32 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full relative overflow-hidden drop-shadow-2xl'
            }>
            <div
                className={
                    'z-1 lg:left-7 md:left-3 lg:top-8 md:top-4 absolute'
                }>
                <img
                    className={'lg:h-72 md:h-64'}
                    src={'assets/images/selfie.png'}
                    alt={'profile'}
                />
            </div>
        </div>
    );
};

export default React.memo(IDCard);
