import React from 'react';

const IDCard = () => {
    return (
        <div className={''}>
            <img
                className={'h-96'}
                src={'assets/selfie.jpeg'}
                alt={'profile'}
            />
        </div>
    );
};

export default React.memo(IDCard);
