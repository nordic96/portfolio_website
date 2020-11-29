import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap';

export default class ProjectCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: []
        };
      } 
      
    fetchProjects() {
      fetch('/api/fetchProjects')
      .then(res => res.json())
      .then(
        (projects) => {
          console.log(projects)
          this.setState({
            isLoaded: true,
            projects: projects
          });
        },
        (ex) => {
          console.log('Fetch failed, ', ex);
        }
      )
    }
    
    componentDidMount() {
      this.fetchProjects();
    }

    createTags(tags) {
      console.log(tags);
      return (
        <div className="tags-container">
          {tags.map((tag) => {
            return(
              <span>
                <span className="label label-primary">{tag}</span> &nbsp;
              </span>
            )
          })}
        </div>
      );
    }

    createVideoLink(link) {
      if (link) {
        return (
          <a href={link}><img className="link-icon" src="assets/youtube-icon.png" alt="video"/></a>
        );
      } else {
        return (
          <span></span>
        );
      }
    }

    createProjectLink(link) {
      if (link) {
        return (
          <a href={link}><img className="link-icon" src="assets/github-logo.png" alt="github"/></a>
        );
      } else {
        return (
          <span></span>
        );
      }
    }

    render() {
      return (
          <div class="project-container">
              {this.state.projects.map((project) => {
                  return(
                    <div class="project-card">
                        <Card style={{ width: '30rem' }}>
                            <Card.Img variant="top" src={project.medialink} />
                            <Card.Body>
                                <Card.Title><h3><b>{project.name}</b></h3></Card.Title>
                                <Card.Text>
                                    <div className="desc">
                                        {this.createTags(project.tags)}
                                        <table>
                                        <tr>
                                            <td>Project Type: </td>
                                            <td>{project.projecttype}</td>
                                        </tr>
                                        <tr>
                                            <td>Dev. Year: </td>
                                            <td>{project.devyear}</td>
                                        </tr>
                                        <tr>
                                            <td>Project Link:</td>
                                            <td>
                                            {this.createProjectLink(project.projectlink)}
                                            {this.createVideoLink(project.videolink)}
                                            </td>
                                        </tr>
                                        </table><br></br>
                                        {project.desc}
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                  )
              })}
          </div>
      )
    }
}