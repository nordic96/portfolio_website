import React from 'react';
import { techstackLogoArr } from '../../constants/constants';

const TechStackSection = () => {
    return (
        <div className={'flex flex-column gap-5 items-center'}>
            <p className={'text-2xl font-bold'}>
                {'THIS WEBSITE WAS BUILT USING'}
            </p>
            <div
                className={
                    'flex flex-wrap gap-3 max-w-3xl items-center justify-center'
                }>
                {techstackLogoArr.map((props, key) => {
                    return <img key={key} {...props} className={'h-[40px]'} />;
                })}
            </div>
            <a href="https://aws.amazon.com/what-is-cloud-computing">
                <img
                    src="https://d0.awsstatic.com/logos/powered-by-aws.png"
                    alt="Powered by AWS Cloud Computing"
                />
            </a>
        </div>
    );
};

export default TechStackSection;
