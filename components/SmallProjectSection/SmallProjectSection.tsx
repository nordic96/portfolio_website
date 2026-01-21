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

const projectData: SmallProject[] = [
  {
    id: 'wink',
    title: 'Wink',
    url: '',
    description:
      'Experimental flutter app for pinginig close range distance using core-bluetooth',
    techStack: [siFlutter, siBluetooth],
  },
  {
    id: 'temppi',
    title: 'TempPi',
    url: '',
    description:
      'IoT project using RaspberryPi 1 module with thermometer sensor to detect room temperature',
    techStack: [siRaspberrypi, siSpring],
  },
  {
    id: 'onion',
    title: 'OnionOrNot',
    url: '',
    description: 'Satire detection Natural Language Processing project',
    techStack: [siPython, siGooglecolab],
  },
  {
    id: 'covid',
    title: 'Covid19 Chest X-Ray',
    url: '',
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
          <a href={'https://github.com/nordic96/'} target={'_blank'}>
            {'Explore My Github Projects'}
          </a>
        </PrimaryButton>
      </div>
    </GridCard>
  );
}
