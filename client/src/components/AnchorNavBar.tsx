import React from 'react';
import { Link } from 'react-scroll';

function AnchorNavBar() {
    return(
        <div className="anchor-navbar">
        <nav className="nav flex-column nav-pills">
          <Link
            className="nav-link"
            activeClass="active"
            to="projects-link"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Project
          </Link>
          <Link
            className="nav-link"
            activeClass="active"
            to="designs-link"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Design Works
          </Link>
        </nav>
        <hr className="my-4"/>
      </div> 
    );
}
export default React.memo(AnchorNavBar);