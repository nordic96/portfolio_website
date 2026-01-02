import TechStackLogos from './TechStackLogos';

export default function HeroSection() {
  return (
    <section className="relative lg:pt-70 max-sm:h-dvh flex flex-col items-center justify-center bg-white px-6 md:px-12">
      {/* Tech Stack Logos - Circular formation around profile photo */}
      <TechStackLogos animation={true} radius={30} />
      <div className="container max-w-4xl mx-auto text-center flex flex-col items-center gap-8 md:gap-12 z-999">
        {/* Profile Photo Placeholder - Will be added in Issue #382 */}
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full bg-gray-100 border-4 border-pastel-green shadow-xl shadow-pastel-green/20" />

        <div className={'flex flex-col lg:mt-40 max-sm:mt-15 gap-4 md:gap-6'}>
          {/* Greeting */}
          <p className="text-5xl md:text-4xl max-sm:text-3xl p-1 font-black text-text-dark bg-pastel-green uppercase">
            Gi Hun Ko, Stephen
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-dark leading-tight">
            I build exceptional web experiences
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl font-extralight text-gray-600 leading-relaxed">
            that blend design & engineering
          </p>

          {/* CTA Buttons Placeholder - Will be added in Phase 2 */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Buttons will be implemented in Issue #385-387 */}
          </div>
        </div>
      </div>
    </section>
  );
}
