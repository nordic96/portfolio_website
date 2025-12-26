import React from 'react';
import { techstackLogoArr } from '../../constants/constants';
import HeaderLabel from '../HeaderLabel';
import LabelContainer from 'labelcontainer';

const TechStackSection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'flex flex-col gap-5 lg:items-center max-sm:text-start overflow-x-hidden relative py-4'
            }>
            <HeaderLabel>
                {lsInstance.getLabel('heading_techstack')}
            </HeaderLabel>
            <div
                className={
                    'flex animate-marquee whitespace-nowrap gap-8 lg:w-2xl max-sm:w-full items-center justify-center'
                }>
                {techstackLogoArr.map((props, key) => {
                    return (
                        <img
                            key={key}
                            {...props}
                            className={'h-[40px] w-auto object-contain'}
                            alt={`logos-${key}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TechStackSection;
