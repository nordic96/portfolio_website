import React from 'react';

const FooterComp: React.FC<{}> = () => {
    return (
        <div
            className={
                'relative text-white py-4 bg-coolblack bottom-0 w-full h-32 flex justify-center'
            }>
            <div
                className={
                    'flex flex-row justify-between gap-4 lg:w-[70.5rem] max-sm:px-4'
                }>
                <div className={'flex-1 text-left'}>
                    <p
                        className={
                            'font-bold lg:text-lg md:text-base max-sm:text-sm'
                        }>
                        About this Website
                    </p>
                    <p className={'lg:text-base md:text-sm max-sm:text-xs'}>
                        {
                            '©2025 Stephen Ko All Rights Reserved. Website design and development adhere to accessibility guidelines.'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};
export default FooterComp;
