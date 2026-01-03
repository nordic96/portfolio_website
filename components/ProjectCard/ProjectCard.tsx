import { CDN_BASE } from '@/app/config/cdn';
import { cn } from '@/app/utils';
import Image from 'next/image';

interface Project {
  title: string;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured: boolean;
}

type ProjectCardProps = {
  size?: 'small' | 'large';
  project?: Project;
};
const testProject: Project = {
  title: 'Foodies Trail - SG',
  thumbnail: '/resources/images/foodies_trail.gif',
  techStack: [],
  githubUrl: 'https://github.com/nordic96/sg_eatwhere/',
  liveUrl: 'https://sg-eatwhere.vercel.app/',
  stars: 5,
  featured: true,
};
export default function ProjectCard({
  size = 'large',
  project = testProject,
}: ProjectCardProps) {
  const { title, thumbnail } = project;
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 max-sm:p-3',
        'bg-white border border-[#333] rounded-xl shadow-2xl max-sm:w-full text-text-dark',
        {
          'lg:w-120 lg:min-h-140 md:w-full max-sm:h-70': size === 'large',
          'lg:w-70 lg:min-h-70 max-sm:h-70': size === 'small',
        },
      )}
    >
      <Image
        alt={'project thumbnail'}
        src={`${CDN_BASE}/${thumbnail}`}
        width={500}
        height={500}
        className={
          'w-full h-[60%] border-2 border-black rounded-lg object-cover'
        }
      />
      <div></div>
      <div>
        <h3 className={'font-medium text-md uppercase'}>{title}</h3>
      </div>
    </div>
  );
}
