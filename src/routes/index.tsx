import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Fuel,
  ShoppingBag,
  Coffee,
  Instagram,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Ticket,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Gauge,
  CreditCard,
  Droplets,
  UserCheck,
  QrCode,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Store,
  Briefcase,
  Building2,
} from "lucide-react";
import { HiTechVideoBanner } from "@/components/site/HiTechVideoBanner";
import { SDukenSection } from "@/components/site/SDukenSection";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве и Астане" },
      {
        name: "description",
        content:
          "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: 30 лет доверия, премиальное топливо Hi-Tech, маркеты С-Дүкен и сервис высшего класса.",
      },
      { property: "og:title", content: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве и Астане" },
      {
        property: "og:description",
        content: "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: 30 лет доверия, премиальное топливо Hi-Tech, маркеты С-Дүкен.",
      },
    ],
  }),
  component: Index,
});

const INSTAGRAM_URL = "https://www.instagram.com/azs_smunai?igsh=MWRnOHhrcGM1MHk4dg==";

export type Station = {
  number: number;
  city: string;
  cityKz: string;
  cityEn: string;
  address: string;
  addressKz: string;
  addressEn: string;
  hours: string;
  hoursKz: string;
  hoursEn: string;
  services: ("fuel" | "shop" | "coffee")[];
  coords: { lat: number; lng: number };
  gisUrl: string;
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

function Stripe() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="road-stripe my-16 sm:my-24" />
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="display-hero text-3xl text-primary sm:text-4xl md:text-5xl">{children}</h2>
  );
}

