import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { Fuel, ShoppingBag, Coffee, Instagram, MapPin, Clock } from "lucide-react";
import { B2BDialog } from "@/components/site/B2BDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "С-Мунай — сеть АЗС в Жезказгане, Улытау, Сатпаеве и Астане" },
      {
        name: "description",
        content:
          "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Улытау, Сатпаеве и Астане с 1996 года: качественное топливо, магазин и кофе с собой.",
      },
      { property: "og:title", content: "С-Мунай — сеть АЗС в Жезказгане, Улытау, Сатпаеве и Астане" },
      {
        property: "og:description",
        content: "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Улытау, Сатпаеве и Астане с 1996 года: качественное топливо, магазин и кофе с собой.",
      },
    ],
  }),
  component: Index,
});

const INSTAGRAM_URL = "https://www.instagram.com/azs_smunai?igsh=MWRnOHhrcGM1MHk4dg==";
const EMAIL = "EMAIL";
const PHONE = "87770000000";

const NAV = [
  { href: "#azs", label: "АЗС" },
  { href: "#fuel", label: "Топливо" },
  { href: "#promo", label: "Акции" },
  { href: "#b2b", label: "Бизнесу" },
  { href: "#about", label: "О нас" },
  { href: "#jobs", label: "Вакансии" },
  { href: "#contacts", label: "Контакты" },
];

type Station = {
  number: number;
  address: string;
  hours: string;
  services: ("fuel" | "shop" | "coffee")[];
};

type CityGroup = {
  city: string;
  stations: Station[];
};

const ALL_SERVICES: Station["services"] = ["fuel", "shop", "coffee"];
const FUEL_ONLY: Station["services"] = ["fuel"];

