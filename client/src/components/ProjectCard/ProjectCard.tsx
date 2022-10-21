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
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${name} (${devyear})`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {desc}
                    </Typography>
                    {createTags(tags)}
                </CardContent>
            </CardActionArea>
            <CardActions>
                {createLink(projectlink, 'github')}
                {createLink(videolink, 'youtube')}
            </CardActions>
        </Card>
    );
};

export default React.memo(ProjectCard);
