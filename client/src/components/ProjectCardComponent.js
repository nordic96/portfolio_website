import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

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
            <div className="project-card">
                {/* <Card>
                    <Card.Img variant="top" src={'https://lh3.googleusercontent.com/' + this.props.medialink} className="img-proj-card" />
                    <Card.Body>
                        <Card.Title><h3><b>{this.props.name}</b></h3></Card.Title>
                        <Card.Text>
                            <div className="desc">
                                {this.createTags(this.props.tags)}
                                <table>
                                <tr>
                                    <td><b>Type:</b></td>
                                    <td>{this.props.projecttype}</td>
                                    <td><b>Year:</b></td>
                                    <td>{this.props.devyear}</td>
                                </tr>
                                <tr>
                                    <td><b>Link:</b></td>
                                    <td>
                                    {this.createProjectLink(this.props.projectlink)}
                                    {this.createVideoLink(this.props.videolink)}
                                    </td>
                                </tr>
                                </table><br></br>
                                {this.props.desc}
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card> */}
                <div className="card mb-3" >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={'https://lh3.googleusercontent.com/' + this.props.medialink} className="card-img" alt="project-image" />
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