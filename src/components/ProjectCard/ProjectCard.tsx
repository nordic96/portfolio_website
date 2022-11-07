import React from 'react';
import { CardActionArea, CardContent, CardActions } from '@mui/material';
import { ProjectCardProps } from './types';
import StringUtils from '../../utils/StringUtils';
import { LogoUrlMap } from './constants';

function createTags(tags: string[]) {
    //console.log(tags);
    return (
        <div className={'flex flex-wrap'}>
            {tags.map((tag, index) => {
                return (
                    <p
                        key={`tag-${index}`}
                        className={
                            'font-bold text-velvet dark:text-teal-500 rounded-md min-w-20 px-2 lg:text-sm md:text-xs'
                        }>
                        {tag}
                    </p>
                );
            })}
        </div>
    );
}

function createLink(link?: string, iconName?: string) {
    if (iconName === undefined) return null;
    if (!!link) {
        return (
            <a href={link} target="_blank" rel="noreferrer">
                <img
                    className="link-icon"
                    src={LogoUrlMap[iconName]}
                    alt={iconName}
                />
            </a>
        );
    }
    return null;
}

const ProjectCard = (props: ProjectCardProps) => {
    const { projectDesc } = props;
    const {
        medialink,
        name,
        // projecttype,
        devyear,
        projectlink,
        videolink,
        tags,
        desc,
    } = projectDesc;

    const onClickCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let link = projectlink;
        if (!link) link = videolink;
        window.open(link, '_blank');
    };

    return (
        <div
            className={
                'w-1/4 max-sm:w-full rounded lg:shadow-lg md:shadow-md max-sm:shadow-md dark:bg-zinc-800'
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
                                'lg:text-xl md:text-lg font-bold'
                            }>{`${name} (${devyear})`}</p>
                        {createLink(projectlink, 'github')}
                        {createLink(videolink, 'youtube')}
                    </div>
                    <p className={'lg:text-base md:text-sm'}>
                        {StringUtils.shortenString(desc)}
                    </p>
                </CardContent>
            </CardActionArea>
            <CardActions>{createTags(tags)}</CardActions>
        </div>
    );
};

export default React.memo(ProjectCard);
