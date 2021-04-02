import React from 'react';

function createTags(tags) {
  console.log(tags);
  return(
    <div className="tags-container">
      {tags.map((tag) => {
        return(
          <span>
            <span className="label label-primary">{tag}</span> &nbsp;
          </span>
        )
      })}
    </div>
  )
}

function createLink(link, iconName) {
  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <img className="link-icon" src={"assets/" + iconName + "-logo.png"} alt={iconName} />
      </a>
    );
  } else {
    return (
      <span></span>
    );
  }
}

function ProjectCardComponent(props) {
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
              <p className="card-text">
                <div className="desc">
                  <table>
                      <tr>
                          <td><b>Type: </b>
                          {props.projecttype}
                          <b> Year: </b>
                          {props.devyear}</td>
                      </tr>
                      <tr>
                          <td><b>Link: </b>
                          {createLink(props.projectlink, "github")}
                          {createLink(props.videolink, "youtube")}
                          </td>
                      </tr>
                      <tr>
                        <td>{createTags(props.tags)}</td>
                      </tr>
                  </table><br></br>
                  {props.desc}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProjectCardComponent;