import Image from 'next/image';
import ProjectCard from '../ProjectCard/ProjectCard';
import { CDN_BASE } from '@/app/config/cdn';

export default function ProjectSection() {
  return (
    <section className={'relative w-full flex justify-center'}>
      <div className={'w-full h-[50dvh] absolute inset-0 -z-10'}>
        <Image
          className={'w-full h-[50dvh]'}
          src={`${CDN_BASE}/resources/assets/grid_cutting_mat.jpeg`}
          alt={'mat'}
          width={1200}
          height={900}
        />
        <div
          className={
            'w-full absolute bottom-0 h-[50%] bg-gradient-to-b from-transparent to-white via-white via-30%'
          }
        />
      </div>
      {/** Project Content */}
      <div
        className={
          'flex flex-wrap grow max-sm:px-4 gap-8 py-16 justify-center h-full'
        }
      >
        <ProjectCard />
        <div className="flex flex-col gap-8 max-h-148 max-sm:w-full">
          <ProjectCard size={'small'} />
          <ProjectCard size={'small'} />
        </div>
        <ProjectCard />
      </div>
    </section>
  );
}
