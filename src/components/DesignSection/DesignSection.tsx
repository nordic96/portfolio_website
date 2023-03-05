import React, { useState, useEffect } from 'react';

import LabelContainer from 'labelcontainer';
import DesignCard from '../DesignCard';
import { FullDesignDesc } from '../../globals';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import LoadingSkeleton from '../ProjectCard/LoadingSkeleton';

const DesignSection = () => {
    const labelInstance = LabelContainer.getInstance();
    const [designs, setDesigns] = useState<Array<FullDesignDesc>>([]);
    const [isDesignsLoaded, setIsDesignsLoaded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetch('/api/designs')
                .then((res) => res.json())
                .then(
                    (json) => {
                        setDesigns(json.designs);
                        setIsDesignsLoaded(true);
                        setLoading(false);
                    },
                    (ex) => {
                        console.log('Fetch failed, ', ex);
                        setIsDesignsLoaded(false);
                        setLoading(false);
                    }
                );
        }, 500);
    }, []);

    return (
        <div>
            <hr className="my-4" />
            <div
                className={
                    'flex items-center justify-center lg:py-4 md:py-2 flex-column'
                }>
                <p
                    className={
                        'lg:text-2xl md:text-xl max-sm:text-base w-1/2 max-sm:w-full italic'
                    }>
                    {`"${labelInstance.getLabel('cca_msg')}"`}
                </p>
                <p className={'lg:text-4xl md:text-2xl'}>&#128518;</p>
            </div>
            <div
                className={
                    'flex flex-wrap justify-center lg:py-16 md:py-8 lg:gap-8 md:gap-4'
                }>
                {loading
                    ? withLoadingSkeleton(LoadingSkeleton)(3)
                    : isDesignsLoaded
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
