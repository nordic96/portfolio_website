import React from 'react';

// Custom Components
import IntroSection from '../components/IntroSection/IntroSection';
import HistorySection from '../components/HistorySection';
import TechStackSection from '../components/TechStackSection';
import ProjectSection from '../components/ProjectSection';

import LabelContainer from 'labelcontainer';
import { Labels } from 'labelcontainer/build/types';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { getConfigData } from './api/configs';

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
                'bg:white dark:bg-neutral-900 px-16 py-8 flex justify-center relative flex-column items-center'
            }>
            <div className={'flex justify-center flex-row gap-4'}>
                <IntroSection />
                <div>
                    <ProjectSection />
                </div>
            </div>
            <hr className="my-4 w-[72rem]" />
            <HistorySection />
            <hr className="my-4 w-[72rem]" />
            <TechStackSection />
        </div>
    );
};

export default Home;
