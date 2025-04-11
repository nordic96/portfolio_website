import React from 'react';
import { techstackLogoArr } from '../../constants/constants';
import HeaderLabel from '../HeaderLabel';

const TechStackSection = () => {
    return (
        <div
            className={
                'flex flex-column gap-5 items-center overflow-x-hidden relative py-4'
            }>
            <HeaderLabel>{'THIS WEBSITE WAS BUILT USING'}</HeaderLabel>
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
