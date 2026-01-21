import {
  siBluetooth,
  siFlutter,
  siGithub,
  siGooglecolab,
  siNumpy,
  siPython,
  siRaspberrypi,
  siSpring,
} from 'simple-icons';

import SmallProjectCard, { SmallProject } from '../SmallProjectCard';
import GridCard from '../shared/GridCard';
import PrimaryButton from '../shared/PrimaryButton';
import { GITHUB_URL } from '@/src/config';

const projectData: SmallProject[] = [
  {
    id: 'wink',
    title: 'Wink',
    url: 'https://github.com/nordic96/wink',
    description:
      'Experimental flutter app for pinginig close range distance using core-bluetooth',
    techStack: [siFlutter, siBluetooth],
  },
  {
    id: 'temppi',
    title: 'TempPi',
    url: 'https://github.com/nordic96/TempPiApp',
    description:
      'IoT project using RaspberryPi 1 module with thermometer sensor to detect room temperature',
    techStack: [siRaspberrypi, siSpring],
  },
  {
    id: 'onion',
    title: 'OnionOrNot',
    url: 'https://github.com/nordic96/OnionOrNot',
    description: 'Satire detection Natural Language Processing project',
    techStack: [siPython, siGooglecolab],
  },
  {
    id: 'covid',
    title: 'Covid19 Chest X-Ray',
    url: 'https://www.youtube.com/watch?v=yVC9sNB-Ucg&list=PLs-H3fc40DvA-mpvdsMi8Yhs3eR6y1kpN&index=7',
    description: 'Covid19 SaarS detection from chest x-ray image analyis',
    techStack: [siGooglecolab, siPython, siNumpy],
  },
];

export default function SmallProjectSection() {
  return (
    <GridCard title={'Github Projects'} headerClass={'bg-accent-green'}>
      <div className={'flex flex-col gap-3 items-center'}>
        {projectData.map((p) => {
          return <SmallProjectCard key={p.id} project={p} />;
        })}
        <PrimaryButton icon={siGithub}>
          <a href={GITHUB_URL} target={'_blank'}>
            {'Explore My Github Projects'}
          </a>
        </PrimaryButton>
      </div>
    </GridCard>
  );
}
