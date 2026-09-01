import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
} from "lucide-react";
import { LeafletMap } from "@/components/site/LeafletMap";
import { B2BLeadForm } from "@/components/site/B2BLeadForm";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве и Астане" },
      {
        name: "description",
        content:
          "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: качественное топливо, талоны, магазин и кофе с собой.",
      },
      { property: "og:title", content: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве и Астане" },
      {
        property: "og:description",
        content: "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: качественное топливо, талоны, магазин и кофе с собой.",
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

type CityGroup = {
  city: string;
  cityKz: string;
  cityEn: string;
  gisBranchesUrl: string;
  stations: Station[];
};

const ALL_SERVICES: Station["services"] = ["fuel", "shop", "coffee"];
const FUEL_ONLY: Station["services"] = ["fuel"];

const CITY_STATIONS: CityGroup[] = [
  {
    city: "Жезказган",
    cityKz: "Жезқазған",
    cityEn: "Zhezkazgan",
    gisBranchesUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
    stations: [
      {
        number: 7,
        city: "Жезказган",
        cityKz: "Жезқазған",
        cityEn: "Zhezkazgan",
        address: "проспект Мира, 39",
        addressKz: "Бейбітшілік даңғылы, 39",
        addressEn: "39 Mira Avenue",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: FUEL_ONLY,
        coords: { lat: 47.802055, lng: 67.714752 },
        gisUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
      },
      {
        number: 4,
        city: "Жезказган",
        cityKz: "Жезқазған",
        cityEn: "Zhezkazgan",
        address: "улица Улытау, 4/2",
        addressKz: "Ұлытау көшесі, 4/2",
        addressEn: "4/2 Ulytau Street",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: ALL_SERVICES,
        coords: { lat: 47.783971, lng: 67.696561 },
        gisUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
      },
      {
        number: 5,
        city: "Жезказган",
        cityKz: "Жезқазған",
        cityEn: "Zhezkazgan",
        address: "улица Улытау, 5",
        addressKz: "Ұлытау көшесі, 5",
        addressEn: "5 Ulytau Street",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: FUEL_ONLY,
        coords: { lat: 47.784135, lng: 67.694417 },
        gisUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
      },
    ],
  },
  {
    city: "Сатпаев",
    cityKz: "Сәтбаев",
    cityEn: "Satpayev",
    gisBranchesUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
    stations: [
      {
        number: 1,
        city: "Сатпаев",
        cityKz: "Сәтбаев",
        cityEn: "Satpayev",
        address: "улица Улытауская, 115",
        addressKz: "Ұлытау көшесі, 115",
        addressEn: "115 Ulytauskaya Street",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: ALL_SERVICES,
        coords: { lat: 47.901277, lng: 67.517376 },
        gisUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
      },
      {
        number: 3,
        city: "Сатпаев",
        cityKz: "Сәтбаев",
        cityEn: "Satpayev",
        address: "улица Ердена, 226",
        addressKz: "Ерден көшесі, 226",
        addressEn: "226 Yerden Street",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: ALL_SERVICES,
        coords: { lat: 47.914004, lng: 67.531064 },
        gisUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
      },
      {
        number: 6,
        city: "Сатпаев",
        cityKz: "Сәтбаев",
        cityEn: "Satpayev",
        address: "улица Улытауская, 15",
        addressKz: "Ұлытау көшесі, 15",
        addressEn: "15 Ulytauskaya Street",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: ALL_SERVICES,
        coords: { lat: 47.898436, lng: 67.528117 },
        gisUrl: "https://2gis.kz/zhezkazgan/branches/70000001068949326",
      },
    ],
  },
  {
    city: "Астана",
    cityKz: "Астана",
    cityEn: "Astana",
    gisBranchesUrl: "https://2gis.kz/astana/branches/70000001023880614",
    stations: [
      {
        number: 8,
        city: "Астана",
        cityKz: "Астана",
        cityEn: "Astana",
        address: "шоссе Каркаралы, 7",
        addressKz: "Қарқаралы тас жолы, 7",
        addressEn: "7 Karkaraly Highway",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: ALL_SERVICES,
        coords: { lat: 51.065141, lng: 71.392492 },
        gisUrl: "https://2gis.kz/astana/branches/70000001023880614",
      },
      {
        number: 9,
        city: "Астана",
        cityKz: "Астана",
        cityEn: "Astana",
        address: "шоссе Ондирис, 42",
        addressKz: "Өндіріс тас жолы, 42",
        addressEn: "42 Ondiris Highway",
        hours: "Круглосуточно",
        hoursKz: "Тәулік бойы",
        hoursEn: "24/7 (All Day)",
        services: ALL_SERVICES,
        coords: { lat: 51.232479, lng: 71.384983 },
        gisUrl: "https://2gis.kz/astana/branches/70000001023880614",
      },
    ],
  },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
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
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Stripe() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="road-stripe my-14 sm:my-20" />
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-primary sm:text-3xl font-display">{children}</h2>;
}

function HeroFeatureCard() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl bg-primary p-7 text-primary-foreground shadow-[0_28px_50px_-30px_rgba(13,108,137,0.8)] lg:mx-0">
      <div className="flex items-center border-b border-primary-foreground/15 pb-4">
        <img
          src="/images/logo-white.svg"
          alt="С-МУНАЙ"
          className="h-7 w-auto object-contain"
        />
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Fuel className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold">{h.feature1}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Coffee className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold">{h.feature2}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold">{h.feature3}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-primary-foreground/15 pt-4">
        <p className="text-center font-display text-xs font-semibold tracking-wide text-gold">
          {h.slogan}
        </p>
      </div>
    </div>
  );
}

