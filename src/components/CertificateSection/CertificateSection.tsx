import LabelContainer from 'labelcontainer';
import React from 'react';

const CertificateSection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'flex items-start justify-between align-start max-sm:flex-col'
            }>
            <div className={'flex flex-col items-start w-2/3 text-left'}>
                <p
                    className={
                        'lg:text-2xl md:text-md max-sm:text-base max-sm:w-full font-bold'
                    }>
                    Check out my certifications!
                </p>
                <p
                    className={
                        'lg:text-lg md:text-md max-sm:text-base max-sm:w-full'
                    }>
                    {lsInstance.getLabel('cert_desc')}
                </p>
            </div>
            <div className={'w-1/3'}>
                <a
                    href="https://www.credly.com/badges/5a00ab1a-d116-4fe6-aad8-52105d3b0603"
                    target={'_blank'}
                    rel="noreferrer">
                    <img
                        src="https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
                        alt="aws-cert"
                        className={'h-36 lg:h-36 md:h-28 max-sm:h-24'}
                    />
                </a>
            </div>
        </div>
    );
};

export default CertificateSection;
