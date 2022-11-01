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
        <div className={'flex flex-column'}>
            <img
                src={'https://lh3.googleusercontent.com/' + medialink}
                className={'w-80'}
                alt="design_img"
            />
            <p className={'font-bold text-lg'}>{`${name}`}</p>
            <p className={'italic'}>{`${organisation}, ${year}`}</p>
        </div>
    );
};

export default DesignCard;
