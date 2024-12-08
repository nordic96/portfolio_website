import React from 'react';

const IDCard = () => {
    return (
        <div className={''}>
            <img
                className={'lg:h-200 md:h-200'}
                src={'assets/images/selfie.jpeg'}
                alt={'profile'}
            />
        </div>
    );
};

export default React.memo(IDCard);
