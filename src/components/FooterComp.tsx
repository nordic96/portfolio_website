import LabelContainer from 'labelcontainer';
import React from 'react';

/**
 * Footer Component for Main Page (contains footer information)
 */
function FooterComp() {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'relative text-white px-24 max-sm:px-4 py-4 max-sm:py-2 bg-coolblack bottom-0 w-full h-32'
            }>
            <div className={'flex flex-row justify-between gap-4'}>
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
}
export default React.memo(FooterComp);
