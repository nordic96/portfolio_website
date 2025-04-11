import React from 'react';

const Banner = () => {
    return (
        <div
            className={
                'items-center relative gap-2 rounded-md flex min-w-[73rem] py-2 px-2 justify-start bg-siablue text-white text-lg'
            }>
            <img
                className={'absolute h-12 -right-6 -top-8'}
                src={'assets/images/sailorcap.png'}
                alt={'sailorcap'}
            />
            <img
                src={'assets/icons/info_icon.png'}
                alt={'info_icon'}
                className={'h-6'}
            />
            {
                'Currently under National Service until 1st September, 2025. Will be back in a moment!!'
            }
        </div>
    );
};

export default Banner;
