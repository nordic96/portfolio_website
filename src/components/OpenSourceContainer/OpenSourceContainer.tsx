import React from 'react';
import withHeader from '../../app/hooks/withHeader';
import OpenProjectComp, { OpenProject } from './OpenProjectComp';

function OpenSourceContainer() {
    const testProject: OpenProject = {
        name: 'labelcontainer',
        type: 'npm',
        url: 'https://www.npmjs.com/package/labelcontainer',
        icon_url: 'assets/icons/npm-icon.svg',
    };
    return (
        <div>
            <OpenProjectComp project={testProject} />
        </div>
    );
}

export default withHeader(OpenSourceContainer, 'open_source', {
    icon: 'Publish',
});
