import TechStackLogos from './TechStackLogos';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 md:px-12">
      <div className="container max-w-4xl mx-auto text-center flex flex-col items-center gap-8 md:gap-12">
        {/* Tech Stack Logos - Scattered around profile photo */}
        <TechStackLogos />

        {/* Frontend Dev Icons - Decorative elements */}
        <div className="flex items-center justify-center gap-6 opacity-80">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-pastel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <svg className="w-10 h-10 md:w-12 md:h-12 text-pastel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <svg className="w-10 h-10 md:w-12 md:h-12 text-pastel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>

        {/* Profile Photo Placeholder - Will be added in Issue #382 */}
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full bg-gray-100 border-4 border-pastel-green shadow-xl shadow-pastel-green/20" />

        {/* Greeting */}
        <p className="text-xl md:text-2xl font-normal text-pastel-green">
          Hi, I'm Stephen Ko 👋
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#2D2D2D] leading-tight">
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
    </section>
  );
}
