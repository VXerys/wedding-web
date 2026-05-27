export default function HeroFallback() {
  return (
    <section className="pt-16 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
        <div className="h-4 w-40 mx-auto rounded-full bg-gold-400/20" />
        <div className="mt-6 h-12 w-64 mx-auto rounded-2xl bg-slate-300/20" />
        <div className="mt-3 h-4 w-40 mx-auto rounded-full bg-slate-300/20" />
        <div className="mt-10 h-32 rounded-2xl bg-white/60 border border-white/30" />
      </div>
    </section>
  );
}
