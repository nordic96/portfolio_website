import React from 'react';
import { ProjectCardProps } from './types';

function createTags(tags: string[]) {
    //console.log(tags);
    return (
        <div className="tags-container">
            {tags.map((tag, index) => {
                return (
                    <React.Fragment key={index}>
                        <span className="label label-primary">{tag}</span>
                        &nbsp;
                    </React.Fragment>
                );
            })}
        </div>
    );
}

function createLink(link: string, iconName: string) {
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

const ProjectCard = (props: ProjectCardProps) => {
    const { projectDesc } = props;
    const {
        medialink,
        name,
        projecttype,
        devyear,
        projectlink,
        videolink,
        tags,
        desc,
    } = projectDesc;
    return (
        <div className="project-card">
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img
                            src={
                                'https://lh3.googleusercontent.com/' + medialink
                            }
                            className="card-img"
                            alt="project"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">
                                <b>{name}</b>
                            </h2>
                            <div className="desc">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>Type: </b>
                                                {projecttype}
                                                <b> Year: </b>
                                                {devyear}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>Link: </b>
                                                {projectlink
                                                    ? createLink(
                                                          projectlink,
                                                          'github'
                                                      )
                                                    : ' '}
                                                {videolink
                                                    ? createLink(
                                                          videolink,
                                                          'youtube'
                                                      )
                                                    : ' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{createTags(tags)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br></br>
                                <p className="card-text">{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProjectCard);
