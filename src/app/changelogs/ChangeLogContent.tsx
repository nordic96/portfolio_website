'use client';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    asyncFetchReleasesAtom,
    readOnlyReleasesAtom,
} from '../../store/releasesAtom';
import { Release } from '../../models/release';
import HeaderLabel from '../../components/HeaderLabel';
import dateUtils from '../../utils/dateUtils';
import { readOnlyLoadingAtom } from '../../store/loadingAtom';

import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import LoadingSkeleton from '../../components/ProjectCard/LoadingSkeleton';
import IconComp from '../../components/common/IcomComp';

interface ChangeLogProps {
    release: Release;
    latest?: boolean;
}
const ChangeLog: React.FC<ChangeLogProps> = (props: ChangeLogProps) => {
    const { release, latest } = props;
    return (
        <div
            className={
                'w-[100%] flex align-start text-start px-8 py-4 gap-4 bg-[#f9f9f9] shadow-md rounded-sm'
            }>
            <div className={'flex flex-col gap-2 items-start min-w-[30%]'}>
                <a
                    className={'flex gap-2 items-center hover:text-coolblue'}
                    href={release.html_url}
                    target={'_blank'}>
                    <HeaderLabel>{release.name}</HeaderLabel>
                    <img
                        className={'w-7 h-7'}
                        src={
                            'https://github.githubassets.com/favicons/favicon.svg'
                        }
                        alt={'icon'}
                    />
                </a>
                <div className={'text-md align-center flex items-center'}>
                    <div
                        className={
                            'px-1 gap-1 bg-siablue text-white rounded-lg'
                        }>
                        {release.tag_name}
                    </div>
                    <IconComp icon={'LocalOffer'} />
                </div>
                <label className={'rounded-xl text-lg bg-[#d3d3d3] px-2'}>
                    Published: {dateUtils.formatShortDate(release.published_at)}
                </label>
            </div>
            <div className={'flex flex-row min-w-[70%] justify-between'}>
                <div className={'max-w-[80%]'}>{release.body}</div>
                <div>
                    <a href={release.author.html_url} target={'_blank'}>
                        <img
                            className={'w-15 max-sm:w-9 rounded-full'}
                            src={release.author.avatar_url}
                            alt={'author'}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

const displayLoading = withLoadingSkeleton(LoadingSkeleton);

const ChangelogContent: React.FC<{}> = () => {
    const [, asyncFetchRelease] = useAtom(asyncFetchReleasesAtom);
    const [releases] = useAtom(readOnlyReleasesAtom);
    const [isLoading] = useAtom(readOnlyLoadingAtom);

    useEffect(() => {
        asyncFetchRelease();
    }, []);

    return (
        <div
            className={
                'flex flex-wrap gap-12 py-16 max-sm:py-2 max-sm:gap-8 min-h-[50rem]'
            }>
            {isLoading['releases'] && displayLoading(5)}
            {!isLoading['releases'] &&
                releases.map((r, id) => {
                    if (id === 0) {
                        return <ChangeLog release={r} latest key={id} />;
                    }
                    return <ChangeLog release={r} key={id} />;
                })}
        </div>
    );
};

export default ChangelogContent;
