import React from 'react';
import { Release } from '../../models/release';
import HeaderLabel from '../HeaderLabel';
import IconComp from '../common/IcomComp';
import dateUtils from '../../utils/dateUtils';

interface ChangeLogProps {
    release: Release;
}

const ChangeLog: React.FC<ChangeLogProps> = (props: ChangeLogProps) => {
    const { release } = props;
    return (
        <div
            className={
                'w-[100%] flex align-start text-start px-8 py-4 max-sm:px-2 max-sm:py-1 gap-4 bg-[#f9f9f9] shadow-md rounded-sm'
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
                <label
                    className={
                        'rounded-xl text-lg max-sm:text-base bg-[#d3d3d3] px-2 max-sm:px-1'
                    }>
                    Published: {dateUtils.formatShortDate(release.published_at)}
                </label>
            </div>
            <div className={'flex flex-row min-w-[70%] justify-between'}>
                <div className={'max-w-[80%]'}>{release.body}</div>
                <div className={'min-w-[20%]'}>
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

export default ChangeLog;
