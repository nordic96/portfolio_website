import React from 'react';

function NavBar() {
    return (
        <div className="header-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-coolblack justify-between">
                <a className="navbar-brand font-bold" href="/">
                    {"Gi Hun's Portfolio"}
                </a>
                <p>v{process.env.VERSION}</p>
            </nav>
        </div>
    );
}
export default React.memo(NavBar);
