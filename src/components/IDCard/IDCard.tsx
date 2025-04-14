import React from 'react';

const IDCard = () => {
    return (
        <div
            className={
                'lg:w-80 lg:h-80 md:h-64 md:w-64 max-sm:w-56 max-sm:h-56 bg-radial-[at_25%_25%] from-cyan-600 to-indigo-500 via-blue-600 rounded-full relative overflow-hidden drop-shadow-2xl max-sm:drop-shadow-lg'
            }>
            <div
                className={
                    'z-1 lg:left-7 md:left-3 lg:top-8 md:top-4 max-sm:left-2 max-sm:top-1 absolute'
                }>
                <img
                    className={'lg:h-72 md:h-64 max-sm:h-56'}
                    src={'assets/images/selfie.png'}
                    alt={'profile'}
                />
            </div>
        </div>
    );
};

export default IDCard;
