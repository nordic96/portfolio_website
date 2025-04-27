import React from 'react';
import { FullDesignDesc } from '../../globals';

/**
 * Creates a card component that will display each Design Project
 *
 * @param {displaytext} description of the project
 * @param {medialink} media for project display
 * @param {name} name of the project
 * @param {devyear} date of development
 */
interface DesignCardProps {
    designProject: FullDesignDesc;
}

const DesignCard = (props: DesignCardProps) => {
    const { designProject } = props;
    const { medialink, name, organisation, year } = designProject;
    return (
        <div className={'flex flex-col w-1/4 max-sm:w-1/2'}>
            <img
                src={'https://lh3.googleusercontent.com/' + medialink}
                className={'w-full'}
                alt="design_img"
            />
            <p
                className={
                    'font-bold lg:text-lg md:text-base max-sm:text-sm'
                }>{`${name}`}</p>
            <p
                className={
                    'italic lg:text-base md:text-sm max-sm:text-xs'
                }>{`${organisation}, ${year}`}</p>
        </div>
    );
};

export default DesignCard;
