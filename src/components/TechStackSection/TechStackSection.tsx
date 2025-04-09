import React from 'react';
import { techstackLogoArr } from '../../constants/constants';

const TechStackSection = () => {
    return (
        <div className={'flex flex-column gap-5 items-center overflow-x-hidden relative py-4'}>
            <p className={'text-2xl font-bold'}>
                {'THIS WEBSITE WAS BUILT USING'}
            </p>
            <div
                className={
                    'flex animate-marquee whitespace-nowrap gap-8 w-2xl items-center justify-center'
                }>
                {techstackLogoArr.map((props, key) => {
                    return (
                        <img
                            key={key}
                            {...props}
                            className={'h-[40px]'}
                            alt={`logos-${key}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TechStackSection;
