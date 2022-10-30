import React from 'react';

const IDCard = () => {
    return (
        <div
            className={
                'w-80 h-80 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full relative overflow-hidden drop-shadow-2xl'
            }>
            <div className={'z-1 left-7 top-8 absolute'}>
                <img
                    className={'h-72'}
                    src={'assets/images/selfie.png'}
                    alt={'profile'}
                />
            </div>
        </div>
    );
};

export default React.memo(IDCard);
