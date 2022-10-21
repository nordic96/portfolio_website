import React from 'react';
import './App.css';

// Custom Components
import NavBar from './components/NavBar';
import FooterComponent from './components/FooterComponent';
import IntroSection from './components/IntroSection/IntroSection';

import ProjectSection from './components/ProjectSection';
import DesignSection from './components/DesignSection';

const Home = () => {
    return (
        <div className="App">
            <NavBar />
            <IntroSection />
            <div className={'relative flex-column px-16'}>
                <ProjectSection />
                <DesignSection />
            </div>
            <FooterComponent />
        </div>
    );
};

export default Home;
