import Image from 'next/image';
import ProjectCard from '../ProjectCard/ProjectCard';
import { CDN_BASE } from '@/app/config/cdn';

export default function ProjectSection() {
  return (
    <section className={'relative w-full flex flex-col justify-center'}>
      {/** Section Header */}
      <div className="w-full flex flex-col items-center text-center px-4 pt-24 pb-8 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
          Featured <span className="text-pastel-green">Projects</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
          A curated collection of my most impactful work, showcasing expertise
          in full-stack development, modern frameworks, and user-centric design.
        </p>

        {/* Decorative divider */}
        <div className="mt-8 mb-4 w-24 h-1 bg-gradient-to-r from-transparent via-pastel-green to-transparent rounded-full" />
      </div>
      <div className={'relative w-full flex justify-center'}>
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
            'flex flex-wrap grow max-sm:px-4 gap-8 py-16 justify-center h-full max-sm:flex-col'
          }
        >
          <ProjectCard />
          <div className="flex flex-col gap-8 lg:max-h-148 max-sm:w-full">
            <ProjectCard size={'small'} />
            <ProjectCard size={'small'} />
          </div>
          <ProjectCard />
        </div>
      </div>
    </section>
  );
}
