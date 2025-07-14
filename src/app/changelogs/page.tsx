import React from 'react';
import PageTitle from '../../components/Labels/PageTitle';
import LabelContainer from 'labelcontainer';
import ChangelogContent from './ChangeLogContent';
import Description from '../../components/common/Description';
import Divider from '../../components/common/Divider';
import { ArrowBack } from '@mui/icons-material';
import GradientButton from '../../components/GradientButton/GradientButton';
import Link from 'next/link';

export default function Page() {
    const lsInstance = LabelContainer.getInstance();

    return (
        <div className={'w-[70.5rem] max-sm:w-[100%] mt-8 text-wrap'}>
            <div
                className={
                    'flex flex-col items-start gap-8 text-start relative min-w-100% justify-start'
                }>
                <Link href={'/'}>
                    <GradientButton>
                        <ArrowBack />
                        {lsInstance.getLabel('btn_back_to_homepage')}
                    </GradientButton>
                </Link>
                <PageTitle>
                    {lsInstance.getLabel('page_title_changelogs')}
                </PageTitle>
                <Description>
                    {lsInstance.getLabel('page_desc_changelogs')}
                </Description>
            </div>
            <Divider />
            <div>
                <ChangelogContent />
            </div>
        </div>
    );
}
