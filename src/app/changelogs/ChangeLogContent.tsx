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
import SkeletonComp from '../../components/SkeletonComp';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import LoadingSkeleton from '../../components/ProjectCard/LoadingSkeleton';

interface ChangeLogProps {
    release: Release;
    latest?: boolean;
}
const ChangeLog: React.FC<ChangeLogProps> = (props: ChangeLogProps) => {
    const { release, latest } = props;
    return (
        <div
            className={
                'w-[100%] align-start text-start px-8 py-4 bg-[#f9f9f9] shadow-md rounded-sm'
            }>
            <div className={'flex gap-2 justify-between items-center'}>
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
                <label>
                    Published: {dateUtils.formatShortDate(release.published_at)}
                </label>
            </div>
            <div
                className={
                    'mt-4 flex flex-row max-sm:flex-col justify-between'
                }>
                <div className={'max-w-[35rem]'}>{release.body}</div>
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
                'flex flex-wrap gap-16 py-16 max-sm:py-2 max-sm:gap-8 min-h-[50rem]'
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