type StationsMapSectionProps = {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedStationNum: number;
  setSelectedStationNum: (num: number) => void;
};

function StationsMapSection({
  selectedCity,
  setSelectedCity,
  selectedStationNum,
  setSelectedStationNum,
}: StationsMapSectionProps) {
  const { lang, t } = useLanguage();
  const s = t.stations;

  const cityData = CITY_STATIONS.find((c) => c.city === selectedCity) || CITY_STATIONS[0];
  const activeStation =
    cityData.stations.find((st) => st.number === selectedStationNum) || cityData.stations[0];

  function getCityName(c: CityGroup) {
    if (lang === "kz") return c.cityKz;
    if (lang === "en") return c.cityEn;
    return c.city;
  }

  function getAddress(st: Station) {
    if (lang === "kz") return st.addressKz;
    if (lang === "en") return st.addressEn;
    return st.address;
  }

  function getHours(st: Station) {
    if (lang === "kz") return st.hoursKz;
    if (lang === "en") return st.hoursEn;
    return st.hours;
  }

  const serviceMeta: Record<Station["services"][number], { icon: typeof Fuel; label: string }> = {
    fuel: { icon: Fuel, label: s.serviceFuel },
    shop: { icon: ShoppingBag, label: s.serviceShop },
    coffee: { icon: Coffee, label: s.serviceCoffee },
  };

  return (
    <div id="stations-map" className="soft-card scroll-mt-28 overflow-hidden">
      {/* Header with City Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 bg-primary/5 p-4 sm:px-6">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-terracotta" />
          <span className="font-bold text-primary">{s.mapTitle}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CITY_STATIONS.map((c) => (
            <button
              key={c.city}
              type="button"
              onClick={() => {
                setSelectedCity(c.city);
                setSelectedStationNum(c.stations[0].number);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCity === c.city
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background text-foreground/75 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {getCityName(c)} ({c.stations.length})
            </button>
          ))}
          <a
            href={cityData.gisBranchesUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink className="size-3" />
            2ГИС {getCityName(cityData)}
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1.9fr]">
        {/* Stations list with 2GIS buttons */}
        <div className="max-h-[440px] divide-y divide-primary/5 overflow-y-auto p-3 sm:p-4">
          {cityData.stations.map((st) => {
            const isCurrent = st.number === activeStation.number;
            return (
              <div
                key={st.number}
                onClick={() => setSelectedStationNum(st.number)}
                className={`cursor-pointer rounded-xl p-3.5 transition-all ${
                  isCurrent
                    ? "border border-primary/20 bg-primary/10 shadow-sm"
                    : "hover:bg-primary/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {st.number}
                    </span>
                    <h4 className="font-bold text-primary font-display">АЗС №{st.number}</h4>
                  </div>
                  <span className="rounded bg-gold/20 px-2 py-0.5 text-[11px] font-semibold text-gold-foreground">
                    24/7
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground/85">{getAddress(st)}</p>
                {lang !== "kz" && <p className="text-xs text-foreground/50">{st.addressKz}</p>}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-1.5 text-xs">
                    {st.services.map((srv) => (
                      <span
                        key={srv}
                        className="inline-flex items-center gap-1 rounded bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {serviceMeta[srv].label}
                      </span>
                    ))}
                  </div>

                  <a
                    href={st.gisUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Navigation className="size-3" />
                    2ГИС
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Interactive Leaflet Map */}
        <div className="relative min-h-[380px] border-t border-primary/10 bg-primary/5 lg:border-t-0 lg:border-l">
          <LeafletMap
            stations={cityData.stations}
            activeStationNum={activeStation.number}
            onStationSelect={setSelectedStationNum}
          />
          <div className="absolute bottom-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/15 bg-background/95 p-3 shadow-lg backdrop-blur">
            <div>
              <p className="text-xs font-bold text-primary">
                АЗС №{activeStation.number} · {getAddress(activeStation)}
              </p>
              <p className="text-[11px] text-foreground/60">{getHours(activeStation)}</p>
            </div>
            <a
              href={activeStation.gisUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-gold inline-flex items-center gap-1.5 !px-3.5 !py-1.5 !text-xs font-bold"
            >
              <Navigation className="size-3.5" />
              {s.route2gis}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [selectedCity, setSelectedCity] = useState<string>("Жезказган");
  const [selectedStationNum, setSelectedStationNum] = useState<number>(4);
  const { lang, t } = useLanguage();

  const navItems = [
    { href: "#azs", label: t.nav.azs },
    { href: "#fuel", label: t.nav.fuel },
    { href: "#vouchers", label: t.nav.vouchers },
    { href: "#services", label: t.nav.services },
    { href: "#b2b", label: t.nav.b2b },
    { href: "#about", label: t.nav.about },
    { href: "#contacts", label: t.nav.contacts },
  ];

  function getCityName(c: CityGroup) {
    if (lang === "kz") return c.cityKz;
    if (lang === "en") return c.cityEn;
    return c.city;
  }

  function getAddress(st: Station) {
    if (lang === "kz") return st.addressKz;
    if (lang === "en") return st.addressEn;
    return st.address;
  }

  function getHours(st: Station) {
    if (lang === "kz") return st.hoursKz;
    if (lang === "en") return st.hoursEn;
    return st.hours;
  }

  const serviceMeta: Record<Station["services"][number], { icon: typeof Fuel; label: string }> = {
    fuel: { icon: Fuel, label: t.stations.serviceFuel },
    shop: { icon: ShoppingBag, label: t.stations.serviceShop },
    coffee: { icon: Coffee, label: t.stations.serviceCoffee },
  };

  function handleStationCardClick(city: string, stationNum: number) {
    setSelectedCity(city);
    setSelectedStationNum(stationNum);
    const mapEl = document.getElementById("stations-map");
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-4 px-5 py-3 sm:py-3.5">
          <a href="#top" className="flex items-center transition-opacity hover:opacity-90">
            <img
              src="/images/logo-navbar.svg"
              alt="С-МУНАЙ"
              className="h-8 w-auto object-contain sm:h-9 md:h-12 lg:h-14"
            />
          </a>

          <nav aria-label="Основная навигация" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-5 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="transition-colors hover:text-primary" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link className="transition-colors hover:text-primary font-semibold text-primary" to="/cards">
                  {t.nav.cards3d}
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary font-semibold text-primary" to="/career">
                  Карьера
                </Link>
              </li>
            </ul>
          </nav>

          <div className="ml-auto lg:ml-2 flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram С-Мунай"
              className="rounded-full border border-primary/20 p-2 text-terracotta transition-colors hover:bg-primary/5"
            >
              <Instagram className="size-4.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Разделы" className="border-t border-primary/10 lg:hidden">
          <ul className="flex gap-4 overflow-x-auto px-5 py-2.5 text-xs font-medium">
            {navItems.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li className="whitespace-nowrap">
              <Link to="/cards" className="font-semibold text-primary">{t.nav.cards3d}</Link>
            </li>
            <li className="whitespace-nowrap">
              <Link to="/career" className="font-semibold text-primary">Карьера</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3.5 py-1 text-xs font-semibold text-gold-foreground">
                {t.hero.badge}
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-bold text-primary font-display sm:text-4xl md:text-5xl">
                {t.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-base text-foreground/75 sm:text-lg">
                {t.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#azs" className="btn-base btn-gold font-bold">
                  {t.hero.findStation}
                </a>
                <a href="#vouchers" className="btn-base border border-primary/30 text-primary hover:bg-primary/10 font-semibold inline-flex items-center gap-1.5">
                  <Ticket className="size-4" />
                  {t.nav.vouchers}
                </a>
              </div>
            </Reveal>
            <Reveal>
              <HeroFeatureCard />
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <dl className="grid gap-4 sm:grid-cols-3">
              {[
                [t.hero.yearsMetric, t.hero.yearsLabel],
                [t.hero.stationsMetric, t.hero.stationsLabel],
                [t.hero.citiesMetric, t.hero.citiesLabel],
              ].map(([value, label]) => (
                <div key={label} className="soft-card px-6 py-5">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="font-display text-2xl font-bold text-primary">{value}</span>
                    <span className="ml-2 text-sm text-foreground/70">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <Stripe />

        {/* Наши АЗС */}
        <section id="azs" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>{t.stations.title}</SectionTitle>
            <p className="mt-3 max-w-2xl text-foreground/75">
              {t.stations.subtitle}
            </p>
          </Reveal>

          {CITY_STATIONS.map((group) => (
            <Reveal key={group.city} className="mt-10">
              <h3 className="text-lg font-semibold text-terracotta font-display">{getCityName(group)}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.stations.map((station) => {
                  const isSelected = station.number === selectedStationNum;
                  return (
                    <article
                      key={station.number}
                      onClick={() => handleStationCardClick(group.city, station.number)}
                      className={`soft-card cursor-pointer p-5 transition-all hover:border-primary/40 hover:shadow-md ${
                        isSelected
                          ? "border-primary bg-primary/[0.04] ring-2 ring-gold"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-base font-bold text-primary">
                          АЗС №{station.number}
                        </h4>
                        <span className="text-[11px] font-medium text-primary/70 hover:underline">
                          {t.stations.showOnMap}
                        </span>
                      </div>
                      <p className="mt-3 flex items-start gap-2 text-sm text-foreground/75 font-medium">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden="true" />
                        {getAddress(station)}
                      </p>
                      <p className="mt-2 flex items-start gap-2 text-xs text-foreground/60">
                        <Clock className="mt-0.5 size-3.5 shrink-0 text-terracotta" aria-hidden="true" />
                        {getHours(station)}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-primary/5 pt-3">
                        <ul className="flex flex-wrap gap-1.5">
                          {station.services.map((key) => {
                            const { icon: Icon, label } = serviceMeta[key];
                            return (
                              <li
                                key={label}
                                className="inline-flex items-center gap-1 rounded-lg bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary"
                              >
                                <Icon className="size-3" aria-hidden="true" />
                                {label}
                              </li>
                            );
                          })}
                        </ul>
                        <a
                          href={station.gisUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          <Navigation className="size-3" />
                          2ГИС
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          ))}

          <Reveal className="mt-10">
            <StationsMapSection
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedStationNum={selectedStationNum}
              setSelectedStationNum={setSelectedStationNum}
            />
          </Reveal>
        </section>

        <Stripe />

        {/* Топливо */}
        <section id="fuel" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionTitle>{t.fuelSection.title}</SectionTitle>
                <p className="mt-2 text-foreground/70">{t.fuelSection.subtitle}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold text-gold-foreground">
                <Sparkles className="size-3.5 text-gold" />
                {t.fuelSection.hitechBadge}
              </span>
            </div>
          </Reveal>

          {/* Hi-Tech инновационная линейка */}
          <Reveal className="mt-8">
            <div className="grid gap-5 md:grid-cols-2">
              {/* АИ-95 Hi-Tech */}
              <article className="rounded-3xl border-2 border-gold/40 bg-linear-to-br from-primary via-primary to-primary/95 p-7 text-primary-foreground shadow-lg transition-all hover:border-gold hover:shadow-xl">
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
              <article className="rounded-3xl border-2 border-gold/40 bg-linear-to-br from-primary via-primary to-primary/95 p-7 text-primary-foreground shadow-lg transition-all hover:border-gold hover:shadow-xl">
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

          {/* Классическая линейка */}
          <Reveal className="mt-5">
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  title: t.fuelSection.ai95Title,
                  desc: t.fuelSection.ai95Desc,
                  badge: t.fuelSection.ai95Badge,
                },
                {
                  title: t.fuelSection.ai92Title,
                  desc: t.fuelSection.ai92Desc,
                  badge: t.fuelSection.ai92Badge,
                },
                {
                  title: t.fuelSection.dtTitle,
                  desc: t.fuelSection.dtDesc,
                  badge: t.fuelSection.dtBadge,
                },
              ].map((fuel) => (
                <article key={fuel.title} className="soft-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Fuel className="size-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {fuel.badge}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold text-primary">{fuel.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                      {fuel.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-primary/5 flex items-center gap-2 text-xs text-foreground/60">
                    <ShieldCheck className="size-4 text-gold" />
                    <span>Лабораторный контроль каждой партии</span>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* Топливные талоны */}
        <section id="vouchers" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <div className="rounded-3xl bg-linear-to-br from-primary via-primary to-primary/95 p-7 text-primary-foreground sm:p-10 lg:p-12 shadow-xl">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3.5 py-1 text-xs font-semibold text-gold">
                    <Ticket className="size-3.5" />
                    {t.vouchersSection.badge}
                  </span>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    {t.vouchersSection.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-primary-foreground/80 leading-relaxed max-w-xl">
                    {t.vouchersSection.subtitle}
                  </p>

                  {/* Номиналы */}
                  <div className="mt-7">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {t.vouchersSection.denominationsTitle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {[t.vouchersSection.denom10, t.vouchersSection.denom20, t.vouchersSection.denom50].map(
                        (denom) => (
                          <span
                            key={denom}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-primary-foreground/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur"
                          >
                            <Droplets className="size-4 text-gold" />
                            {denom}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#b2b" className="btn-base btn-gold font-bold">
                      {t.vouchersSection.orderVouchersBtn}
                    </a>
                  </div>
                </div>

                {/* 4 преимущества талонов */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {[
                    { title: t.vouchersSection.b1Title, desc: t.vouchersSection.b1Desc, icon: Zap },
                    { title: t.vouchersSection.b2Title, desc: t.vouchersSection.b2Desc, icon: CreditCard },
                    { title: t.vouchersSection.b3Title, desc: t.vouchersSection.b3Desc, icon: ShieldCheck },
                    { title: t.vouchersSection.b4Title, desc: t.vouchersSection.b4Desc, icon: MapPin },
                  ].map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-primary-foreground/15 bg-white/5 p-4.5 backdrop-blur"
                    >
                      <span className="flex size-8 items-center justify-center rounded-lg bg-gold/20 text-gold">
                        <b.icon className="size-4" />
                      </span>
                      <h4 className="mt-3 text-sm font-bold text-primary-foreground">{b.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* Сервис и комфорт */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3.5 py-1 text-xs font-semibold text-gold-foreground">
                {t.servicesSection.badge}
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-primary font-display">
                {t.servicesSection.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-foreground/70">
                {t.servicesSection.subtitle}
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: t.servicesSection.s1Title, desc: t.servicesSection.s1Desc, icon: Gauge },
                { title: t.servicesSection.s2Title, desc: t.servicesSection.s2Desc, icon: ShoppingBag },
                { title: t.servicesSection.s3Title, desc: t.servicesSection.s3Desc, icon: Coffee },
                { title: t.servicesSection.s4Title, desc: t.servicesSection.s4Desc, icon: Droplets },
                { title: t.servicesSection.s5Title, desc: t.servicesSection.s5Desc, icon: UserCheck },
                { title: t.servicesSection.s6Title, desc: t.servicesSection.s6Desc, icon: QrCode },
              ].map((srv) => (
                <article key={srv.title} className="soft-card p-6 transition-all hover:border-primary/30">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <srv.icon className="size-5.5 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-primary">{srv.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/75">
                    {srv.desc}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <Stripe />


        {/* Бизнесу */}
        <section id="b2b" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="soft-card flex flex-col justify-between p-7 sm:p-9 h-full">
                <div>
                  <span className="inline-flex items-center rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-foreground">
                    {t.b2b.badge}
                  </span>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-primary">
                    {t.b2b.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/75">
                    {t.b2b.desc}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[t.b2b.f1, t.b2b.f2, t.b2b.f3, t.b2b.f4].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                        <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-foreground/60">{t.b2b.see3d}</p>
                    <Link
                      to="/cards"
                      className="font-semibold text-sm text-primary hover:text-gold transition-colors inline-flex items-center gap-1 mt-0.5"
                    >
                      {t.b2b.linkCards3d}
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <B2BLeadForm formId="b2b_home_form" />
              </div>
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* О нас */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>{t.about.title}</SectionTitle>
            <p className="mt-4 max-w-3xl text-foreground/80 leading-relaxed">
              {t.about.text}
            </p>
            <span className="mt-6 inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-gold-foreground">
              {t.about.badge}
            </span>
          </Reveal>
        </section>

        <Stripe />

        {/* Вакансии */}
        <section id="jobs" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>{t.jobs.title}</SectionTitle>
            <p className="mt-4 max-w-3xl text-foreground/80 leading-relaxed">
              {t.jobs.text}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/career"
                className="btn-base btn-primary inline-flex items-center gap-2 font-semibold"
              >
                {t.jobs.applyBtn}
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-gold inline-flex items-center gap-2 font-semibold"
              >
                <Instagram className="size-4" aria-hidden="true" />
                {t.jobs.writeInsta}
              </a>
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* Контакты */}
        <section id="contacts" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-4">
          <Reveal>
            <SectionTitle>{t.contacts.title}</SectionTitle>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
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

              <div className="soft-card p-6 sm:p-8">
                <h3 className="text-base font-bold text-primary font-display">{t.contacts.geoTitle}</h3>
                <p className="mt-1 text-xs text-foreground/60">{t.contacts.geoSubtitle}</p>
                <ul className="mt-4 divide-y divide-primary/5 text-sm text-foreground/75">
                  {CITY_STATIONS.flatMap((group) =>
                    group.stations.map((station) => (
                      <li
                        key={`${group.city}-${station.number}`}
                        className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                      >
                        <span className="font-medium text-foreground/90">
                          {getCityName(group)} — АЗС №{station.number}
                        </span>
                        <span className="text-xs text-foreground/60">{getAddress(station)}</span>
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="mt-16 border-t border-primary/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-5">
          <p className="text-sm text-foreground/60">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
