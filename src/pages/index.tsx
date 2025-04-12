import React from 'react';

// Custom Components
import IntroSection from '../components/IntroSection/IntroSection';
import HistorySection from '../components/HistorySection';
import TechStackSection from '../components/TechStackSection';
import ProjectSection from '../components/ProjectSection';
import SkillsContainer from '../components/SkillsContainer';

import LabelContainer from 'labelcontainer';
import { Labels } from 'labelcontainer/build/types';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { getConfigData } from './api/configs';
import Banner from '../components/Banner';

interface HomeProps {
    data: Labels;
}

export const getServerSideProps = async () => {
    const data = await getConfigData();
    return {
        props: { data },
    };
};

const Home: NextPage<HomeProps> = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLabels(data as Labels);

    return (
        <div
            className={
                'bg:white dark:bg-neutral-900 lg:px-16 max-sm:px-4 py-4 flex justify-center relative flex-column items-center'
            }>
            <Banner />
            <div
                className={
                    'flex justify-center lg:flex-row md:flex-row max-sm:flex-col gap-4 max-sm:w-full'
                }>
                <IntroSection />
                <div className={'flex flex-col gap-4'}>
                    <SkillsContainer />
                    <ProjectSection />
                </div>
            </div>
            <hr className="my-4 lg:w-[72rem] max-sm:w-full" />
            <HistorySection />
            <hr className="my-4 lg:w-[72rem] max-sm:w-full" />
            <TechStackSection />
        </div>
    );
};

export default Home;
