import LabelContainer from 'labelcontainer';
import React from 'react';

const CertificateSection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'flex w-1/2 items-start justify-between align-start max-sm:flex-col'
            }>
            <div className={'flex flex-col items-start w-1/2 text-left'}>
                <p
                    className={
                        'lg:text-xl md:text-md max-sm:text-base max-sm:w-full font-bold'
                    }>
                    My certifications
                </p>
                <p
                    className={
                        'lg:text-lg md:text-md max-sm:text-base max-sm:w-full'
                    }>
                    {lsInstance.getLabel('cert_desc')}
                </p>
            </div>
            <div>
                <a
                    href="https://www.credly.com/badges/5a00ab1a-d116-4fe6-aad8-52105d3b0603"
                    target={'_blank'}
                    rel="noreferrer">
                    <img
                        src="https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
                        alt="aws-cert"
                        className={'h-32 lg:h-32 md:h-28 max-sm:h-24'}
                    />
                </a>
            </div>
        </div>
    );
};

export default CertificateSection;
