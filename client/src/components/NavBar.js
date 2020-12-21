import React from 'react';

export default function NavBar(props) {
    return(
        <div className="header-top">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Ko Gi Hun's Portfolio Website</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/about">About <span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>
            <div id="nav-version-right">
              v{process.env.REACT_APP_VERSION}
            </div>
          </nav>
        </div>
    );
}