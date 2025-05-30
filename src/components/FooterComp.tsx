import React from 'react';
import LabelContainer from 'labelcontainer';

const FooterComp: React.FC<{}> = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'relative text-white py-4 bg-coolblack bottom-0 w-full h-32 flex justify-center'
            }>
            <div
                className={
                    'flex flex-row justify-between gap-4 lg:w-[70.5rem] max-sm:px-4'
                }>
                <div className={'flex-1 text-left'}>
                    <p
                        className={
                            'font-bold lg:text-lg md:text-base max-sm:text-sm'
                        }>
                        About this Website
                    </p>
                    <p className={'lg:text-base md:text-sm max-sm:text-xs'}>
                        {lsInstance.getLabel('footer_desc_1')}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default FooterComp;
