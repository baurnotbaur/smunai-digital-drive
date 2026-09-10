import { useLanguage } from "@/lib/i18n";
import { Coffee, UtensilsCrossed, Sparkles, Droplets, MapPin, ExternalLink, Clock, Compass, Store } from "lucide-react";

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
      accent: "from-amber-500/20 to-amber-700/10 text-amber-300 border-amber-500/30",
    },
    {
      icon: UtensilsCrossed,
      title: t.sduken.foodTitle,
      desc: t.sduken.foodDesc,
      tag: lang === "kz" ? "Ыстық тағамдар" : lang === "en" ? "Hot Bites" : "Свежая выпечка",
      accent: "from-orange-500/20 to-orange-700/10 text-orange-300 border-orange-500/30",
    },
    {
      icon: Sparkles,
      title: t.sduken.drinksTitle,
      desc: t.sduken.drinksDesc,
      tag: lang === "kz" ? "24/7 Салқын сусындар" : lang === "en" ? "Cold Drinks 24/7" : "Холодные напитки",
      accent: "from-teal-500/20 to-teal-700/10 text-teal-300 border-teal-500/30",
    },
    {
      icon: Droplets,
      title: t.sduken.autoTitle,
      desc: t.sduken.autoDesc,
      tag: lang === "kz" ? "Түпнұсқа майлар" : lang === "en" ? "OEM Motor Oils" : "Оригинальные масла",
      accent: "from-blue-500/20 to-blue-700/10 text-blue-300 border-blue-500/30",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 text-white md:py-28 scroll-mt-20 sm:scroll-mt-24" id="sduken">
      {/* Warm Ambient Backlight */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Brand Banner Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 p-8 shadow-2xl backdrop-blur-xl md:p-12">
          {/* Top Row: Logo & Badges */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-inner">
                <Store className="size-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Store className="h-3.5 w-3.5" />
                  <span>{t.sduken.badge}</span>
                </div>
                <h2 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
                  {t.sduken.title}
                </h2>
              </div>
            </div>

            {/* Network Indicator */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>{t.sduken.stationTag}</span>
              </div>
              <a
                href="https://2gis.kz/zhezkazgan/branches/70000001068949326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-amber-500"
              >
                <Compass className="h-4 w-4" />
                <span>{t.sduken.gisBtn}</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base text-slate-300 sm:text-lg">
            {t.sduken.subtitle}
          </p>

          {/* 4 Station Locations Grid */}
          <div className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {t.sduken.locationsTitle}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dukenStations.map((st) => (
                <div
                  key={st.number}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 backdrop-blur-md transition-all hover:border-white/30 ${
                    st.isFlagship
                      ? "border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-slate-950/80 shadow-lg shadow-amber-500/5"
                      : "border-white/10 bg-slate-950/60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-lg font-bold text-white">
                        АЗС №{st.number}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          st.isFlagship
                            ? "bg-amber-400 text-amber-950 font-bold"
                            : "bg-white/10 text-teal-300 border border-teal-500/30"
                        }`}
                      >
                        {st.badge}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-medium text-slate-300">
                      <span className="text-amber-300 font-semibold">{st.city}:</span> {st.address}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3 text-emerald-400" />
                      24/7
                    </span>
                    <a
                      href={st.gisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <span>2ГИС</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col justify-between rounded-2xl border bg-gradient-to-b ${item.accent} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                        <Icon className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Traveler Comfort Guarantee */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 sm:flex-row">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>
                {lang === "kz"
                  ? "С-Дүкен желісінің барлық 4 маркеті тәулік бойы (24/7) жұмыс істейді. Қазақстанның барлық банк карталары мен Kaspi QR қабылданады."
                  : lang === "en"
                  ? "All 4 «S-Duken» convenience stores operate 24/7. All local bank cards and Kaspi QR accepted."
                  : "Все 4 маркета сети «С-Дүкен» работают круглосуточно 24/7. Принимаем все банковские карты и Kaspi QR."}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>{lang === "kz" ? "4 маркет: Жезқазған және Сәтбаев" : lang === "en" ? "4 Stores: Zhezkazgan & Satpayev" : "Сеть из 4 маркетов: Жезказган и Сатпаев"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
