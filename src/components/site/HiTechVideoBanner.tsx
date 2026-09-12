import { useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { Shield, Zap, TrendingDown, Play, Pause, Award, CheckCircle2, ChevronRight, Fuel } from "lucide-react";

export function HiTechVideoBanner() {
  const { t, lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedFuel, setSelectedFuel] = useState<"95" | "92">("95");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const fuelSpecs = {
    "95": {
      name: "Hi-Tech 95",
      badge: lang === "kz" ? "Премиум қуат" : lang === "en" ? "Max Power" : "Максимальная динамика",
      ron: "RON 95+",
      octaneDesc: lang === "kz" ? "Фактикалық октандық сан 95.6+" : lang === "en" ? "Actual octane rating 95.6+" : "Фактическое октановое число 95.6+",
      feature: lang === "kz" ? "Жоғары сығымдалу дәрежесі бар турбо қозғалтқыштарға арналған" : lang === "en" ? "Engineered for high-compression turbo engines" : "Оптимально для турбированных и форсированных двигателей",
      economy: lang === "kz" ? "5.2%-ға дейін" : lang === "en" ? "Up to 5.2%" : "До 5.2%",
      protection: "100%",
    },
    "92": {
      name: "Hi-Tech 92",
      badge: lang === "kz" ? "Күнделікті сенім" : lang === "en" ? "Daily Efficiency" : "Экономичный оптимум",
      ron: "RON 92+",
      octaneDesc: lang === "kz" ? "Фактикалық октандық сан 92.8+" : lang === "en" ? "Actual octane rating 92.8+" : "Фактическое октановое число 92.8+",
      feature: lang === "kz" ? "Қалалық режимде қозғалтқышты қорғау және тазалау" : lang === "en" ? "City-driving wear protection and active injector cleaning" : "Защита цилиндров в городском цикле «старт-стоп» и удаление нагара",
      economy: lang === "kz" ? "4.5%-ға дейін" : lang === "en" ? "Up to 4.5%" : "До 4.5%",
      protection: "98%",
    },
  };

  const active = fuelSpecs[selectedFuel];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28" id="hitech">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-35"
        >
          <source src="/videos/station-1080.webm" type="video/webm" />
          <source src="/videos/station-720.webm" type="video/webm" />
        </video>
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-300 backdrop-blur-md">
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span className="uppercase">{t.hiTechVideo.badge}</span>
          </div>

          <h2 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            {t.hiTechVideo.title}
          </h2>

          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            {t.hiTechVideo.subtitle}
          </p>

          {/* Interactive Fuel Selector */}
          <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setSelectedFuel("95")}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                selectedFuel === "95"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Fuel className="h-4 w-4" />
              Hi-Tech 95 Premium
            </button>
            <button
              onClick={() => setSelectedFuel("92")}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                selectedFuel === "92"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 shadow-lg shadow-teal-500/20"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Fuel className="h-4 w-4" />
              Hi-Tech 92
            </button>
          </div>
        </div>

        {/* Dynamic Highlight Card based on selected fuel */}
        <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Grade Specifications */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-amber-400/20 px-3 py-1 font-heading text-lg font-bold text-amber-300">
                  {active.ron}
                </span>
                <span className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                  {active.badge}
                </span>
                <span className="text-xs text-slate-400">
                  {active.octaneDesc}
                </span>
              </div>

              <h3 className="mt-4 font-heading text-2xl font-bold uppercase text-white md:text-3xl">
                {active.name} — {selectedFuel === "95" ? (lang === "kz" ? "Максималды қуат формуласы" : lang === "en" ? "Peak Power Formula" : "Формула максимальной мощности") : (lang === "kz" ? "Цилиндрлердің мінсіз тазалығы" : lang === "en" ? "Superior Cylinder Cleanliness" : "Идеальная чистота цилиндров")}
              </h3>

              <p className="mt-2 text-sm text-slate-300 md:text-base">
                {active.feature}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {lang === "kz" ? "Отын үнемдеу" : lang === "en" ? "Fuel Savings" : "Экономия расхода"}
                  </div>
                  <div className="mt-1 font-heading text-2xl font-bold text-emerald-400">
                    {active.economy}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {lang === "kz" ? "сынақтармен расталған" : lang === "en" ? "verified by dyno tests" : "по замерам расхода"}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {lang === "kz" ? "Тозудан қорғау" : lang === "en" ? "Wear Protection" : "Защита пар трения"}
                  </div>
                  <div className="mt-1 font-heading text-2xl font-bold text-amber-400">
                    {active.protection}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {lang === "kz" ? "модификатор әсері" : lang === "en" ? "active friction shield" : "молекулярная плёнка"}
                  </div>
                </div>

                <div className="col-span-2 rounded-xl border border-white/10 bg-slate-900/60 p-4 sm:col-span-1">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {lang === "kz" ? "Экология" : lang === "en" ? "Emission Standard" : "Стандарт"}
                  </div>
                  <div className="mt-1 font-heading text-2xl font-bold text-teal-400">
                    Euro-5 / K5
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {lang === "kz" ? "төмен күкірт мөлшері" : lang === "en" ? "ultra-low sulfur" : "мин. нагар и сера"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Benefits Checklist */}
            <div className="space-y-3 lg:col-span-5">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="mt-0.5 rounded-lg bg-teal-500/20 p-2 text-teal-300">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.hiTechVideo.f1Title}</h4>
                  <p className="mt-0.5 text-xs text-slate-300">{t.hiTechVideo.f1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="mt-0.5 rounded-lg bg-amber-500/20 p-2 text-amber-300">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.hiTechVideo.f2Title}</h4>
                  <p className="mt-0.5 text-xs text-slate-300">{t.hiTechVideo.f2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="mt-0.5 rounded-lg bg-emerald-500/20 p-2 text-emerald-300">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.hiTechVideo.f3Title}</h4>
                  <p className="mt-0.5 text-xs text-slate-300">{t.hiTechVideo.f3Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>
                {lang === "kz"
                  ? "Қазақстанның жетекші мұнай өңдеу зауыттарынан тікелей жеткізілім"
                  : lang === "en"
                  ? "Direct refinery supply with certified factory quality passports"
                  : "Прямые поставки с НПЗ Казахстана с паспортом качества на каждую партию"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                title={isPlaying ? (lang === "kz" ? "Кідірту" : lang === "en" ? "Pause" : "Пауза") : (lang === "kz" ? "Ойнату" : lang === "en" ? "Play" : "Воспроизведение")}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>

              <a
                href="#azs"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:from-teal-400 hover:to-teal-500"
              >
                <span>{t.hiTechVideo.actionBtn}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
