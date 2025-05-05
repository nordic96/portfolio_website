import React from 'react';

// Custom Components
import IntroSection from '../components/IntroSection/IntroSection';
import HistorySection from '../components/HistorySection';
import TechStackSection from '../components/TechStackSection';
import ProjectSection from '../components/ProjectSection';
import SkillsContainer from '../components/SkillsContainer';

import LabelContainer from 'labelcontainer';
import { Labels } from 'labelcontainer/build/types';
import { GET as getConfigData } from './api/configs/route';
import Banner from '../components/Banner';
import Divider from '../components/common/Divider';

async function fetchConfigs() {
    const data = await getConfigData().then((res) => res.json());
    const lsInstance = LabelContainer.getInstance();
    lsInstance.setLabels(data.configs as Labels);
}

export default async function Page() {
    if (process.env.NODE_ENV !== 'test') {
        await fetchConfigs();
    }

    return (
        <div className="App">
            <div
                id="page-container"
                className={
                    'bg:white dark:bg-neutral-900 dark:text-white lg:px-16 max-sm:px-4 py-4 flex justify-center relative flex-col items-center'
                }>
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
            </div>
        </div>
    );
}
