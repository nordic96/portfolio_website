import {
  siAndroid,
  siBluetooth,
  siFlutter,
  siGithub,
  siGooglecolab,
  siIos,
  siNumpy,
  siPython,
  siRaspberrypi,
  siSpring,
  siTensorflow,
} from 'simple-icons';

import SmallProjectCard, { SmallProject } from '../SmallProjectCard';
import GridCard from '../shared/GridCard';
import PrimaryButton from '../shared/PrimaryButton';
import { GITHUB_URL } from '@/src/config';
import { useTranslations } from 'next-intl';

const projectData: SmallProject[] = [
  {
    id: 'wink',
    title: 'Wink',
    url: 'https://github.com/nordic96/wink',
    techStack: [siIos, siAndroid, siFlutter, siBluetooth],
  },
  {
    id: 'temppi',
    title: 'TempPi',
    url: 'https://github.com/nordic96/TempPiApp',
    techStack: [siRaspberrypi, siSpring],
  },
  {
    id: 'onion',
    title: 'OnionOrNot',
    url: 'https://github.com/nordic96/OnionOrNot',
    techStack: [siPython, siGooglecolab],
  },
  {
    id: 'covid',
    title: 'Covid19 Chest X-Ray',
    url: 'https://www.youtube.com/watch?v=yVC9sNB-Ucg&list=PLs-H3fc40DvA-mpvdsMi8Yhs3eR6y1kpN&index=7',
    techStack: [siGooglecolab, siPython, siNumpy, siTensorflow],
  },
];

export default function SmallProjectSection() {
  const t = useTranslations('ProjectSection');
  return (
    <GridCard title={'github_projects'} headerClass={'bg-accent-green'}>
      <div className={'flex flex-col gap-3 items-center'}>
        {projectData.map((p) => {
          return <SmallProjectCard key={p.id} project={p} />;
        })}
        <PrimaryButton icon={siGithub}>
          <a href={GITHUB_URL} target={'_blank'}>
            {t('view_more')}
          </a>
        </PrimaryButton>
      </div>
    </GridCard>
  );
}
