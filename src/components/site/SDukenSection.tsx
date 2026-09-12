import { useLanguage } from "@/lib/i18n";
import { Coffee, UtensilsCrossed, Sparkles, Droplets, MapPin, ExternalLink, Clock, Compass, Store, QrCode, CreditCard } from "lucide-react";

export function SDukenSection() {
  const { t, lang } = useLanguage();

  const dukenStations = [
    {
      number: 4,
      city: lang === "kz" ? "Жезқазған" : lang === "en" ? "Zhezkazgan" : "Жезказган",
      address: lang === "kz" ? "Ұлытау к-сі, 4/2" : lang === "en" ? "4/2 Ulytau St" : "ул. Ұлытау, 4/2",
      badge: lang === "kz" ? "Флагмандық маркет" : lang === "en" ? "Flagship Store" : "Флагманский маркет",
      isFlagship: true,
      gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001068949327",
    },
    {
      number: 1,
      city: lang === "kz" ? "Сәтбаев" : lang === "en" ? "Satpayev" : "Сатпаев",
      address: lang === "kz" ? "Ұлытау к-сі, 115" : lang === "en" ? "115 Ulytauskaya St" : "ул. Улытауская, 115",
      badge: "24/7",
      isFlagship: false,
      gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001070540201",
    },
    {
      number: 3,
      city: lang === "kz" ? "Сәтбаев" : lang === "en" ? "Satpayev" : "Сатпаев",
      address: lang === "kz" ? "Ерден к-сі, 226" : lang === "en" ? "226 Yerden St" : "ул. Ердена, 226",
      badge: "24/7",
      isFlagship: false,
      gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001070530403",
    },
    {
      number: 6,
      city: lang === "kz" ? "Сәтбаев" : lang === "en" ? "Satpayev" : "Сатпаев",
      address: lang === "kz" ? "Ұлытау к-сі, 15" : lang === "en" ? "15 Ulytauskaya St" : "ул. Улытауская, 15",
      badge: "24/7",
      isFlagship: false,
      gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001069917278",
    },
  ];

  const services = [
    {
      icon: Coffee,
      title: t.sduken.coffeeTitle,
      desc: t.sduken.coffeeDesc,
      tag: lang === "kz" ? "100% Арабика" : lang === "en" ? "100% Arabica" : "100% Арабика",
      image: "/images/espresso-macro.webp",
    },
    {
      icon: UtensilsCrossed,
      title: t.sduken.foodTitle,
      desc: t.sduken.foodDesc,
      tag: lang === "kz" ? "Ыстық хот-догтар" : lang === "en" ? "Hot Dogs & Bites" : "Хот-доги и выпечка",
      image: "/images/hotdogs-bistro.webp",
    },
    {
      icon: Sparkles,
      title: t.sduken.drinksTitle,
      desc: t.sduken.drinksDesc,
      tag: lang === "kz" ? "24/7 Салқын сусындар" : lang === "en" ? "Cold Drinks 24/7" : "Холодные напитки",
      image: "/images/coffee-paper-cup.webp",
    },
    {
      icon: Droplets,
      title: t.sduken.autoTitle,
      desc: t.sduken.autoDesc,
      tag: lang === "kz" ? "Түпнұсқа майлар" : lang === "en" ? "OEM Motor Oils" : "Оригинальные масла",
      image: "/images/motor-oil.webp",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28 scroll-mt-20 sm:scroll-mt-24"
      id="sduken"
      aria-label="С-Дүкен"
    >
      {/* Subtle brand ambient lighting */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Brand Banner Card with Real Store Façade & Sign */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-6 sm:p-8 md:p-12 lg:p-14 shadow-2xl">
          {/* Desktop Panoramic Backdrop with real [C] ДҮКЕН sign on the right */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
            <picture>
              <source srcSet="/images/sduken-banner.webp" type="image/webp" />
              <img
                src="/images/sduken-banner.jpg"
                alt="Фирменный маркет С-Дүкен"
                className="h-full w-full object-cover object-right lg:object-center"
              />
            </picture>
            {/* Subtle top/bottom edge softening */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/30" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 flex flex-col justify-between min-h-0 md:min-h-[460px]">
            {/* Mobile-only Real Sign Photo Header (100% visible, crisp daylight sign) */}
            <div className="mb-6 block overflow-hidden rounded-2xl border border-white/15 shadow-xl md:hidden aspect-[16/9] w-full">
              <picture>
                <source srcSet="/images/sduken-mobile.webp" type="image/webp" />
                <img
                  src="/images/sduken-mobile.jpg"
                  alt="Вывеска С-Дүкен"
                  className="h-full w-full object-cover object-center"
                />
              </picture>
            </div>

            {/* Top row: Brand Badge & Flagship indicator */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                <Store className="size-3.5 text-amber-400" />
                <span>{t.sduken.badge}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-3.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
                <span className="size-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <span>
                  {lang === "kz"
                    ? "Флагмандық маркет · АЗС №4 (Ұлытау к-сі, 4/2)"
                    : lang === "en"
                    ? "Flagship Store · Station #4 (4/2 Ulytau St)"
                    : "Флагманский маркет · АЗС №4 (ул. Ұлытау, 4/2)"}
                </span>
              </div>
            </div>

            {/* Middle: Headline & Subtitle (high contrast, crisp typography on dark slate) */}
            <div className="my-auto max-w-xl py-6">
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.08] drop-shadow-lg">
                {t.sduken.title}
              </h2>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 max-w-lg drop-shadow-md">
                {t.sduken.subtitle}
              </p>
            </div>

            {/* Bottom: Action CTA & Station count tag */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 md:border-transparent md:pt-0">
              <a
                href="https://2gis.kz/zhezkazgan/branches/70000001068949326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/35"
              >
                <Compass className="size-4" />
                <span>{t.sduken.gisBtn}</span>
                <ExternalLink className="size-3.5 opacity-75" />
              </a>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-xs font-medium text-slate-200 backdrop-blur-md">
                <MapPin className="size-4 text-amber-400" />
                <span>{t.sduken.stationTag}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Stations Addresses Grid (4 Locations) */}
        <div className="mt-16">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="flex items-center gap-2.5 font-heading text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
              <MapPin className="size-5 text-amber-400" />
              <span>{t.sduken.locationsTitle}</span>
            </h3>
            <span className="hidden text-xs font-medium text-slate-400 sm:inline">
              {lang === "kz" ? "4 нүкте · Тәулік бойы 24/7" : lang === "en" ? "4 Locations · Open 24/7" : "4 маркета · Круглосуточно 24/7"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dukenStations.map((st) => (
              <div
                key={st.number}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 backdrop-blur-sm transition-all duration-200 ${
                  st.isFlagship
                    ? "border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-900/60 to-slate-950 shadow-lg shadow-amber-500/5 hover:border-amber-400/60"
                    : "border-white/10 bg-slate-900/50 hover:border-teal-500/30 hover:bg-slate-900/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-white">
                      {lang === "kz" ? `АЗС №${st.number}` : lang === "en" ? `Station #${st.number}` : `АЗС №${st.number}`}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        st.isFlagship
                          ? "bg-amber-400 text-slate-950"
                          : "border border-teal-500/30 bg-teal-500/10 text-teal-300"
                      }`}
                    >
                      {st.badge}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-300">
                    <div className="font-semibold text-amber-300">{st.city}</div>
                    <div className="mt-0.5 text-slate-300">{st.address}</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="size-3 text-emerald-400" />
                    <span>24/7</span>
                  </span>

                  <a
                    href={st.gisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 transition-colors hover:text-teal-300"
                  >
                    <span>2ГИС</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Signature Products & Services (4 Cards) */}
        <div className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition-all duration-200 hover:border-amber-500/30 hover:bg-slate-900/80"
              >
                <div>
                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2.5 left-2.5 rounded-full border border-white/15 bg-slate-950/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                      {item.tag}
                    </div>
                  </div>

                  <h4 className="font-heading text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Traveler Comfort & Payment Reassurance Strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:flex-row">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>
              {lang === "kz"
                ? "С-Дүкен желісінің барлық 4 маркеті тәулік бойы (24/7) жұмыс істейді. Барлық банк карталары мен Kaspi QR қабылданады."
                : lang === "en"
                ? "All 4 «S-Duken» convenience stores operate 24/7. All bank cards and Kaspi QR accepted."
                : "Все 4 маркета сети «С-Дүкен» работают круглосуточно 24/7. Принимаем все банковские карты и Kaspi QR."}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              <QrCode className="size-3.5 text-amber-400" />
              <span>Kaspi QR</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              <CreditCard className="size-3.5 text-teal-400" />
              <span>Visa / Mastercard</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
