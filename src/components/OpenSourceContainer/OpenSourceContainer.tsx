import React from 'react';
import withHeader from '../../app/hooks/withHeader';

function OpenSourceContainer() {
    const testProject: OpenProject = {
        name: 'labelcontainer',
        type: 'npm',
        url: 'https://www.npmjs.com/package/labelcontainer',
    };
    return (
        <div className="mt-4">
            <OpenProject project={testProject} />
        </div>
    );
}

type OpenProjectType = 'npm' | 'github';

interface OpenProject {
    name: string;
    type: OpenProjectType;
    url: string;
}

interface OpenProjectProps {
    project: OpenProject;
}

function OpenProject(props: OpenProjectProps) {
    const { project } = props;
    const { name, type, url } = project;
    return (
        <a href={url} target="_blank">
            <div
                className={
                    'flex border-b-2 border-r-2 px-2 py-6 rounded-md gap-4 items-center hover:bg-gray-50 -light shadow-lg max-sm:shadow-md'
                }>
                <div>
                    <img
                        src="assets/icons/npm-icon.svg"
                        className="w-8"
                        alt="npm-logo"
                    />
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

export default withHeader(OpenSourceContainer, 'open_source');
