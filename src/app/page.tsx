import React from 'react';

// Custom Components
import IntroSection from '../components/IntroSection/IntroSection';
import HistorySection from '../components/HistorySection';
import TechStackSection from '../components/TechStackSection';
import ProjectSection from '../components/ProjectSection';
import SkillsContainer from '../components/SkillsContainer';

import Banner from '../components/Banner';
import Divider from '../components/common/Divider';

export default async function Page() {
    return (
        <>
            <Banner />
            <div
                className={
                    'flex justify-center lg:flex-row md:flex-row max-sm:flex-col gap-4 max-sm:w-full pt-4'
                }>
                <IntroSection />
                <div className={'flex flex-col gap-4'}>
                    <SkillsContainer />
                    <ProjectSection />
                </div>
            </div>
            <Divider />
            <HistorySection />
            <Divider />
            <TechStackSection />
        </>
    );
}
