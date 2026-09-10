import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Fuel,
  Coffee,
  ArrowLeft,
  Store,
  ChevronRight,
  Sparkles,
  Search,
  X,
  CreditCard,
  Compass,
  ListFilter,
  Flame,
} from "lucide-react";
import { LeafletMap } from "@/components/site/LeafletMap";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";
import type { Station } from "./index";

export const Route = createFileRoute("/stations")({
  head: () => ({
    meta: [
      { title: "Карта и адреса АЗС С-Мунай — Жезказган, Сатпаев, Астана" },
      {
        name: "description",
        content:
          "Интерактивная карта 8 автозаправочных станций сети С-Мунай в Жезказгане, Сатпаеве и Астане. Круглосуточный режим 24/7, маркеты С-Дүкен, маршруты в 2ГИС.",
      },
    ],
  }),
  component: StationsPage,
});

type CityGroup = {
  city: string;
  cityKz: string;
  cityEn: string;
  gisBranchesUrl: string;
  stations: Station[];
};

const ALL_SERVICES: Station["services"] = ["fuel", "shop", "coffee"];
const FUEL_ONLY: Station["services"] = ["fuel"];

const STATIONS_DATA: CityGroup[] = [
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
        gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001068498088",
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
        gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001068949327",
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
        gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001070980296",
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
        gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001070540201",
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
        gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001070530403",
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
        gisUrl: "https://2gis.kz/zhezkazgan/firm/70000001069917278",
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
        gisUrl: "https://2gis.kz/astana/firm/70000001023880615",
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
        gisUrl: "https://2gis.kz/astana/firm/70000001023880627",
      },
    ],
  },
];

const ALL_STATIONS: Station[] = STATIONS_DATA.flatMap((g) => g.stations);