/* ---------- Hero: реалистичный рендер станции, чисто рекламная подача ---------- */
function HeroPhoto() {
  const { t, lang } = useLanguage();

  const metrics = [
    [t.hero.yearsMetric, t.hero.yearsLabel],
    [t.hero.stationsMetric, t.hero.stationsLabel],
    [t.hero.citiesMetric, t.hero.citiesLabel],
  ];

  return (
    <section className="relative isolate overflow-hidden bg-primary-deeper text-white">
      <picture>
        <source srcSet="/images/station-hero.webp" type="image/webp" />
        <img
          src="/images/station-hero.jpg"
          alt="АЗС С-Мунай на закате — визуализация станции"
          className="absolute inset-0 size-full object-cover object-[30%_center] lg:object-[22%_center]"
          fetchPriority="high"
        />
      </picture>
      <div
        className="absolute inset-0 bg-linear-to-t from-primary-deeper/95 via-primary-deeper/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-primary-deeper/70 via-primary-deeper/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-5 pt-28 pb-14 sm:pb-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-gold-bright backdrop-blur-sm">
            <Sparkles className="size-3.5 text-gold" />
            <span>{t.hero.badge}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-hero mt-4 max-w-3xl text-4xl text-white sm:text-6xl md:text-7xl leading-[1.05]">
            {t.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t.hero.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/stations" className="btn-base btn-gold glow-gold font-bold inline-flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{t.hero.findStation}</span>
            </Link>
            <a
              href="#fuel"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-gold-bright"
            >
              {lang === "kz" ? "Hi-Tech отыны" : lang === "en" ? "Hi-Tech Fuel" : "Топливо Hi-Tech ↓"}
            </a>
            <Link
              to="/b2b"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright transition-colors hover:underline"
            >
              {t.nav.b2b} →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
            {metrics.map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="font-display text-3xl font-bold text-gold-bright">{value}</span>
                  <span className="ml-2 text-xs uppercase tracking-[0.14em] text-white/70">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  const { lang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isKz = lang === "kz";
  const isEn = lang === "en";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Clean Apple-style Header */}
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:py-3.5">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity hover:opacity-90">
            <img
              src="/images/logo-navbar.svg"
              alt="С-МУНАЙ"
              className="h-8 w-auto object-contain sm:h-9 md:h-10"
            />
          </Link>

          {/* Clean 4-Item Navigation */}
          <nav aria-label="Основная навигация" className="hidden md:flex items-center gap-7 lg:gap-8 text-xs font-bold uppercase tracking-wider text-foreground/80">
            <a href="#fuel" className="transition-colors hover:text-primary">
              {isKz ? "Hi-Tech Отын" : isEn ? "Hi-Tech Fuel" : "Топливо Hi-Tech"}
            </a>
            <a href="#sduken" className="transition-colors hover:text-primary">
              {isKz ? "С-Дүкен" : isEn ? "S-Duken" : "С-Дүкен"}
            </a>
            <Link to="/stations" className="transition-colors hover:text-primary inline-flex items-center gap-1.5 text-primary">
              <MapPin className="size-3.5 text-terracotta" />
              <span>{isKz ? "Карта АЗС" : isEn ? "Stations Map" : "Карта АЗС"}</span>
            </Link>
            <Link to="/b2b" className="transition-colors hover:text-primary">
              {isKz ? "Бизнеске" : isEn ? "For Business" : "Бизнес клиентам"}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              to="/stations"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-xs font-bold text-gold-foreground shadow-sm transition-all hover:bg-gold-bright hover:shadow"
            >
              <Navigation className="size-3.5" />
              <span>{isKz ? "Найти АЗС" : isEn ? "Find Station" : "Найти АЗС"}</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl border border-primary/20 p-2 text-primary transition-colors hover:bg-primary/5"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Minimalist Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 bg-background/98 px-5 py-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-3.5 text-sm font-semibold">
              <a
                href="#fuel"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-foreground/85 hover:text-primary"
              >
                <span>{isKz ? "Hi-Tech Премиум Отын" : isEn ? "Hi-Tech Fuel" : "Премиальное топливо Hi-Tech"}</span>
                <ChevronRight className="size-4 text-foreground/40" />
              </a>
              <a
                href="#sduken"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-foreground/85 hover:text-primary"
              >
                <span>{isKz ? "«С-Дүкен» маркеттері (24/7)" : isEn ? "S-Duken Stores" : "Маркеты «С-Дүкен» (24/7)"}</span>
                <ChevronRight className="size-4 text-foreground/40" />
              </a>
              <Link
                to="/stations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-primary/10 text-primary font-bold"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-terracotta" />
                  {isKz ? "Карта және 8 АЗС мекенжайлары" : "Карта и адреса 8 АЗС"}
                </span>
                <ChevronRight className="size-4 text-primary" />
              </Link>
              <Link
                to="/b2b"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-foreground/85 hover:text-primary"
              >
                <span>{isKz ? "Бизнес клиенттерге (Опт, карталар)" : "Бизнес клиентам (Опт, талоны)"}</span>
                <ChevronRight className="size-4 text-foreground/40" />
              </Link>
              <Link
                to="/career"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-foreground/85 hover:text-primary"
              >
                <span>{isKz ? "С-Мұнайдағы мансап (Вакансии)" : "Карьера и вакансии"}</span>
                <ChevronRight className="size-4 text-foreground/40" />
              </Link>

              <div className="pt-3 border-t border-primary/10 flex items-center justify-between text-xs">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-terracotta"
                >
                  <Instagram className="size-4" />
                  <span>@azs_smunai</span>
                </a>
                <Link to="/privacy" className="text-foreground/50 hover:underline">
                  {isKz ? "Құпиялылық" : "Конфиденциальность"}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* 1. Hero: 30 лет истории, кинематографичный рендер */}
        <HeroPhoto />

        {/* 2. Инновационный видео-баннер Hi-Tech (стиль Nomad Oil) */}
        <HiTechVideoBanner />

        {/* 3. Линейка топлива: Hi-Tech 95, Hi-Tech 92 и стандарты */}
        <section
          id="fuel"
          className="relative isolate scroll-mt-28 overflow-hidden bg-primary-deeper py-20 text-white sm:py-28"
        >
          <img
            src="/images/station-pumps.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center opacity-45"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-primary-deeper/60 via-primary-deeper/85 to-primary-deeper"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-serif text-lg italic text-gold-bright sm:text-xl">{t.fuelSection.hitechBadge}</p>
                  <h2 className="display-hero mt-2 text-3xl text-white sm:text-4xl md:text-5xl">
                    {t.fuelSection.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-white/80">{t.fuelSection.subtitle}</p>
                </div>
              </div>
            </Reveal>

            {/* Hi-Tech инновационная линейка */}
            <Reveal className="mt-8">
              <div className="grid gap-5 md:grid-cols-2">
                {/* АИ-95 Hi-Tech */}
                <article className="glass-dark glow-gold lift p-7 text-white">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                      <Zap className="size-6 text-gold" />
                    </span>
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground shadow-xs">
                      {t.fuelSection.ai95HitechBadge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {t.fuelSection.ai95HitechTitle}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-primary-foreground/85">
                    {t.fuelSection.ai95HitechDesc}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-gold">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="size-4" />
                      Модификатор трения и защита цилиндров
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-white/80 font-mono">
                      RON 95+
                    </span>
                  </div>
                </article>

                {/* АИ-92 Hi-Tech */}
                <article className="glass-dark glow-gold lift p-7 text-white">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                      <Sparkles className="size-6 text-gold" />
                    </span>
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground shadow-xs">
                      {t.fuelSection.ai92HitechBadge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {t.fuelSection.ai92HitechTitle}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-primary-foreground/85">
                    {t.fuelSection.ai92HitechDesc}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-gold">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="size-4" />
                      Моющий комплекс и очистка форсунок
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-white/80 font-mono">
                      RON 92+
                    </span>
                  </div>
                </article>
              </div>
            </Reveal>

            {/* Классическая заводская линейка */}
            <Reveal className="mt-5">
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { title: t.fuelSection.ai95Title, desc: t.fuelSection.ai95Desc, badge: t.fuelSection.ai95Badge },
                  { title: t.fuelSection.ai92Title, desc: t.fuelSection.ai92Desc, badge: t.fuelSection.ai92Badge },
                  { title: t.fuelSection.dtTitle, desc: t.fuelSection.dtDesc, badge: t.fuelSection.dtBadge },
                ].map((fuel) => (
                  <article key={fuel.title} className="glass-dark lift flex flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-gold-bright">
                          <Fuel className="size-5" aria-hidden="true" />
                        </span>
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">
                          {fuel.badge}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-white">{fuel.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {fuel.desc}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
                      <ShieldCheck className="size-4 text-gold-bright" />
                      <span>Лабораторный контроль каждой партии</span>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4. С-Дүкен: Фирменный круглосуточный маркет */}
        <SDukenSection />

        <Stripe />

        {/* 5. РЕКЛАМНЫЙ ШОУКЕЙС: 3 КЛЮЧЕВЫХ ПОРТАЛА (КАРТА АЗС / B2B / ВАКАНСИИ) */}
        <section className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3.5 py-1 text-xs font-semibold text-gold-foreground">
                {isKz ? "Қызметтер мен бағыттар" : "Сервисы и инфраструктура сети"}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-primary font-display">
                {isKz ? "С-Мұнай әлеміне қош келдіңіз" : "Всё, что нужно в дороге и бизнесе"}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-foreground/75">
                {isKz
                  ? "Жезқазған, Сәтбаев және Астана қалаларындағы автокөлік жүргізушілері мен корпоративтік клиенттерге арналған толық экожүйе."
                  : "Единая экосистема для частных автомобилистов, логистических компаний и соискателей."}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Тизер 1: КАРТА АЗС */}
            <Reveal delay={0.05}>
              <article className="soft-card lift h-full flex flex-col justify-between p-7 border-primary/20 hover:border-primary">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                      <MapPin className="size-6" />
                    </span>
                    <span className="rounded-full bg-terracotta/15 px-3 py-1 text-[11px] font-bold text-terracotta">
                      8 АЗС
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-primary">
                    {isKz ? "Интерактивті карта" : "Сеть станций и карта"}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    {isKz
                      ? "Жезқазған, Сәтбаев және Астанадағы барлық 8 АЗС нақты мекенжайлары, қызметтері және 2ГИС бағыты."
                      : "Интерактивная карта 8 АЗС: Жезказган, Сатпаев, Астана. Точные адреса, режим 24/7 и прямой маршрут в 2ГИС."}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-primary/10">
                  <Link
                    to="/stations"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-gold transition-colors"
                  >
                    <span>{isKz ? "Картаны ашу" : "Открыть карту АЗС"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Тизер 2: ДЛЯ БИЗНЕСА (B2B) */}
            <Reveal delay={0.1}>
              <article className="hero-surface lift h-full flex flex-col justify-between p-7 text-white shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/20 text-gold-bright">
                      <Building2 className="size-6" />
                    </span>
                    <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-slate-950">
                      B2B ПОРТАЛ
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-white">
                    {isKz ? "Бизнес клиенттерге" : "Бизнес клиентам"}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                    {isKz
                      ? "Бензовоздармен жеткізу, мұнай базасы, талондар, жанармай карталары, 16% ҚҚС және үнемдеу калькуляторы."
                      : "Оптовая доставка бензовозами, нефтебаза, талоны и карты для юрлиц, зачёт 16% НДС и калькулятор выгоды."}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
                  <Link
                    to="/b2b"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gold-bright hover:underline"
                  >
                    <span>{isKz ? "Бизнес-порталға өту" : "Перейти в Бизнес-раздел"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Тизер 3: КАРЬЕРА И ВАКАНСИИ */}
            <Reveal delay={0.15}>
              <article className="soft-card lift h-full flex flex-col justify-between p-7 border-primary/20 hover:border-primary">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Briefcase className="size-6" />
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                      HR
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-primary">
                    {isKz ? "С-Мұнайдағы мансап" : "Карьера и вакансии"}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    {isKz
                      ? "30 жылдық тарихы бар тұрақты ұжымға қосылыңыз: кассирлер, операторлар, жүргізушілер. Онлайн сауалнама."
                      : "Присоединяйтесь к надежной семейной сети с 30-летней историей. Вакансии кассиров, операторов АЗС, водителей."}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-primary/10">
                  <Link
                    to="/career"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-gold transition-colors"
                  >
                    <span>{isKz ? "Бос орындарды қарау" : "Посмотреть вакансии"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <Stripe />

        {/* 6. О нас — Editorial: история доверия с 1996 года */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="font-serif text-lg italic text-terracotta sm:text-xl">{t.about.badge}</p>
              <SectionTitle>{t.about.title}</SectionTitle>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                {t.about.text}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <figure className="lift overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
                <img
                  src="/images/station-hero.jpg"
                  alt="АЗС С-Мунай на закате"
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        <Stripe />

        {/* 7. Контакты и связь */}
        <section id="contacts" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-4">
          <Reveal>
            <SectionTitle>{t.contacts.title}</SectionTitle>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="soft-card flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Instagram className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold text-primary font-display">{t.contacts.instaCardTitle}</h3>
                      <p className="text-xs text-foreground/60">{t.contacts.instaHandle}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                    {t.contacts.instaDesc}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-base btn-gold inline-flex items-center gap-2 font-semibold"
                  >
                    <Instagram className="size-4" aria-hidden="true" />
                    {t.contacts.instaBtn}
                  </a>
                </div>
              </div>

              <div className="soft-card flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold text-primary font-display">{t.contacts.geoTitle}</h3>
                      <p className="text-xs text-foreground/60">{t.contacts.geoSubtitle}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                    {isKz
                      ? "Барлық 8 АЗС бойынша нақты ақпарат, байланыс нөмірлері және 2ГИС арқылы навигация бөлек интерактивті бетте қолжетімді."
                      : "Вся информация по станциям сети, точные адреса, режим работы 24/7 и прямая навигация доступны на выделенной странице карты."}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/stations"
                    className="btn-base btn-primary inline-flex items-center gap-2 font-semibold"
                  >
                    <Navigation className="size-4" />
                    <span>{isKz ? "Барлық 8 АЗС-ті картадан көру →" : "Все 8 АЗС на карте →"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Футер: роскошный леттеринг и чистые ссылки */}
      <footer className="hero-surface mt-20 overflow-hidden pt-16 pb-8 sm:mt-28">
        <div className="ambient-overlay" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <img src="/images/logo-white.svg" alt="С-МУНАЙ" className="h-9 w-auto object-contain" />
            <nav aria-label="Футер" className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              <a href="#fuel" className="transition-colors hover:text-gold-bright">{isKz ? "Hi-Tech Отын" : "Топливо Hi-Tech"}</a>
              <a href="#sduken" className="transition-colors hover:text-gold-bright">С-Дүкен</a>
              <Link to="/stations" className="transition-colors hover:text-gold-bright">{isKz ? "Карта АЗС" : "Карта АЗС"}</Link>
              <Link to="/b2b" className="transition-colors hover:text-gold-bright">{t.nav.b2b}</Link>
              <Link to="/career" className="transition-colors hover:text-gold-bright">{isKz ? "Мансап" : "Вакансии"}</Link>
              <Link to="/privacy" className="transition-colors hover:text-gold-bright">{isKz ? "Құпиялылық" : "Конфиденциальность"}</Link>
            </nav>
          </div>
          <p
            className="display-hero mt-10 select-none text-center uppercase leading-none tracking-[-0.02em] text-white/[0.07]"
            style={{ fontSize: "clamp(4rem, 15vw, 14rem)" }}
            aria-hidden="true"
          >
            С-Мұнай
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
            <p>© 1996–2026 ТОО «С-Мунай». Барлық құқықтар қорғалған.</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-bright"
            >
              <Instagram className="size-4" aria-hidden="true" />
              {t.contacts.instaHandle}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
