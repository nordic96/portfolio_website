import React, { Component } from 'react';

export default class ProjectCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: []
        };
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
          <a href={link} target="_blank" rel="noreferrer"><img className="link-icon" src="assets/youtube-icon.png" alt="video" /></a>
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
          <a href={link} target="_blank" rel="noreferrer"><img className="link-icon" src="assets/github-logo.png" alt="github" /></a>
        );
      } else {
        return (
          <span></span>
        );
      }
    }

    render() {
        return (
            <div className="project-card">
              <div className="card mb-3" >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={'https://lh3.googleusercontent.com/' + this.props.medialink} className="card-img" alt="project" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title"><b>{this.props.name}</b></h2>
                      <p className="card-text">
                        <div className="desc">
                          <table>
                              <tr>
                                  <td><b>Type: </b>
                                  {this.props.projecttype}
                                  <b> Year: </b>
                                  {this.props.devyear}</td>
                              </tr>
                              <tr>
                                  <td><b>Link: </b>
                                  {this.createProjectLink(this.props.projectlink)}
                                  {this.createVideoLink(this.props.videolink)}
                                  </td>
                              </tr>
                              <tr>
                                <td>{this.createTags(this.props.tags)}</td>
                              </tr>
                          </table><br></br>
                          {this.props.desc}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}