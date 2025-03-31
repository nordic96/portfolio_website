import React from 'react';
import { LogoUrlMap, TAG_COLOURS } from './constants';

function utilGetRandomColor() {
    const n = TAG_COLOURS.length;
    const randomIndex = Math.floor(Math.random() * n);
    return TAG_COLOURS[randomIndex];
}

function createTags(tags: string[]) {
    return (
        <div className={'flex flex-wrap gap-1'}>
            {tags.map((tag, index) => {
                let className = utilGetRandomColor();
                return (
                    <p
                        key={`tag-${index}`}
                        className={className}>
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
