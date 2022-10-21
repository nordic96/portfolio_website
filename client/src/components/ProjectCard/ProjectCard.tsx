import React from 'react';
import {
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Card,
    CardActions,
} from '@mui/material';
import { ProjectCardProps } from './types';
import StringUtils from '../../utils/StringUtils';

function createTags(tags: string[]) {
    //console.log(tags);
    return (
        <div className={'flex gap-1 flex-wrap'}>
            {tags.map((tag, index) => {
                return (
                    <p
                        key={`tag-${index}`}
                        className={
                            'text-base bg-cyan-600 text-white rounded-md min-w-20 px-2'
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
                    src={'assets/' + iconName + '-logo.png'}
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
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://lh3.googleusercontent.com/${medialink}`}
                    alt="project_image"
                />
                <CardContent>
                    <div
                        className={
                            'flex flex-row align-middle justify-center gap-1'
                        }>
                        <p
                            className={
                                'text-xl font-bold'
                            }>{`${name} (${devyear})`}</p>
                        {createLink(projectlink, 'github')}
                        {createLink(videolink, 'youtube')}
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        {StringUtils.shortenString(desc)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>{createTags(tags)}</CardActions>
        </Card>
    );
};

export default React.memo(ProjectCard);