export function StationsPage() {
  const { lang } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStationNum, setSelectedStationNum] = useState<number>(4);
  const [serviceFilter, setServiceFilter] = useState<"all" | "store" | "flagship">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  const isKz = lang === "kz";
  const isEn = lang === "en";

  function getCityName(c: CityGroup) {
    if (isKz) return c.cityKz;
    if (isEn) return c.cityEn;
    return c.city;
  }

  function getAddress(st: Station) {
    if (isKz) return st.addressKz;
    if (isEn) return st.addressEn;
    return st.address;
  }

  function getHours(st: Station) {
    if (isKz) return st.hoursKz;
    if (isEn) return st.hoursEn;
    return st.hours;
  }

  // Filter stations based on city, services, and query
  const filteredStations = useMemo(() => {
    return ALL_STATIONS.filter((st) => {
      // City filter
      if (selectedCity !== "all" && st.city !== selectedCity) {
        return false;
      }
      // Service filter
      if (serviceFilter === "store" && ![1, 3, 4, 6].includes(st.number)) {
        return false;
      }
      if (serviceFilter === "flagship" && st.number !== 4) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const numMatch = st.number.toString().includes(q);
        const cityMatch = (st.city + " " + st.cityKz + " " + st.cityEn).toLowerCase().includes(q);
        const addressMatch = (st.address + " " + st.addressKz + " " + st.addressEn).toLowerCase().includes(q);
        if (!numMatch && !cityMatch && !addressMatch) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCity, serviceFilter, searchQuery]);

  // Active station
  const activeStation = useMemo(() => {
    return (
      filteredStations.find((st) => st.number === selectedStationNum) ||
      filteredStations[0] ||
      ALL_STATIONS[0]
    );
  }, [filteredStations, selectedStationNum]);

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col">
      {/* Clean Minimalist Header */}
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:py-3.5">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/70 transition-colors hover:text-primary sm:text-sm"
            >
              <ArrowLeft className="size-4" />
              <span>{isKz ? "Басты бет" : isEn ? "Home" : "Главная"}</span>
            </Link>
            <div className="h-4 w-px bg-primary/20" />
            <Link to="/" className="flex items-center transition-opacity hover:opacity-90">
              <img
                src="/images/logo-navbar.svg"
                alt="С-МУНАЙ"
                className="h-8 w-auto object-contain sm:h-9"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <Link to="/#fuel" className="text-foreground/75 hover:text-primary transition-colors">
              {isKz ? "Hi-Tech Отын" : isEn ? "Hi-Tech Fuel" : "Топливо Hi-Tech"}
            </Link>
            <Link to="/#sduken" className="text-foreground/75 hover:text-primary transition-colors">
              {isKz ? "С-Дүкен" : isEn ? "S-Duken" : "С-Дүкен"}
            </Link>
            <Link to="/b2b" className="text-foreground/75 hover:text-primary transition-colors">
              {isKz ? "Бизнеске" : isEn ? "Business" : "Бизнес клиентам"}
            </Link>
            <Link to="/career" className="text-foreground/75 hover:text-primary transition-colors">
              {isKz ? "Мансап" : isEn ? "Careers" : "Вакансии"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/b2b"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-xs font-bold text-gold-foreground shadow-sm transition-all hover:bg-gold-bright hover:shadow"
            >
              <span>{isKz ? "Бизнеске" : isEn ? "For Business" : "Бизнес клиентам"}</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {/* Page Hero & Quick Stats */}
        <section className="border-b border-primary/10 bg-gradient-to-b from-primary/10 via-primary/5 to-background py-10 px-5">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-foreground mb-3">
                  <MapPin className="size-3.5 text-gold" />
                  <span>{isKz ? "8 станция · 3 қала · 1996 жылдан бері" : isEn ? "8 Stations · 3 Cities · Since 1996" : "8 станций · 3 города · с 1996 года"}</span>
                </div>
                <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                  {isKz ? "С-Мұнай АЗС желісі және навигация" : isEn ? "S-Munai Stations Network & Navigation" : "Карта и сеть АЗС «С-Мунай»"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-foreground/80">
                  {isKz
                    ? "Жезқазған, Сәтбаев және Астана қалаларындағы барлық 8 АЗС. 24/7 тәулік бойы қызмет, Hi-Tech еуро-5 отыны, С-Дүкен маркеттері және 2ГИС арқылы 1 басумен дәл маршрут."
                    : isEn
                    ? "All 8 stations across Zhezkazgan, Satpayev, and Astana. 24/7 operations, Euro-5 Hi-Tech fuel, S-Duken convenience stores, and instant 1-tap 2GIS routing."
                    : "Все 8 станций сети в Жезказгане, Сатпаеве и Астане. Круглосуточный сервис 24/7, топливо стандарта Евро-5 Hi-Tech, маркеты «С-Дүкен» и прямой маршрут в 2ГИС."}
                </p>
              </div>

              {/* 2GIS Branches Direct Link */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://2gis.kz/zhezkazgan/branches/70000001068949326"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-background/90 px-4 py-2.5 text-xs font-bold text-primary shadow-xs transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <Compass className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>2ГИС Жезқазған / Сәтбаев</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
                <a
                  href="https://2gis.kz/astana/branches/70000001023880614"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-background/90 px-4 py-2.5 text-xs font-bold text-primary shadow-xs transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <Compass className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>2ГИС Астана</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Network Key Highlights Strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="soft-card p-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                  8
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">{isKz ? "АЗС Желісі" : "Сеть АЗС"}</div>
                  <div className="text-[11px] text-foreground/60">{isKz ? "3 қалада" : "в 3 городах"}</div>
                </div>
              </div>

              <div className="soft-card p-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  24/7
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">{isKz ? "Тәулік бойы" : "Круглосуточно"}</div>
                  <div className="text-[11px] text-foreground/60">{isKz ? "Үзіліссіз қызмет" : "Без перерывов"}</div>
                </div>
              </div>

              <div className="soft-card p-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  <Store className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">{isKz ? "4 С-Дүкен" : "4 С-Дүкен"}</div>
                  <div className="text-[11px] text-foreground/60">{isKz ? "Маркет & Кофе" : "Маркет и кофе"}</div>
                </div>
              </div>

              <div className="soft-card p-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gold/20 text-gold-foreground font-bold">
                  <Flame className="size-5 text-gold" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">{isKz ? "Hi-Tech Отын" : "Топливо Hi-Tech"}</div>
                  <div className="text-[11px] text-foreground/60">{isKz ? "Евро-5 формуласы" : "Формула Евро-5"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Toolbar: Cities, Services & Search */}
        <section className="border-b border-primary/10 bg-background/95 backdrop-blur-sm py-5 px-5 sticky top-[57px] z-30 shadow-xs">
          <div className="mx-auto max-w-6xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* City Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCity("all")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedCity === "all"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-background border border-primary/15 text-foreground/75 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {isKz ? "Барлығы (8)" : isEn ? "All Cities (8)" : "Все города (8)"}
              </button>

              {STATIONS_DATA.map((c) => {
                const isActive = selectedCity === c.city;
                return (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => {
                      setSelectedCity(c.city);
                      setSelectedStationNum(c.stations[0].number);
                    }}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                        : "bg-background border border-primary/15 text-foreground/75 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    {getCityName(c)} ({c.stations.length})
                  </button>
                );
              })}
            </div>

            {/* Service Filter Chips & Search Box */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Service filter */}
              <div className="inline-flex rounded-xl border border-primary/15 bg-primary/5 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setServiceFilter("all")}
                  className={`rounded-lg px-2.5 py-1 transition-colors ${
                    serviceFilter === "all" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {isKz ? "Барлығы" : "Все"}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceFilter("store")}
                  className={`rounded-lg px-2.5 py-1 transition-colors ${
                    serviceFilter === "store" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  🏪 {isKz ? "С-Дүкен (4)" : "С-Дүкен (4)"}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceFilter("flagship")}
                  className={`rounded-lg px-2.5 py-1 transition-colors ${
                    serviceFilter === "flagship" ? "bg-amber-400 text-amber-950 font-bold shadow-xs" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  ⭐ {isKz ? "Флагман (№4)" : "Флагман (№4)"}
                </button>
              </div>

              {/* Search input */}
              <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-foreground/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isKz ? "Көше немесе АЗС № іздеу..." : "Поиск по адресу или №..."}
                  className="w-full rounded-xl border border-primary/20 bg-background py-1.5 pl-9 pr-8 text-xs placeholder:text-foreground/40 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Segmented Toggle (List vs Map) */}
          <div className="mt-3 flex lg:hidden border-t border-primary/10 pt-3">
            <div className="grid grid-cols-2 w-full gap-2 rounded-xl bg-primary/5 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMobileView("list")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                  mobileView === "list" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-primary"
                }`}
              >
                <ListFilter className="size-3.5" />
                <span>{isKz ? `Тізім (${filteredStations.length})` : `Список (${filteredStations.length})`}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileView("map")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                  mobileView === "map" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-primary"
                }`}
              >
                <Compass className="size-3.5" />
                <span>{isKz ? "Интерактивті карта" : "Карта станций"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Station Work Area (List + Map) */}
        <section className="mx-auto max-w-6xl px-5 mt-8">
          {filteredStations.length === 0 ? (
            <div className="soft-card p-12 text-center my-8">
              <MapPin className="size-10 text-primary/30 mx-auto mb-3" />
              <h3 className="font-bold text-primary font-display text-lg">
                {isKz ? "Ешбір АЗС табылмады" : "Станции не найдены"}
              </h3>
              <p className="text-xs text-foreground/60 mt-1 max-w-md mx-auto">
                {isKz
                  ? "Іздеу сұранысын өзгертіп көріңіз немесе барлық қалалар сүзгісін таңдаңыз."
                  : "Попробуйте изменить поисковый запрос или сбросить фильтры по городу."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("all");
                  setServiceFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
              >
                {isKz ? "Сүзгілерді тазарту" : "Сбросить фильтры"}
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.15fr_1.35fr] gap-6 items-start">
              {/* Left Column: Stations Cards List */}
              <div className={`space-y-4 ${mobileView === "map" ? "hidden lg:block" : "block"}`}>
                <div className="flex items-center justify-between text-xs text-foreground/60 px-1">
                  <span>
                    {isKz ? "Таңдалған станциялар:" : "Показано станций:"} {filteredStations.length}
                  </span>
                  <span className="text-primary font-medium">
                    {isKz ? "Картадан көру үшін басыңыз" : "Нажмите для фокуса на карте"}
                  </span>
                </div>

                {filteredStations.map((st) => {
                  const isCurrent = st.number === activeStation.number;
                  const hasStore = [1, 3, 4, 6].includes(st.number);
                  const isFlagship = st.number === 4;
                  const hasCoffee = st.services.includes("coffee");

                  return (
                    <article
                      key={st.number}
                      onClick={() => {
                        setSelectedStationNum(st.number);
                      }}
                      className={`soft-card relative p-5 transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? "border-primary bg-primary/[0.04] ring-2 ring-gold shadow-lg"
                          : "hover:border-primary/40 hover:bg-primary/[0.02]"
                      }`}
                    >
                      {/* Active Indicator Strip */}
                      {isCurrent && (
                        <span className="absolute left-0 top-3 bottom-3 w-1.5 bg-gold rounded-r-full" />
                      )}

                      {/* Card Header: Number, Brand, City & Status Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm shadow-xs transition-colors ${
                              isCurrent
                                ? "bg-gold text-slate-950 font-black"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {st.number}
                          </span>
                          <div>
                            <h3 className="font-bold text-primary font-display text-lg leading-tight">
                              АЗС №{st.number} · {isKz ? "С-Мұнай" : "С-Мунай"}
                            </h3>
                            <p className="text-xs font-semibold text-foreground/60">
                              {st.city}
                            </p>
                          </div>
                        </div>

                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          {isFlagship && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-amber-950 shadow-xs">
                              <Sparkles className="size-3" />
                              <span>{isKz ? "Флагман С-Дүкен" : "Флагман С-Дүкен"}</span>
                            </span>
                          )}
                          {hasStore && !isFlagship && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-300">
                              <Store className="size-3" />
                              <span>С-Дүкен 24/7</span>
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            24/7
                          </span>
                        </div>
                      </div>

                      {/* Address & Hours */}
                      <div className="mt-3.5 space-y-1.5 text-xs text-foreground/80">
                        <div className="flex items-start gap-2">
                          <MapPin className="size-4 shrink-0 text-terracotta mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm text-foreground/90">{getAddress(st)}</div>
                            {lang !== "kz" && <div className="text-[11px] text-foreground/50 mt-0.5">{st.addressKz}</div>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/65 pl-6">
                          <Clock className="size-3.5 shrink-0 text-foreground/40" />
                          <span>{getHours(st)} · {isKz ? "Үзіліссіз" : "Без перерывов"}</span>
                        </div>
                      </div>

                      {/* Fuel Available Tags */}
                      <div className="mt-3.5 pt-3 border-t border-primary/10">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1.5">
                          {isKz ? "Жанармай түрлері:" : "Виды топлива на АЗС:"}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="rounded-lg border border-gold/40 bg-gold/10 px-2 py-0.5 text-[11px] font-bold text-gold-foreground">
                            95 Hi-Tech
                          </span>
                          <span className="rounded-lg border border-gold/40 bg-gold/10 px-2 py-0.5 text-[11px] font-bold text-gold-foreground">
                            92 Hi-Tech
                          </span>
                          <span className="rounded-lg border border-primary/15 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                            АИ-92
                          </span>
                          <span className="rounded-lg border border-primary/15 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                            ДТ Евро
                          </span>
                        </div>
                      </div>

                      {/* Services Strip */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-foreground/75">
                        <span className="inline-flex items-center gap-1 rounded-md bg-foreground/5 px-2 py-0.5">
                          <Fuel className="size-3 text-primary" />
                          <span>{isKz ? "Дәл құю" : "Точный налив"}</span>
                        </span>
                        {hasStore && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-foreground/5 px-2 py-0.5">
                            <Store className="size-3 text-amber-500" />
                            <span>{isKz ? "С-Дүкен" : "Маркет"}</span>
                          </span>
                        )}
                        {hasCoffee && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-foreground/5 px-2 py-0.5">
                            <Coffee className="size-3 text-amber-600" />
                            <span>{isKz ? "Арабика кофе" : "Кофе с собой"}</span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-md bg-foreground/5 px-2 py-0.5">
                          <CreditCard className="size-3 text-emerald-600" />
                          <span>Kaspi QR</span>
                        </span>
                      </div>

                      {/* Action Button: 2GIS Route */}
                      <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between">
                        <a
                          href={st.gisUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:from-emerald-500 hover:to-teal-600 hover:shadow"
                        >
                          <Navigation className="size-3.5" />
                          <span>{isKz ? "2ГИС Бағыты →" : isEn ? "2GIS Route →" : "Маршрут в 2ГИС →"}</span>
                        </a>

                        <span className="text-[11px] font-semibold text-foreground/50 flex items-center gap-1.5">
                          <Clock className="size-3 text-emerald-500" />
                          <span>{getHours(st)}</span>
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Right Column: Sticky Interactive Leaflet Map */}
              <div className={`sticky top-24 rounded-3xl overflow-hidden border border-primary/20 shadow-2xl bg-slate-950/5 flex flex-col h-[calc(100vh-8rem)] min-h-[560px] max-h-[780px] ${
                mobileView === "list" ? "hidden lg:flex" : "flex"
              }`}>
                {/* Map Area */}
                <div className="relative flex-1 min-h-[420px]">
                  <LeafletMap
                    stations={filteredStations}
                    activeStationNum={activeStation.number}
                    onStationSelect={setSelectedStationNum}
                    lang={lang}
                  />
                </div>

                {/* Bottom Bar: Active Station Focus & 1-Tap Navigation */}
                <div className="p-4 bg-background/95 backdrop-blur-md border-t border-primary/15 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold text-slate-950 font-black text-xs shadow-xs">
                      {activeStation.number}
                    </span>
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-bold text-primary truncate">
                        АЗС №{activeStation.number} · {getAddress(activeStation)}
                      </div>
                      <div className="text-[11px] text-foreground/60 flex items-center gap-1.5">
                        <span>{activeStation.city}</span>
                        <span>·</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{getHours(activeStation)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={activeStation.gisUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-base btn-gold inline-flex items-center gap-1.5 !px-4 !py-2 !text-xs font-bold shadow-md"
                    >
                      <Navigation className="size-3.5" />
                      <span>{isKz ? "2ГИС Бағыты" : "Поехать в 2ГИС →"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Corporate / Fleet B2B Bridge */}
        <section className="mx-auto max-w-6xl px-5 mt-16">
          <div className="hero-surface rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold text-gold">
                {isKz ? "Корпоративтік автопарктерге" : "Корпоративным клиентам и автопаркам"}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                {isKz ? "Жанармай карталары, талондар және лимиттер" : "Топливные карты, талоны и оптовые поставки"}
              </h2>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                {isKz
                  ? "Жезқазған, Сәтбаев және Астана қалаларындағы көліктерге жеке лимиттер, бірыңғай шот және 16% ҚҚС есебі (ЭСФ)."
                  : "Индивидуальные лимиты по машинам в Жезказгане, Сатпаеве и Астане, единый счёт компании и зачёт 16% НДС по ЭСФ."}
              </p>
            </div>
            <Link
              to="/b2b"
              className="btn-base btn-gold shrink-0 font-bold text-slate-950 shadow-md"
            >
              {isKz ? "Бизнес бөліміне өту →" : "Перейти в Бизнес-портал →"}
            </Link>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="hero-surface border-t border-white/10 py-10 text-white/70 text-xs">
        <div className="mx-auto max-w-6xl px-5 flex flex-wrap items-center justify-between gap-4">
          <p>© 1996–2026 ТОО «С-Мунай». Барлық құқықтар қорғалған.</p>
          <div className="flex flex-wrap gap-4 font-medium">
            <Link to="/" className="hover:text-gold transition-colors">{isKz ? "Басты бет" : "Главная"}</Link>
            <Link to="/b2b" className="hover:text-gold transition-colors">{isKz ? "Бизнеске" : "Бизнес клиентам"}</Link>
            <Link to="/career" className="hover:text-gold transition-colors">{isKz ? "Мансап" : "Вакансии"}</Link>
            <Link to="/privacy" className="hover:text-gold transition-colors">{isKz ? "Құпиялылық" : "Конфиденциальность"}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
