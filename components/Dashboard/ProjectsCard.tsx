'use client';

import { cn } from '@/app/utils';
import GridCard from './GridCard';
import LiveProjectCard, { LiveProject } from '../LiveProjectCard';
import {
  siFastapi,
  siHuggingface,
  siNeo4j,
  siNextdotjs,
  siReact,
  siThreedotjs,
} from 'simple-icons';

interface ProjectsCardProps {
  /** Custom class name for the card */
  className?: string;
}

const projects: LiveProject[] = [
  {
    id: 'white_rabbit',
    title: 'White Rabbit',
    url: 'https://white-rabbit-web.vercel.app',
    description:
      'Graph Knowledge database of world’s mysteries with Neo4J, FastAPI and Next.js',
    techStack: [siNextdotjs, siReact, siFastapi, siNeo4j, siHuggingface],
  },
  {
    id: 'foodies_trail',
    title: "Foodie's Trail SG",
    url: 'https://sg-eatwhere.vercel.app',
    description:
      '3D Web Application Food Blog for Personal Projects, using three.js & Next.js',
    techStack: [siThreedotjs, siReact, siNextdotjs, siHuggingface],
  },
];

export default function ProjectsCard({ className }: ProjectsCardProps) {
  return (
    <GridCard
      title="Live Deployed Web Projects"
      className={cn(className, 'relative')}
      headerClass={'bg-accent-pink'}
    >
      <div className={'flex gap-3 justify-center'}>
        {projects.map((project) => {
          return <LiveProjectCard key={project.id} project={project} />;
        })}
      </div>
    </GridCard>
  );
}
