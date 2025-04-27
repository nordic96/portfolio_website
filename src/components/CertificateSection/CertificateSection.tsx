import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { generateCertificateIcons } from '../../constants/profileIcons';
import Divider from '../common/Divider';
import HeaderLabel from '../HeaderLabel';
import CertBadge from './components/CertBadge';
import LabelContainer from 'labelcontainer';
import Description from '../common/Description';

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
            <div className="flex flex-row gap-2 h-auto">
                {generateCertificateIcons().map((x, i) => {
                    return <CertBadge {...x} key={i} />;
                })}
            </div>
        </div>
    );
};

export default CertificateSection;
