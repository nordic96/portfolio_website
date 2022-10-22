import React, { useState, useEffect } from 'react';

import LabelContainer from 'labelcontainer';
import DesignCard from '../DesignCard';
import { FullDesignDesc } from '../../globals';

const DesignSection = () => {
    const labelInstance = LabelContainer.getInstance();
    const [designs, setDesigns] = useState<Array<FullDesignDesc>>([]);
    const [isDesignsLoaded, setIsDesignsLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/fetchDesigns')
            .then((res) => res.json())
            .then(
                (designs) => {
                    setDesigns(designs);
                    setIsDesignsLoaded(true);
                },
                (ex) => {
                    console.log('Fetch failed, ', ex);
                    setIsDesignsLoaded(false);
                }
            );
    }, []);

    return (
        <div>
            <hr className="my-4" />
            <div
                className={'flex items-center justify-center py-4 flex-column'}>
                <p className={'text-2xl w-50 text-black italic'}>
                    {`"${labelInstance.getLabel('cca_msg')}"`}
                </p>
            </div>
            <div
                className={
                    'flex flex-wrap justify-center pt-16 px-4 pb-16 gap-8'
                }>
                {isDesignsLoaded
                    ? designs.map((design: FullDesignDesc, index: number) => {
                          return (
                              <DesignCard key={index} designProject={design} />
                          );
                      })
                    : "Design details fetch request failed :'( please refresh the page again!"}
            </div>
        </div>
    );
};

export default DesignSection;
