'use client';
import React, { useEffect, useState } from 'react';
import withHeader from '../../app/hooks/withHeader';
import Skeleton from 'react-loading-skeleton';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';

function OpenSourceContainer() {
    const testProject: OpenProject = {
        name: 'labelcontainer',
        type: 'npm',
        url: 'https://www.npmjs.com/package/labelcontainer',
        icon_url: 'assets/icons/npm-icon.svg',
    };
    return (
        <div>
            <OpenProject project={testProject} />
        </div>
    );
}

function LoadingComp() {
    return (
        <div className={'min-w-full'}>
            <Skeleton height={50} />
        </div>
    );
}

type OpenProjectType = 'npm' | 'github';

interface OpenProject {
    name: string;
    type: OpenProjectType;
    icon_url: string;
    url: string;
}

interface OpenProjectProps {
    project: OpenProject;
}

function OpenProject(props: OpenProjectProps) {
    const { project } = props;
    const { name, url, icon_url } = project;
    const displayLoading = withLoadingSkeleton(LoadingComp);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            setLoading(false);
        };
    }, []);

    if (loading) {
        return displayLoading(1);
    }

    return (
        <a href={url} target="_blank">
            <div
                className={
                    'flex border-b-2 border-r-2 px-2 py-6 rounded-md gap-4 items-center hover:bg-gray-50 -light shadow-lg max-sm:shadow-md'
                }>
                <div>
                    <img src={icon_url} className="w-8" alt="npm-logo" />
                </div>
                <div>
                    <label className={'text-xl max-sm:text-lg font-semibold'}>
                        {name}
                    </label>
                </div>
            </div>
        </a>
    );
}

export default withHeader(OpenSourceContainer, 'open_source', {
    icon: 'Publish',
});
