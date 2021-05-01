import React from 'react';
import { FullProjectDesc } from '../globals';

function createTags(tags: string[]) {
  //console.log(tags);
  return(
    <div className="tags-container">
      {tags.map((tag, index) => {
        return(
          <React.Fragment>
            <span key={index} className="label label-primary">{tag}</span> &nbsp;
          </React.Fragment>
        )
      })}
    </div>
  )
}

function createLink(link: string, iconName: string) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <img className="link-icon" src={"assets/" + iconName + "-logo.png"} alt={iconName} />
    </a>
  );
}

function ProjectCardComponent(props: FullProjectDesc) {
  return(
    <div className="project-card">
      <div className="card mb-3" >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={'https://lh3.googleusercontent.com/' + props.medialink} className="card-img" alt="project" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title"><b>{props.name}</b></h2>
                <div className="desc">
                  <table>
                    <tbody>
                      <tr>
                          <td><b>Type: </b>
                          {props.projecttype}
                          <b> Year: </b>
                          {props.devyear}</td>
                      </tr>
                      <tr>
                          <td><b>Link: </b>
                          {props.projectlink ? (createLink(props.projectlink, "github")) : " "}
                          {props.videolink ? (createLink(props.videolink, "youtube")): " "}
                          </td>
                      </tr>
                      <tr>
                        <td>{createTags(props.tags)}</td>
                      </tr>
                    </tbody>
                  </table><br></br>
                  <p className="card-text">{props.desc}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(ProjectCardComponent);