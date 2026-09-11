import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { 
  Calculator, 
  ShieldCheck, 
  BadgePercent, 
  ChevronRight,
  Sparkles,
  Fuel
} from "lucide-react";

// Реальные цены сети С-Мунай на осень 2026 года (KZT / литр)
const FUEL_PRICES: Record<string, { name: string; price: number; badge?: string }> = {
  ai92: { name: "АИ-92", price: 246.5 },
  ai95: { name: "АИ-95", price: 310.9 },
  dt: { name: "ДТ (Дизель)", price: 336.9 },
  ai92ht: { name: "АИ-92HT NanoTech", price: 253.4, badge: "Premium" },
};

const QUICK_VOLUMES = [1000, 3000, 5000, 10000, 20000, 50000];

export function B2BCalculator({ 
  onApplyCalculation,
  darkTheme = false
}: { 
  onApplyCalculation?: (summary: string) => void;
  darkTheme?: boolean;
}) {
  const { lang } = useLanguage();
  const isKz = lang === "kz";
  const isEn = lang === "en";

  const [litres, setLitres] = useState<number>(5000);
  const [selectedFuel, setSelectedFuel] = useState<string>("dt");

  // Расчет объемов и сумм
  const activeFuel = FUEL_PRICES[selectedFuel] || FUEL_PRICES.ai92;

  const calculations = useMemo(() => {
    const monthlySpend = litres * activeFuel.price;
    // 1. Возврат НДС (16% в зачет из суммы по новому Налоговому кодексу РК)
    const vatSavings = Math.round((monthlySpend * 16) / 116);
    // 2. Предотвращение сливов и левых чеков лимитами по картам (~7% экономии)
    const leakSavings = Math.round(monthlySpend * 0.07);

    const totalMonthlySavings = vatSavings + leakSavings;
    const totalAnnualSavings = totalMonthlySavings * 12;

    return {
      monthlySpend,
      vatSavings,
      leakSavings,
      totalMonthlySavings,
      totalAnnualSavings,
    };
  }, [litres, activeFuel]);

  const handleApply = () => {
    const summaryText = isKz
      ? `B2B Калькулятор есебі: ${litres.toLocaleString()} л/ай (${activeFuel.name}). Болжамды үнем: ${calculations.totalAnnualSavings.toLocaleString()} ₸/жыл.`
      : isEn
      ? `B2B Calculator Estimate: ${litres.toLocaleString()} L/mo (${activeFuel.name}). Projected Savings: ${calculations.totalAnnualSavings.toLocaleString()} ₸/year.`
      : `Расчёт B2B калькулятора: ${litres.toLocaleString()} л/мес (${activeFuel.name}). Расчётная экономия: ${calculations.totalAnnualSavings.toLocaleString()} ₸/год.`;

    if (onApplyCalculation) {
      onApplyCalculation(summaryText);
    }

    const formEl = document.getElementById("order-form") || document.getElementById("cards");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className={`rounded-3xl border p-6 sm:p-10 transition-all ${
        darkTheme 
          ? "border-teal-500/25 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 text-white" 
          : "border-primary/20 bg-linear-to-b from-primary/10 via-primary/5 to-transparent text-foreground shadow-xl"
      }`}>
        
        {/* Заголовок */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
              darkTheme ? "text-gold-bright" : "text-gold-foreground"
            }`}>
              <Sparkles className="size-3.5 text-gold" />
              {isKz ? "Бизнеске арналған тиімділік" : isEn ? "Corporate Savings Calculator" : "Калькулятор корпоративной выгоды"}
            </div>
            <h2 className={`mt-3 text-2xl font-bold tracking-tight font-display sm:text-4xl ${
              darkTheme ? "text-white" : "text-foreground"
            }`}>
              {isKz ? "Жанармай шығындарын қанша үнемдейсіз?" : isEn ? "How Much Can Your Fleet Save?" : "Сколько сбережет ваш бизнес?"}
            </h2>
            <p className={`mt-2 max-w-2xl text-sm sm:text-base ${
              darkTheme ? "text-slate-300" : "text-foreground/75"
            }`}>
              {isKz 
                ? "Калькулятордағы бағалар нақты емес, шартты түрде қарапайым есептеу үшін көрсетілген. Нақты бағалар мен шарттарды менеджерден нақтылаңыз."
                : isEn
                ? "Prices in the calculator are indicative for estimation purposes. Exact terms and tariffs will be provided in your commercial proposal."
                : "Цены на продукты в калькуляторе не являются публичной офертой и служат для простого подсчёта выгоды. Актуальные условия уточняйте у менеджеров."}
            </p>
          </div>
          <div className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold ${
            darkTheme ? "border-white/15 bg-white/5 text-slate-300" : "border-primary/15 bg-primary/5 text-foreground/70"
          }`}>
            <Calculator className={`size-4 ${darkTheme ? "text-teal-400" : "text-primary"}`} />
            <span>{isKz ? "Үлгілік есептеу" : isEn ? "Estimated calculation" : "Ориентировочный расчёт"}</span>
          </div>
        </div>

        {/* Сетка калькулятора */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Левая колонка: Ввод объёма и выбор топлива (7 колонок) */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* 1. Ввод литров в месяц */}
            <div className={`rounded-2xl border p-5 sm:p-6 ${
              darkTheme 
                ? "border-white/10 bg-white/[0.04]" 
                : "border-primary/15 bg-background/60"
            }`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="fuel-volume-input" className={`text-xs font-bold uppercase tracking-wider ${
                  darkTheme ? "text-slate-300" : "text-foreground/70"
                }`}>
                  {isKz ? "Айына қанша литр жанармай тұтынасыз?" : isEn ? "Monthly fuel volume in litres:" : "Сколько литров в месяц вы заправляете?"}
                </label>
                
                {/* Числовое поле с возможностью прямого ввода */}
                <div className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 focus-within:border-primary ${
                  darkTheme 
                    ? "border-teal-500/30 bg-slate-950" 
                    : "border-primary/20 bg-background"
                }`}>
                  <Fuel className={`size-4 ${darkTheme ? "text-teal-400" : "text-primary"}`} />
                  <input
                    id="fuel-volume-input"
                    type="number"
                    min={100}
                    max={200000}
                    step={100}
                    value={litres || ""}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setLitres(val >= 0 ? val : 0);
                    }}
                    className={`w-24 text-right font-display text-lg font-bold outline-none sm:w-28 sm:text-xl ${
                      darkTheme ? "text-teal-300 bg-transparent" : "text-primary bg-transparent"
                    }`}
                  />
                  <span className={`text-xs font-semibold ${darkTheme ? "text-slate-400" : "text-foreground/60"}`}>
                    {isKz ? "литр" : isEn ? "litres" : "литров"}
                  </span>
                </div>
              </div>

              {/* Ползунок слайдера */}
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={Math.min(litres, 50000)}
                onChange={(e) => setLitres(Number(e.target.value))}
                className={`mt-6 h-2.5 w-full cursor-pointer appearance-none rounded-lg ${
                  darkTheme 
                    ? "bg-white/10 accent-teal-400" 
                    : "bg-primary/20 accent-primary"
                }`}
              />
              <div className={`mt-2 flex justify-between text-[11px] ${
                darkTheme ? "text-slate-400" : "text-foreground/50"
              }`}>
                <span>{isEn ? "500 L" : "500 л"}</span>
                <span>{isEn ? "15,000 L" : "15 000 л"}</span>
                <span>{isEn ? "30,000 L" : "30 000 л"}</span>
                <span>{isEn ? "50,000+ L" : "50 000+ л"}</span>
              </div>

              {/* Быстрые кнопки-пресеты объёма */}
              <div className={`mt-5 border-t pt-4 ${darkTheme ? "border-white/10" : "border-primary/10"}`}>
                <span className={`text-[11px] font-semibold ${darkTheme ? "text-slate-400" : "text-foreground/50"}`}>
                  {isKz ? "Жылдам таңдау:" : isEn ? "Quick presets:" : "Быстрый выбор объёма:"}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {QUICK_VOLUMES.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setLitres(v)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                        litres === v
                          ? darkTheme 
                            ? "border-teal-400 bg-teal-500 text-white font-bold shadow-sm" 
                            : "border-primary bg-primary text-primary-foreground shadow-xs"
                          : darkTheme
                          ? "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.08]"
                          : "border-primary/15 bg-background/80 text-foreground/80 hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {v >= 1000 ? `${(v / 1000).toLocaleString()} 000 ${isEn ? "L" : "л"}` : `${v} ${isEn ? "L" : "л"}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Выбор вида топлива */}
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider ${
                darkTheme ? "text-slate-300" : "text-foreground/70"
              }`}>
                {isKz ? "Негізгі жанармай түрі" : isEn ? "Primary Fuel Grade" : "Вид топлива"}
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {Object.entries(FUEL_PRICES).map(([key, item]) => {
                  const isSelected = selectedFuel === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedFuel(key)}
                      className={`relative flex flex-col rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? darkTheme
                            ? "border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-md ring-1 ring-amber-400/30 scale-[1.02]"
                            : "border-gold bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                          : darkTheme
                          ? "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.08]"
                          : "border-primary/15 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute -top-2 right-2 rounded-md bg-gold px-1.5 py-0.5 text-[9px] font-extrabold text-slate-900 uppercase">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-xs font-bold">{item.name}</span>
                      <span className={`mt-1 font-display text-sm font-semibold ${
                        isSelected 
                          ? darkTheme ? "text-amber-300" : "text-gold"
                          : darkTheme ? "text-teal-300" : "text-primary"
                      }`}>
                        {item.price} ₸/{isEn ? "L" : "л"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Блок преимуществ для бизнеса */}
            <div className={`flex items-start gap-3 rounded-2xl border p-4 text-xs ${
              darkTheme 
                ? "border-white/10 bg-white/[0.03] text-slate-300" 
                : "border-primary/20 bg-primary/5 text-foreground/80"
            }`}>
              <ShieldCheck className={`size-4.5 shrink-0 mt-0.5 ${darkTheme ? "text-teal-400" : "text-primary"}`} />
              <p>
                {isKz
                  ? "С-Мунай корпоративтік клиенттеріне: бірыңғай дербес шот, ЭСФ және барлық жабу құжаттары уақытында, әр картаға дербес тәуліктік лимиттер."
                  : isEn
                  ? "For S-Munai B2B partners: single corporate account, full electronic VAT invoices (ESF), same-day accounting reconciliation, and custom per-card daily limits."
                  : "Корпоративным клиентам С-Мунай: единый лицевой счёт, полный пакет ЭСФ и закрывающих документов день в день, суточные лимиты по картам."}
              </p>
            </div>
          </div>

          {/* Правая колонка: Итоговая выгода и кнопка действия (5 колонок) */}
          <div className={`flex flex-col justify-between rounded-3xl border p-6 shadow-2xl lg:col-span-5 sm:p-8 ${
            darkTheme 
              ? "border-teal-500/30 bg-gradient-to-b from-teal-950/40 via-slate-950 to-slate-950 text-white" 
              : "border-primary/20 bg-primary-deeper text-white"
          }`}>
            <div>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {isKz ? "Айлық шығын (базалық бағамен)" : isEn ? "Monthly fuel budget (base rates)" : "Затраты по базовой цене"}
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-white/90 sm:text-3xl">
                  {calculations.monthlySpend.toLocaleString()} ₸
                </span>
                <span className="text-xs text-white/60">
                  {isKz ? "/ айына" : isEn ? "/ month" : "/ месяц"}
                </span>
              </div>

              {/* Детализация экономии */}
              <div className="mt-6 space-y-3.5 border-t border-white/10 pt-6 text-sm">
                
                {/* НДС */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <BadgePercent className="size-4 text-gold" />
                    {isKz ? "ҚҚС 16% есепке алу (зачёт):" : isEn ? "16% VAT refund deduction:" : "Зачёт НДС 16% (возврат):"}
                  </span>
                  <span className="font-semibold text-white">
                    +{calculations.vatSavings.toLocaleString()} ₸
                  </span>
                </div>

                {/* Контроль сливов */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <ShieldCheck className="size-4 text-gold" />
                    {isKz ? "Ұрлық пен лимит бақылауы (~7%):" : isEn ? "Anti-leakage & limits control (7%):" : "Исключение сливов/чеков (7%):"}
                  </span>
                  <span className="font-semibold text-white">
                    +{calculations.leakSavings.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              {/* Главный блок ИТОГО */}
              <div className={`mt-8 rounded-2xl border p-5 text-center ${
                darkTheme 
                  ? "border-gold/40 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent" 
                  : "border-gold/30 bg-white/5"
              }`}>
                <p className="text-xs font-bold text-gold uppercase tracking-wider">
                  {isKz ? "ЖЫЛДЫҚ ЖАЛПЫ ҮНЕМІҢІЗ:" : isEn ? "TOTAL ANNUAL CORPORATE SAVINGS:" : "ВАША ВЫГОДА В ГОД:"}
                </p>
                <div className="mt-1.5 font-display text-3xl font-extrabold text-gold-bright sm:text-4xl">
                  {calculations.totalAnnualSavings.toLocaleString()} ₸
                </div>
                <p className="mt-1 text-[11px] text-white/60">
                  {isKz 
                    ? `(ай сайын ~${calculations.totalMonthlySavings.toLocaleString()} ₸ үнемдеу)` 
                    : isEn
                    ? `(approx. ~${calculations.totalMonthlySavings.toLocaleString()} ₸ net monthly savings)`
                    : `(около ~${calculations.totalMonthlySavings.toLocaleString()} ₸ чистой экономии в месяц)`}
                </p>
              </div>
            </div>

            {/* Кнопка заявки */}
            <button
              type="button"
              onClick={handleApply}
              className="btn-base btn-gold glow-gold mt-8 w-full flex items-center justify-center gap-2 font-bold py-3.5 text-sm sm:text-base cursor-pointer text-slate-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isKz ? "Коммерциялық ұсыныс алу" : isEn ? "Request Commercial Proposal" : "Получить коммерческое предложение"}</span>
              <ChevronRight className="size-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
