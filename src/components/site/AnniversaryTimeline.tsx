import { useLanguage } from "@/lib/i18n";
import { ShieldCheck, Award, MapPin, Sparkles, Clock, History } from "lucide-react";

export function AnniversaryTimeline() {
  const { t } = useLanguage();
  const a = t.anniversary;

  const milestones = [
    {
      year: a.milestone1Year,
      title: a.milestone1Title,
      desc: a.milestone1Desc,
      icon: History,
      city: "Жезқазған",
    },
    {
      year: a.milestone2Year,
      title: a.milestone2Title,
      desc: a.milestone2Desc,
      icon: MapPin,
      city: "Сәтбаев",
    },
    {
      year: a.milestone3Year,
      title: a.milestone3Title,
      desc: a.milestone3Desc,
      icon: Award,
      city: "Астана",
    },
    {
      year: a.milestone4Year,
      title: a.milestone4Title,
      desc: a.milestone4Desc,
      icon: Sparkles,
      city: "30 жылдық экожүйе",
    },
  ];

  const stats = [
    { val: a.stat1Val, lbl: a.stat1Lbl },
    { val: a.stat2Val, lbl: a.stat2Lbl },
    { val: a.stat3Val, lbl: a.stat3Lbl },
    { val: a.stat4Val, lbl: a.stat4Lbl },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-background via-primary/5 to-background border-y border-primary/10">
      <div className="mx-auto max-w-6xl px-5">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-foreground">
            <Sparkles className="size-3.5 text-gold-bright" />
            {a.badge}
          </span>
          <h2 className="display-hero mt-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
            {a.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/75">
            {a.subtitle}
          </p>
        </div>

        {/* Milestone Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            const isLatest = idx === milestones.length - 1;
            return (
              <div
                key={m.year}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isLatest
                    ? "border border-gold/40 bg-gradient-to-br from-primary-deep/10 via-primary/5 to-gold/10 shadow-sm"
                    : "border border-primary/10 bg-card/60 backdrop-blur-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-primary">
                      {m.year}
                    </span>
                    <span
                      className={`flex size-9 items-center justify-center rounded-xl ${
                        isLatest ? "bg-gold text-gold-foreground" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="size-4.5" />
                    </span>
                  </div>

                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {m.city}
                  </span>

                  <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                    {m.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground/70">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/10 flex items-center gap-1.5 text-[11px] font-medium text-primary/70">
                  <ShieldCheck className="size-3.5 text-gold" />
                  <span>С-Мұнай стандарты</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Metrics Bar */}
        <div className="mt-14 rounded-2xl border border-primary/15 bg-primary/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-primary/15">
            {stats.map((s, idx) => (
              <div key={s.lbl} className={idx > 0 ? "md:pl-6" : ""}>
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary">
                  {s.val}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-foreground/75">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-foreground/70">
            <p className="font-serif italic text-base sm:text-lg text-primary">
              «Жанармай — көлікке, Ұлытау — жүректе»
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 text-gold" />
              <span>Басты бекет: Жезқазған, Ұлытау к-сі, 4/2 (дүкен мен кофе 24/7)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
