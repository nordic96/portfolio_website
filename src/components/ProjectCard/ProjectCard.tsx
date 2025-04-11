import React from 'react';
import { CardActionArea, CardContent } from '@mui/material';
import { ProjectCardProps } from './types';
import { createLink, createTags } from './utils';

const ProjectCard = (props: ProjectCardProps) => {
    const { projectDesc } = props;
    const { medialink, name, devyear, projectlink, videolink, tags, desc } =
        projectDesc;

    const onClickCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let link = projectlink;
        if (!link) link = videolink;
        window.open(link, '_blank');
    };

    return (
        <div
            className={
                'max-w-lg rounded lg:shadow-lg md:shadow-md max-sm:shadow-md dark:bg-zinc-800'
            }>
            <CardActionArea onClick={onClickCard}>
                <img
                    src={`https://lh3.googleusercontent.com/${medialink}`}
                    alt={'project_img'}
                    className={'w-full rounded-t'}
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
                    <p className={'lg:text-lg md:text-base py-2 text-left'}>
                        {desc}
                    </p>
                </CardContent>
            </CardActionArea>
        </div>
    );
};

export default React.memo(ProjectCard);
