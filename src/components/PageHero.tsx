interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb?: { label: string; to?: string }[];
}

export default function PageHero({ title, subtitle, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/30" />
      </div>

      <div className="relative container-lux pb-16">
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <span className={i === breadcrumb.length - 1 ? 'text-forest-300' : ''}>{b.label}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white text-shadow-lux animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
