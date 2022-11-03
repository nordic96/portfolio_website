import React from 'react';
// import './App.css';

// Custom Components
import IntroSection from '../components/IntroSection/IntroSection';

import ProjectSection from '../components/ProjectSection';
import DesignSection from '../components/DesignSection';

const Home = () => {
    return (
        <div className={'dark:bg-slate-800'}>
            <IntroSection />
            <div
                className={
                    'flex-column px-16 lg:px-16 md:px-8 max-sm:px-8 pb-32'
                }>
                <ProjectSection />
                <DesignSection />
            </div>
        </div>
    );
};

export default Home;