const CITY_STATIONS: CityGroup[] = [
  {
    city: "Жезказган",
    stations: [
      { number: 1, address: "мира 39", hours: "[Часы работы]", services: ALL_SERVICES },
      { number: 3, address: "мира 39", hours: "[Часы работы]", services: ALL_SERVICES },
      { number: 4, address: "мира 39", hours: "[Часы работы]", services: ALL_SERVICES },
    ],
  },
  {
    city: "Улытау",
    stations: [{ number: 2, address: "[Адрес]", hours: "[Часы работы]", services: FUEL_ONLY }],
  },
  {
    city: "Сатпаев",
    stations: [
      { number: 5, address: "Улытауская, 114", hours: "Круглосуточно", services: ALL_SERVICES },
      { number: 6, address: "мира 39", hours: "[Часы работы]", services: ALL_SERVICES },
    ],
  },
  {
    city: "Астана",
    stations: [
      { number: 7, address: "мира 39", hours: "[Часы работы]", services: ALL_SERVICES },
      { number: 8, address: "мира 39", hours: "[Часы работы]", services: ALL_SERVICES },
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
  return <h2 className="text-2xl font-bold text-primary sm:text-3xl">{children}</h2>;
}

function PriceTotem() {
  const rows = [
    { label: "АИ-92", price: "___ ₸" },
    { label: "АИ-95", price: "___ ₸" },
    { label: "ДТ", price: "___ ₸" },
  ];

  return (
    <div className="mx-auto w-full max-w-xs rounded-2xl bg-primary p-5 text-primary-foreground shadow-[0_28px_50px_-30px_rgba(13,108,137,0.8)] lg:mx-0">
      <p className="text-center font-display text-sm font-semibold tracking-[0.2em] text-gold">
        С-МУНАЙ
      </p>
      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
          >
            <span className="text-sm font-medium opacity-90">{row.label}</span>
            <span className="font-mono text-xl font-bold tabular-nums text-gold">{row.price}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed opacity-75">
        Актуальные цены уточняйте на АЗС
      </p>
    </div>
  );
}

const SERVICE_META: Record<
  Station["services"][number],
  { icon: typeof Fuel; label: string }
> = {
  fuel: { icon: Fuel, label: "Топливо" },
  shop: { icon: ShoppingBag, label: "Магазин" },
  coffee: { icon: Coffee, label: "Кофе" },
};

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <a href="#top" className="font-display text-lg font-bold tracking-wide text-primary">
            С-МУНАЙ
          </a>
          <nav aria-label="Основная навигация" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a className="transition-colors hover:text-primary" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram С-Мунай"
            className="ml-auto rounded-full border border-primary/20 p-2 text-terracotta transition-colors hover:bg-primary/5 lg:ml-0"
          >
            <Instagram className="size-5" aria-hidden="true" />
          </a>
        </div>
        <nav aria-label="Разделы" className="border-t border-primary/10 lg:hidden">
          <ul className="flex gap-5 overflow-x-auto px-5 py-3 text-sm font-medium">
            {NAV.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-foreground">
                1996–2026 · 30 лет
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-bold text-primary sm:text-4xl md:text-5xl">
                Заправляем Жезказган, Улытау, Сатпаев и Астану уже 30 лет
              </h1>
              <p className="mt-5 max-w-xl text-base text-foreground/75 sm:text-lg">
                8 собственных АЗС · качественное топливо · магазин и кофе с собой
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#azs" className="btn-base btn-gold">
                  Найти АЗС
                </a>
                <a href="#promo" className="btn-base btn-teal-outline">
                  Акции
                </a>
              </div>
            </Reveal>
            <Reveal>
              <PriceTotem />
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <dl className="grid gap-4 sm:grid-cols-3">
              {[
                ["30 лет", "на рынке"],
                ["8", "АЗС"],
                ["4", "города"],
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
            <SectionTitle>Наши АЗС</SectionTitle>
            <p className="mt-3 max-w-2xl text-foreground/75">
              Выберите ближайшую станцию — мы работаем для вас каждый день.
            </p>
          </Reveal>

          {CITY_STATIONS.map((group) => (
            <Reveal key={group.city} className="mt-10">
              <h3 className="text-lg font-semibold text-terracotta">{group.city}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.stations.map((station) => (
                  <article key={station.number} className="soft-card p-5">
                    <h4 className="font-display text-base font-bold text-primary">АЗС №{station.number}</h4>
                    <p className="mt-3 flex items-start gap-2 text-sm text-foreground/75">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden="true" />
                      {station.address}
                    </p>
                    <p className="mt-2 flex items-start gap-2 text-sm text-foreground/75">
                      <Clock className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden="true" />
                      {station.hours}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {SERVICES.map(({ icon: Icon, label }) => (
                        <li
                          key={label}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                          <Icon className="size-3.5" aria-hidden="true" />
                          {label}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal className="mt-10">
            <figure className="soft-card overflow-hidden">
              <div className="flex h-56 items-center justify-center bg-primary/5 text-sm text-primary/60 sm:h-72">
                Карта станций
              </div>
              <figcaption className="px-5 py-3 text-sm text-foreground/70">Карта станций</figcaption>
            </figure>
          </Reveal>
        </section>

        <Stripe />

        {/* Топливо и сервис */}
        <section id="fuel" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>Топливо и сервис</SectionTitle>
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {["АИ-92", "АИ-95", "ДТ"].map((fuel) => (
                <article key={fuel} className="soft-card p-6">
                  <Fuel className="size-5 text-terracotta" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl font-bold text-primary">{fuel}</h3>
                  <p className="mt-2 text-sm text-foreground/75">
                    Топливо с контролем качества на каждой поставке
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="soft-card p-6">
                <ShoppingBag className="size-5 text-terracotta" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-primary">Магазин на АЗС</h3>
                <p className="mt-2 text-sm text-foreground/75">
                  Всё нужное в дорогу: снеки, напитки, автотовары.
                </p>
              </article>
              <article className="soft-card p-6">
                <Coffee className="size-5 text-terracotta" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-primary">Кофе с собой</h3>
                <p className="mt-2 text-sm text-foreground/75">
                  Свежий кофе на каждой станции — заправьтесь и вы.
                </p>
              </article>
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* Акции */}
        <section id="promo" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>Акции и бонусы</SectionTitle>
          </Reveal>
          <Reveal className="mt-8">
            <div className="rounded-2xl bg-gold p-7 sm:p-9">
              <p className="max-w-3xl font-display text-base leading-relaxed font-semibold text-primary sm:text-lg">
                Нам 30 лет! Празднуем юбилей вместе с Днём работников нефтегазовой промышленности —
                следите за акциями и розыгрышами в нашем Instagram.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-base mt-6 bg-primary text-primary-foreground"
              >
                <Instagram className="size-4" aria-hidden="true" />
                Мы в Instagram
              </a>
            </div>
          </Reveal>
          <Reveal className="mt-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [
                  "Бонусные топливные карты",
                  "Участвуйте в акциях и выигрывайте карты с бесплатным топливом.",
                ],
                ["Акция месяца", "[Описание акции]"],
                [
                  "Промокоды в Instagram",
                  "Следите за сторис — ловите промокоды на кофе и покупки в магазине.",
                ],
              ].map(([title, text]) => (
                <article key={title} className="soft-card p-6">
                  <h3 className="text-base font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-sm text-foreground/75">{text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* Бизнесу */}
        <section id="b2b" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <div className="soft-card grid gap-8 p-7 sm:p-10 lg:grid-cols-2">
              <div>
                <SectionTitle>Топливные карты для бизнеса</SectionTitle>
                <p className="mt-4 text-foreground/75">
                  Заправляйте автопарк по безналичному расчёту: контроль расходов по каждой машине,
                  закрывающие документы, персональные условия для компаний Жезказгана, Улытау,
                  Сатпаева и Астаны.
                </p>
                <div className="mt-7">
                  <B2BDialog />
                </div>
              </div>
              <ul className="space-y-3 self-center">
                {[
                  "Безналичный расчёт и договор",
                  "Отчёты по каждой карте",
                  "Закрывающие документы",
                  "Персональный менеджер",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <Stripe />

        {/* О нас */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>О нас</SectionTitle>
            <p className="mt-4 max-w-3xl text-foreground/80">
              С 1996 года мы развиваем собственную сеть АЗС в Улытауской области и Астане. Начинали
              с одной станции — сегодня нас восемь. Мы местная команда: знаем свои города, своих
              клиентов и отвечаем за качество топлива репутацией, заработанной за 30 лет.
            </p>
            <span className="mt-6 inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-gold-foreground">
              1996–2026 · 30 лет
            </span>
          </Reveal>
        </section>

        <Stripe />

        {/* Вакансии */}
        <section id="jobs" className="mx-auto max-w-6xl scroll-mt-28 px-5">
          <Reveal>
            <SectionTitle>Вакансии</SectionTitle>
            <p className="mt-4 max-w-3xl text-foreground/80">
              Присоединяйтесь к команде С-Мунай — нам нужны внимательные и доброжелательные люди:
              кассиры, операторы, бариста. Напишите нам, и мы расскажем о свободных позициях.
            </p>
            <a href={`mailto:${EMAIL}`} className="btn-base btn-gold mt-6">
              Написать нам
            </a>
          </Reveal>
        </section>

        <Stripe />

        {/* Контакты */}
        <section id="contacts" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-4">
          <Reveal>
            <SectionTitle>Контакты</SectionTitle>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <ul className="space-y-3 text-foreground/85">
                <li>
                  Телефон:{" "}
                  <a className="font-medium text-primary hover:underline" href={`tel:${PHONE}`}>
                    {PHONE}
                  </a>
                </li>
                <li>
                  Instagram:{" "}
                  <a
                    className="font-medium break-all text-primary hover:underline"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {INSTAGRAM_URL}
                  </a>
                </li>
                <li>
                  Почта:{" "}
                  <a className="font-medium text-primary hover:underline" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </li>
              </ul>
              <div className="soft-card p-6">
                <h3 className="text-base font-bold text-primary">Все станции</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/75">
                  {CITY_STATIONS.flatMap((group) =>
                    group.stations.map((station) => (
                      <li key={`${group.city}-${station.number}`}>
                        {group.city} — АЗС №{station.number} — {station.address}
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
        <p className="mx-auto max-w-6xl px-5 text-sm text-foreground/60">
          © С-Мунай, 1996–2026. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
