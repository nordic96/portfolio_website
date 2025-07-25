import React from 'react';
import LabelContainer from 'labelcontainer';

const Banner = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'items-center relative gap-2 rounded-md flex lg:min-w-[70.5rem] max-sm:w-full py-2 px-2 justify-start bg-siablue text-white text-lg max-sm:text-sm text-start'
            }>
            <img
                className={
                    'absolute h-12 max-sm:h-8 -right-6 max-sm:-right-4 -top-8 max-sm:-top-6'
                }
                src={'assets/images/sailorcap.png'}
                alt={'sailorcap'}
            />
            <img
                src={'assets/icons/info_icon.png'}
                alt={'info_icon'}
                className={'h-6'}
            />
            {lsInstance.getLabel('banner_msg')}
        </div>
    );
};

export default Banner;
