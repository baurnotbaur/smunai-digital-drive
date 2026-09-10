import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Truck, 
  Warehouse, 
  CreditCard, 
  Ticket, 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  Building2, 
  PhoneCall, 
  ArrowLeft,
  Scale,
  Sparkles
} from "lucide-react";
import { B2BLeadForm } from "@/components/site/B2BLeadForm";
import { B2BCalculator } from "@/components/site/B2BCalculator";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: "Бизнес клиенттерге / Бизнес клиентам — Оптовая доставка, хранение и карты — С-Мунай" },
      {
        name: "description",
        content:
          "Оптовые поставки топлива бензовозами от 5 000 л, ответственное хранение на нефтебазе, корпоративные карты и талоны в Жезказгане, Сатпаеве и Астане. Сеть АЗС С-Мунай — 30 лет опыта.",
      },
    ],
  }),
  component: B2BPage,
});

function B2BPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"delivery" | "storage" | "cards" | "vouchers">("delivery");
  const [calculatorComment, setCalculatorComment] = useState<string>("");

  const b = t.b2bHub;
  const isKz = lang === "kz";
  const isEn = lang === "en";

  return (
    <div className="min-h-dvh bg-slate-950 text-white selection:bg-gold selection:text-slate-950 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:py-3.5">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white sm:text-sm"
            >
              <ArrowLeft className="size-4" />
              <span>{isKz ? "Басты бетке" : isEn ? "Back to Home" : "На главную"}</span>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo-white.svg" alt="С-Мунай" className="h-8 w-auto object-contain sm:h-9" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#order-form"
              className="btn-base btn-gold !py-2 !px-4 !text-xs font-bold text-slate-950"
            >
              {b.orderBtn}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-surface relative overflow-hidden py-16 sm:py-24 text-white border-b border-white/10">
        <div className="ambient-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/15 px-4 py-1.5 text-xs font-semibold tracking-wider text-teal-300 backdrop-blur-md">
            <Building2 className="size-3.5 text-teal-300" />
            <span className="uppercase">{b.badge}</span>
          </div>

          <p className="font-serif mt-3 text-lg sm:text-xl italic text-gold-bright">
            {isKz ? "Жанармай — көлікке, Ұлытау — жүректе" : isEn ? "Fuel for Vehicles, Ulytau in Heart" : "Надёжный топливный партнёр для вашего бизнеса"}
          </p>

          <h1 className="display-hero mt-4 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            {b.title}
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-slate-300">
            {b.subtitle}
          </p>

          {/* Quick CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#order-form" className="btn-base btn-gold glow-gold font-bold text-slate-950">
              {b.orderBtn}
            </a>
            <a
              href="#calculator"
              className="btn-base btn-teal-outline border-white/20 text-white hover:bg-white/10"
            >
              <BarChart3 className="size-4" />
              <span>{isKz ? "Экономияны есептеу" : isEn ? "Calculate Savings" : "Рассчитать экономию"}</span>
            </a>
          </div>

          {/* Quick Metrics Bar - 4 Richly Styled Blocks */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-teal-500/25 bg-gradient-to-b from-teal-950/35 to-slate-900/60 p-4 sm:p-5 text-center backdrop-blur-md hover:border-teal-400/40 transition-colors">
              <div className="font-display text-2xl sm:text-3xl font-bold text-teal-300">5 000+ л</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {isKz ? "Жеткізу партиясы" : isEn ? "Min. Tanker Load" : "Партия доставки"}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-950/35 to-slate-900/60 p-4 sm:p-5 text-center backdrop-blur-md hover:border-amber-400/40 transition-colors">
              <div className="font-display text-2xl sm:text-3xl font-bold text-amber-300">100%</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {isKz ? "Зауыттық сапа паспорты" : isEn ? "Refinery Certified" : "Паспорта качества НПЗ"}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-950/35 to-slate-900/60 p-4 sm:p-5 text-center backdrop-blur-md hover:border-emerald-400/40 transition-colors">
              <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-300">16% ҚҚС</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {isKz ? "Толық ресми ЭШФ есебі" : isEn ? "Full 16% VAT Offset" : "Зачёт НДС по ЭСФ"}
              </div>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/15 to-slate-900/60 p-4 sm:p-5 text-center backdrop-blur-md hover:border-gold-bright transition-colors">
              <div className="font-display text-2xl sm:text-3xl font-bold text-gold-bright">30 Жыл</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {isKz ? "Үздіксіз тәжірибе (1996)" : isEn ? "Experience since 1996" : "Надёжность с 1996 г."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Interactive Navigator */}
      <section className="py-16 sm:py-24 bg-slate-950 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold text-teal-300 uppercase tracking-wider">
              <Sparkles className="size-3.5 text-gold" />
              <span>{isKz ? "4 негізгі бағыт" : isEn ? "4 Service Pillars" : "4 направления для бизнеса"}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              {isKz ? "Корпоративтік қызметтер кешені" : isEn ? "Comprehensive Corporate Services" : "Комплекс корпоративных услуг"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              {isKz 
                ? "Отынды жеткізу, резервуарлық сақтау және автопаркті цифрлық басқару"
                : isEn
                ? "Wholesale logistics, terminal storage, and smart cashless fleet control"
                : "Оптовая логистика, надёжное хранение и безналичный контроль расходов автопарка"}
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("delivery")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                activeTab === "delivery"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-lg shadow-teal-500/20"
                  : "border border-white/10 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Truck className="size-4" />
              <span>{b.tabDelivery}</span>
            </button>

            <button
              onClick={() => setActiveTab("storage")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                activeTab === "storage"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-lg shadow-teal-500/20"
                  : "border border-white/10 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Warehouse className="size-4" />
              <span>{b.tabStorage}</span>
            </button>

            <button
              onClick={() => setActiveTab("cards")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                activeTab === "cards"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-lg shadow-teal-500/20"
                  : "border border-white/10 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <CreditCard className="size-4" />
              <span>{b.tabCards}</span>
            </button>

            <button
              onClick={() => setActiveTab("vouchers")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                activeTab === "vouchers"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-lg shadow-teal-500/20"
                  : "border border-white/10 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Ticket className="size-4" />
              <span>{b.tabVouchers}</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="mt-8">
            {/* Tab 1: Bulk Delivery */}
            {activeTab === "delivery" && (
              <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 border border-teal-400/30 px-3 py-1 text-xs font-semibold text-teal-300">
                      <Truck className="size-3.5" />
                      <span>{isKz ? "Логистика және отын жеткізу" : isEn ? "Logistics & Tanker Dispatch" : "Логистика и доставка топлива"}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {b.deliveryTitle}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">
                      {b.deliveryDesc}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-teal-500/20 bg-teal-950/30 p-4">
                        <CheckCircle2 className="size-5 text-teal-400" />
                        <div className="mt-2 text-xs font-semibold text-slate-200">{b.deliveryFeat1}</div>
                      </div>
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4">
                        <Scale className="size-5 text-amber-400" />
                        <div className="mt-2 text-xs font-semibold text-slate-200">{b.deliveryFeat2}</div>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                        <Clock className="size-5 text-emerald-400" />
                        <div className="mt-2 text-xs font-semibold text-slate-200">{b.deliveryFeat3}</div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href="#order-form"
                        className="btn-base btn-gold glow-gold font-bold text-slate-950"
                      >
                        <span>{b.orderBtn}</span>
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 lg:col-span-5 backdrop-blur-sm">
                    <h3 className="font-display text-lg font-bold uppercase text-white">
                      {isKz ? "Жеткізу географиясы" : isEn ? "Delivery Coverage" : "География доставки"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Жезқазған және Сәтбаев:" : isEn ? "Zhezkazgan & Satpayev:" : "Жезказган и Сатпаев:"}
                          </strong>{" "}
                          {isKz ? "қалалық кәсіпорындар, логистикалық қоймалар, АТП" : isEn ? "commercial fleets, logistics terminals, depots" : "городские предприятия, логистические склады, АТП"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Ұлытау облысы:" : isEn ? "Ulytau Region:" : "Область Улытау:"}
                          </strong>{" "}
                          {isKz ? "тау-кен карьерлері, құрылыс нысандары, жол техникасы" : isEn ? "open-pit mines, construction projects, road equipment" : "горнодобывающие карьеры, строительные объекты, дорожная техника"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Астана және маңы:" : isEn ? "Astana & Suburbs:" : "Астана и пригород:"}
                          </strong>{" "}
                          {isKz ? "корпоративтік базалар, автопарктер мен арнайы техника" : isEn ? "fleet yards, freight hubs and heavy equipment" : "корпоративные базы, автопарки и спецтехника"}
                        </span>
                      </li>
                    </ul>

                    <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/15 p-4 text-xs text-amber-200 font-medium">
                      <strong>{isKz ? "Көлем кепілдігі:" : isEn ? "Volume Guarantee:" : "Гарантия объёма:"}</strong>{" "}
                      {isKz 
                        ? "Әрбір цистерна зауыттық пломбаланады, өлшеу тақталарымен жабдықталған және тығыздықтың кіріс-шығыс міндетті бақылауынан өтеді."
                        : isEn
                        ? "Every tanker is sealed at the refinery gate, equipped with calibrated dipsticks, and inspected on dispatch and arrival."
                        : "Каждая цистерна опломбирована, снабжена мерными планками и проходит обязательный входной и выходной контроль плотности."}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Fuel Storage / Oil Depot */}
            {activeTab === "storage" && (
              <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 border border-teal-400/30 px-3 py-1 text-xs font-semibold text-teal-300">
                      <Warehouse className="size-3.5" />
                      <span>{isKz ? "Резервуарлық сақтау" : isEn ? "Bulk Tank Farm Storage" : "Резервуарный парк"}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {b.storageTitle}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">
                      {b.storageDesc}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-teal-500/20 bg-teal-950/30 p-4">
                        <ShieldCheck className="size-5 text-teal-400" />
                        <div className="mt-2 text-xs font-semibold text-slate-200">{b.storageFeat1}</div>
                      </div>
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4">
                        <Clock className="size-5 text-amber-400" />
                        <div className="mt-2 text-xs font-semibold text-slate-200">{b.storageFeat2}</div>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                        <FileText className="size-5 text-emerald-400" />
                        <div className="mt-2 text-xs font-semibold text-slate-200">{b.storageFeat3}</div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href="#order-form"
                        className="btn-base btn-gold glow-gold font-bold text-slate-950"
                      >
                        <span>{b.orderBtn}</span>
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 lg:col-span-5 backdrop-blur-sm">
                    <h3 className="font-display text-lg font-bold uppercase text-white">
                      {isKz ? "Нефтебаза мүмкіндіктері" : isEn ? "Facility Highlights" : "Инфраструктура хранения"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Т/ж цистерналарын қабылдау:" : isEn ? "Rail Tanker Siding:" : "Приёмка ЖД-цистерн:"}
                          </strong>{" "}
                          {isKz ? "жеке теміржол тұйығы және жедел төгу" : isEn ? "direct railway spur and high-throughput unloading" : "прямой железнодорожный тупик и скоростной слив"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Автоматтандырылған құю:" : isEn ? "Automated Dispensing:" : "Автоматизированный налив:"}
                          </strong>{" "}
                          {isKz ? "термокомпенсациясы бар дәл есептегіштер" : isEn ? "temperature-compensated precision flow meters" : "точные счетчики с термокомпенсацией объёма"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "GasNet жүйесі:" : isEn ? "GasNet ERP:" : "GasNet система:"}
                          </strong>{" "}
                          {isKz ? "тапсырыс беруші қалдықтарын онлайн нақты бақылау" : isEn ? "real-time balance and volume reconciliation" : "прозрачный учёт остатков заказчика в режиме реального времени"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-teal-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Тәулік бойы күзет:" : isEn ? "24/7 Security:" : "Круглосуточная охрана:"}
                          </strong>{" "}
                          {isKz ? "периметрлік бейнебақылау және қатаң өткізу режимі" : isEn ? "perimeter surveillance and strict access protocol" : "видеонаблюдение периметра и пропускной режим"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Fleet Cards */}
            {activeTab === "cards" && (
              <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 border border-teal-400/30 px-3 py-1 text-xs font-semibold text-teal-300">
                      <CreditCard className="size-3.5" />
                      <span>{isKz ? "Корпоративтік карталар" : isEn ? "Smart Fleet Cards" : "Топливные карты"}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {isKz ? "Автопаркті бақылауға арналған С-Мұнай карталары" : isEn ? "S-Munai Cards for Commercial Fleets" : "Контроль автопарка и экономия с топливными картами"}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">
                      {isKz 
                        ? "Әрбір жүргізушіге тәуліктік және айлық лимиттер қойыңыз. Жанармайды заңсыз сату мен жалған чектен 100% қорғаныс және 16% ҚҚС қайтару."
                        : isEn
                        ? "Set daily and monthly volume limits for each driver. Eliminate fuel theft and false receipts, with full 16% VAT refund eligibility."
                        : "Установите индивидуальные суточные и месячные лимиты по каждому водителю. Исключите сливы и фиктивные чеки, экономя до 7% бюджета и получая зачёт НДС 16%."}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="#calculator"
                        className="btn-base btn-teal-outline border-white/20 text-white hover:bg-white/10"
                      >
                        <BarChart3 className="size-4" />
                        <span>{isKz ? "Экономияны есептеу" : isEn ? "Calculate Savings" : "Рассчитать экономию"}</span>
                      </a>
                      <a
                        href="#order-form"
                        className="btn-base btn-gold glow-gold font-bold text-slate-950"
                      >
                        <span>{isKz ? "Картаға өтінім беру" : isEn ? "Order Cards" : "Заказать карты"}</span>
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 lg:col-span-5 backdrop-blur-sm">
                    <h3 className="font-display text-lg font-bold uppercase text-white">
                      {isKz ? "Картаның артықшылықтары" : isEn ? "Card Advantages" : "Преимущества для бухгалтерии"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Бірыңғай баланс:" : isEn ? "Central Account Balance:" : "Единый баланс:"}
                          </strong>{" "}
                          {isKz ? "жүргізушілерде қолма-қол ақшасыз, шотыңыздан бір реттік аударыммен толықтыру" : isEn ? "driver cash advances replaced with one central corporate account" : "пополнение по безналичному расчёту без наличных денег у водителей"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Тәуліктік лимиттер:" : isEn ? "Daily Fuel Limits:" : "Суточные лимиты:"}
                          </strong>{" "}
                          {isKz ? "демалыс күндері рұқсат етілмеген жанармай құюды толық бұғаттау" : isEn ? "automated lockout of non-work hours and weekend fill-ups" : "блокировка несанкционированных заправок в выходные дни"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Автоматты ЭШФ:" : isEn ? "Automated Tax Invoicing:" : "Автоматические ЭСФ:"}
                          </strong>{" "}
                          {isKz ? "ҚР Салық органдарына қажетті барлық есептік құжаттар топтамасы" : isEn ? "full electronic documentation package for Kazakh tax authorities" : "полный пакет документов для Налогового комитета РК"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Fuel Vouchers */}
            {activeTab === "vouchers" && (
              <div className="rounded-3xl border border-amber-500/35 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-300">
                      <Ticket className="size-3.5" />
                      <span>{isKz ? "Бекітілген баға" : isEn ? "Fixed Price Protection" : "Защита от роста цен"}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {isKz ? "С-Мұнай жанармай талондары" : isEn ? "S-Munai Fuel Vouchers" : "Топливные талоны С-Мунай"}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">
                      {isKz
                        ? "Бағаны бүгінгі күнмен бекітіп, инфляция мен маусымдық баға өсімінен толық қорғаныңыз. Номиналдары 10, 20 және 50 литр, барлық 8 станцияда жарамды."
                        : isEn
                        ? "Lock in fuel prices today to protect against inflation and seasonal price spikes. Available in 10, 20, and 50 liter denominations across all 8 stations."
                        : "Зафиксируйте цену на топливо в день покупки. Защита от колебаний тарифов, удобная выдача командировочным сотрудникам и субподрядчикам. Номиналы: 10 л, 20 л и 50 л."}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="rounded-xl border border-amber-400/40 bg-amber-400/15 px-4 py-2 font-display text-lg font-bold text-amber-300">10 Л</span>
                      <span className="rounded-xl border border-amber-400/40 bg-amber-400/15 px-4 py-2 font-display text-lg font-bold text-amber-300">20 Л</span>
                      <span className="rounded-xl border border-amber-400/40 bg-amber-400/15 px-4 py-2 font-display text-lg font-bold text-amber-300">50 Л</span>
                    </div>

                    <div className="mt-8">
                      <a
                        href="#order-form"
                        className="btn-base btn-gold glow-gold font-bold text-slate-950"
                      >
                        <span>{isKz ? "Талондарға өтінім беру" : isEn ? "Order Fuel Vouchers" : "Заказать талоны"}</span>
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 lg:col-span-5 backdrop-blur-sm">
                    <h3 className="font-display text-lg font-bold uppercase text-white">
                      {isKz ? "Талонмен жұмыс істеу оңай" : isEn ? "Voucher Benefits" : "Почему выбирают талоны"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-amber-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Бағаны бекіту:" : isEn ? "Price Lock:" : "Фиксация тарифа:"}
                          </strong>{" "}
                          {isKz ? "нарықта баға өссе де, талон сатып алған күндегі баға сақталады" : isEn ? "price remains guaranteed even when wholesale rates increase" : "цена не изменится даже при повышении цен на рынке"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-amber-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "Таратуға ыңғайлы:" : isEn ? "Simple Dispatch:" : "Простота выдачи:"}
                          </strong>{" "}
                          {isKz ? "іссапарға немесе қосалқы мердігерге талонды тікелей табыстаңыз" : isEn ? "hand directly to drivers embarking on long-haul routes" : "передавайте талоны водителям в рейс или командировку"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-amber-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-white">
                            {isKz ? "8 станцияда қабылданады:" : isEn ? "8 Network Stations:" : "Приём на 8 АЗС:"}
                          </strong>{" "}
                          {isKz ? "3 Жезқазғанда, 3 Сәтбаевта, 2 Астанада" : isEn ? "3 in Zhezkazgan, 3 in Satpayev, 2 in Astana" : "3 в Жезказгане, 3 в Сатпаеве, 2 в Астане"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* B2B Savings Calculator Section */}
      <section className="py-16 sm:py-20 bg-slate-950 border-b border-white/10" id="calculator">
        <B2BCalculator 
          darkTheme={true}
          onApplyCalculation={(summary) => {
            setCalculatorComment(summary);
            const el = document.getElementById("order-form");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }} 
        />
      </section>

      {/* B2B Lead Form Section */}
      <section className="py-16 sm:py-24 bg-slate-900/60 border-b border-white/10 scroll-mt-20" id="order-form">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                <PhoneCall className="size-3.5 text-amber-300" />
                <span>{isKz ? "Тікелей байланыс" : isEn ? "Direct Corporate Support" : "Корпоративный отдел"}</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                {isKz ? "Өтінім қалдырыңыз" : isEn ? "Submit B2B Inquiry" : "Оставьте заявку на обслуживание"}
              </h2>

              <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                {isKz
                  ? "Біздің менеджер 15 минут ішінде хабарласып, коммерциялық ұсыныс дайындайды және келісім-шарт шарттарын ұсынады."
                  : isEn
                  ? "Our corporate account manager will contact you within 15 minutes to prepare a customized commercial proposal."
                  : "Наш специалист свяжется с вами в течение 15 минут, подготовит коммерческое предложение с индивидуальным тарифом и вышлет проект договора."}
              </p>

              <div className="mt-8 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-4 rounded-2xl border border-teal-500/25 bg-teal-950/20 p-4 backdrop-blur-xs">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400 border border-teal-400/30">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {isKz ? "1 жұмыс күні" : isEn ? "1 Business Day" : "1 рабочий день"}
                    </div>
                    <div className="text-xs text-slate-400">
                      {isKz ? "Карталарды ресімдеу немесе жеткізу шартын бекіту мерзімі" : "Срок оформления и выдачи карт или заключения договора поставки"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-amber-500/25 bg-amber-950/20 p-4 backdrop-blur-xs">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-400/30">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {isKz ? "ЭШФ және жабу құжаттары" : isEn ? "Official Electronic Invoices (ESF)" : "ЭСФ и закрывающие документы"}
                    </div>
                    <div className="text-xs text-slate-400">
                      {isKz ? "Әр айдың басында ИС ЭШФ арқылы қатаң кесте бойынша" : "Строго по графику через ИС ЭСФ в начале каждого месяца"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-4 backdrop-blur-xs">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/30">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {isKz ? "Жеке менеджер" : isEn ? "Dedicated Account Manager" : "Персональный менеджер"}
                    </div>
                    <div className="text-xs text-slate-400">
                      {isKz ? "Кезексіз және автожауап берушісіз тікелей байланыс" : "Прямая связь без очередей и автоответчиков"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <B2BLeadForm
                formId="b2b_portal_form"
                darkTheme={true}
                initialComment={calculatorComment}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-surface overflow-hidden pt-14 pb-8 text-white">
        <div className="ambient-overlay" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <Link to="/" className="flex items-center">
              <img src="/images/logo-white.svg" alt="С-МУНАЙ" className="h-9 w-auto object-contain" />
            </Link>
            <nav aria-label="B2B Навигация" className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              <Link to="/" className="transition-colors hover:text-gold-bright">
                {isKz ? "Басты бет" : isEn ? "Home" : "Главная"}
              </Link>
              <a href="#calculator" className="transition-colors hover:text-gold-bright">
                {isKz ? "Калькулятор" : isEn ? "Calculator" : "Калькулятор"}
              </a>
              <a href="#order-form" className="transition-colors hover:text-gold-bright">
                {isKz ? "Өтінім" : isEn ? "Inquiry" : "Заявка"}
              </a>
              <Link to="/career" className="transition-colors hover:text-gold-bright">
                {isKz ? "Мансап" : isEn ? "Career" : "Вакансии"}
              </Link>
            </nav>
          </div>

          <p
            className="display-hero mt-8 select-none text-center uppercase leading-none tracking-[-0.02em] text-white/[0.07]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
            aria-hidden="true"
          >
            С-Мұнай
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
            <p>© 1996–2026 ТОО «С-Мунай». Жезқазған, Сәтбаев, Астана. Барлық құқықтар қорғалған.</p>
            <p className="font-serif italic text-gold-bright/80">
              Жанармай — көлікке, Ұлытау — жүректе
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
