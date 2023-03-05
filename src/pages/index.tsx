import React from 'react';
// import './App.css';

// Custom Components
import IntroSection from '../components/IntroSection/IntroSection';

import ProjectSection from '../components/ProjectSection';
import DesignSection from '../components/DesignSection';
import LabelContainer from 'labelcontainer';
import { Labels } from 'labelcontainer/build/types';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { getConfigData } from './api/configs';
import ColourWave from '../components/ColourWave/ColourWave';

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
                'bg:white dark:bg-neutral-900 flex justify-center relative'
            }>
            <div
                className={
                    'absolute w-full h-56 top-80 lg:top-80 flex md:top-64 md:h-52 max-sm:top-40 max-sm:h-52'
                }>
                <ColourWave />
            </div>
            <div className={'max-w-7xl flex justify-center flex-col'}>
                <IntroSection />
                <div className={'flex-column md:px-8 max-sm:px-8 pb-32'}>
                    <ProjectSection />
                    <DesignSection />
                </div>
            </div>
        </div>
    );
};

export default Home;
