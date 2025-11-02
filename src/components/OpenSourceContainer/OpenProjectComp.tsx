'use client';
import React, { useState, useEffect } from 'react';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import Skeleton from 'react-loading-skeleton';

export type OpenProjectType = 'npm' | 'github';

export interface OpenProject {
    name: string;
    type: OpenProjectType;
    icon_url: string;
    url: string;
}

export interface OpenProjectProps {
    project: OpenProject;
}

function LoadingComp() {
    return (
        <div className={'min-w-full'}>
            <Skeleton height={50} />
        </div>
    );
}

function OpenProjectComp(props: OpenProjectProps) {
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

export default OpenProjectComp;
