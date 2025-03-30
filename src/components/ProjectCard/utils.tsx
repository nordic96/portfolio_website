import React from 'react';
import { LogoUrlMap } from './constants';

function createTags(tags: string[]) {
    //console.log(tags);
    return (
        <div className={'flex flex-wrap'}>
            {tags.map((tag, index) => {
                return (
                    <p
                        key={`tag-${index}`}
                        className={
                            'font-bold text-velvet dark:text-teal-500 rounded-md min-w-20 px-2 text-md'
                        }>
                        {tag}
                    </p>
                );
            })}
        </div>
    );
}

function createLink(link?: string, iconName?: string) {
    if (iconName === undefined) return null;
    if (!!link) {
        return (
            <a href={link} target="_blank" rel="noreferrer">
                <img
                    className="link-icon"
                    src={LogoUrlMap[iconName]}
                    alt={iconName}
                />
            </a>
        );
    }
    return null;
}

export { createTags, createLink };
