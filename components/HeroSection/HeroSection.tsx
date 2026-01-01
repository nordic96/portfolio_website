export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#145055] via-[#0a3035] to-[#6b8605] px-6 md:px-12">
      <div className="container max-w-4xl mx-auto text-center flex flex-col items-center gap-8 md:gap-12">
        {/* Profile Photo Placeholder - Will be added in Issue #382 */}
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full bg-white/10 border-4 border-[#6b8605] shadow-2xl shadow-[#6b8605]/20" />

        {/* Greeting */}
        <p className="text-xl md:text-2xl font-normal text-[#c1a264]">
          Hi, I'm Stephen Ko 👋
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          I build exceptional web experiences
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
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
