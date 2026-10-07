interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  /** CSS object-position for the banner image, e.g. 'center 75%' to favor the lower half of a tall photo. */
  imagePosition?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export default function PageHero({ title, subtitle, image, imagePosition = 'center', breadcrumb }: PageHeroProps) {
  const index = breadcrumb && breadcrumb.length > 0 ? breadcrumb.length : 1;

  return (
    <section className="relative bg-stone-50 pt-32 pb-0 sm:pt-36 overflow-hidden">
      <div className="container-lux grid lg:grid-cols-12 gap-8 items-end pb-10 sm:pb-14">
        <div className="lg:col-span-7">
          {breadcrumb && (
            <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  <span className={i === breadcrumb.length - 1 ? 'text-clay-600 font-medium' : ''}>{b.label}</span>
                </span>
              ))}
            </nav>
          )}
          <span className="index-tag block mb-3">{String(index).padStart(2, '0')} —</span>
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal text-stone-950 tracking-[-0.02em] leading-[0.9] animate-fade-up">
            {title}
          </h1>
        </div>
        {subtitle && (
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-md animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          </div>
        )}
      </div>

      <div className="relative h-[40vh] sm:h-[52vh] min-h-[280px] mx-4 sm:mx-8 lg:mx-12 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent" />
      </div>
    </section>
  );
}
