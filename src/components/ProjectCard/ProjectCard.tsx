import React from 'react';
import Image from 'next/image';

import { CardActionArea, CardContent } from '@mui/material';
import { ProjectCardProps } from './types';
import { createLink, createTags } from './utils';

const ProjectCard = (props: ProjectCardProps) => {
    const { projectDesc } = props;
    const { medialink, name, devyear, projectlink, videolink, tags, desc } =
        projectDesc;

    const onClickCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const link = projectlink === '' ? videolink : projectlink;
        window.open(link, '_blank');
    };

    return (
        <div
            className={
                'lg:max-w-lg max-sm:w-full rounded-sm lg:shadow-lg md:shadow-md max-sm:shadow-md dark:bg-zinc-800'
            }>
            <CardActionArea onClick={onClickCard}>
                <img
                    src={`https://cdn.jsdelivr.net/gh/nordic96/portfolio_website/resources/${medialink}`}
                    alt={'project_img'}
                    className={'w-full object-cover rounded-t'}
                />
                <CardContent>
                    <div
                        className={
                            'flex flex-row align-middle justify-center gap-1 pb-2'
                        }>
                        <p
                            className={
                                'lg:text-2xl md:text-xl font-bold'
                            }>{`${name} (${devyear})`}</p>
                        {createLink(projectlink, 'github')}
                        {createLink(videolink, 'youtube')}
                    </div>
                    <div className={'flex flex-row gap-2'}>
                        {createTags(tags)}
                    </div>
                    <p
                        className={
                            'lg:text-lg md:text-base max-sm:text-sm py-2 text-left'
                        }>
                        {desc}
                    </p>
                </CardContent>
            </CardActionArea>
        </div>
    );
};

export default ProjectCard;
