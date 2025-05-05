import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Divider from '../common/Divider';
import HeaderLabel from '../HeaderLabel';
import LabelContainer from 'labelcontainer';
import Description from '../common/Description';
import CertificateContainer from './CertificateContainer';

const CertificateSection = () => {
    const lsInstance = LabelContainer.getInstance();
    return (
        <div
            className={
                'flex flex-col py-4 max-sm:py-2 w-[30.2rem] max-sm:w-full text-start'
            }>
            <HeaderLabel>
                <EmojiEventsIcon />
                {lsInstance.getLabel('heading_achievements')}
            </HeaderLabel>
            <Description>
                {lsInstance.getLabel('achievement_desc_label')}
            </Description>
            <Divider className={'my-4 lg:w-[30.2rem] max-sm:w-full'} />
            <CertificateContainer />
        </div>
    );
};

export default CertificateSection;
