import React from 'react';

const IDCard = () => {
    return (
        <div className={'relative'}>
            <div
                className={
                    '-top-7 left-5 w-80 h-80 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full -z-1 absolute'
                }>
                &nbsp;
            </div>
            <div className={'z-1 relative left-12 top-7'}>
                <img
                    className={'h-80'}
                    src={'assets/selfie.png'}
                    alt={'profile'}
                />
            </div>
        </div>
    );
};

export default React.memo(IDCard);
