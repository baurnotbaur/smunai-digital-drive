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

export function B2BCalculator({ onApplyCalculation }: { onApplyCalculation?: (summary: string) => void }) {
  const { lang } = useLanguage();
  const isKz = lang === "kz";

  const [litres, setLitres] = useState<number>(5000);
  const [selectedFuel, setSelectedFuel] = useState<string>("dt");

  // Расчет объемов и сумм
  const activeFuel = FUEL_PRICES[selectedFuel] || FUEL_PRICES.ai92;

  const calculations = useMemo(() => {
    const monthlySpend = litres * activeFuel.price;
    // 1. Возврат НДС (12% в зачет из суммы)
    const vatSavings = Math.round((monthlySpend * 12) / 112);
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
      : `Расчёт B2B калькулятора: ${litres.toLocaleString()} л/мес (${activeFuel.name}). Расчётная экономия: ${calculations.totalAnnualSavings.toLocaleString()} ₸/год.`;

    if (onApplyCalculation) {
      onApplyCalculation(summaryText);
    }

    const formEl = document.getElementById("cards");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-10">
      <div className="overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-b from-primary/10 via-primary/5 to-transparent p-6 shadow-xl backdrop-blur-md sm:p-10">
        
        {/* Заголовок */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold-foreground uppercase tracking-wider">
              <Sparkles className="size-3.5 text-gold" />
              {isKz ? "Бизнеске арналған тиімділік" : "Калькулятор корпоративной выгоды"}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground font-display sm:text-4xl">
              {isKz ? "Жанармай шығындарын қанша үнемдейсіз?" : "Сколько сбережет ваш бизнес?"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-foreground/75 sm:text-base">
              {isKz 
                ? "Айлық көлемді енгізіңіз: ҚҚС 12% қайтару, ұрлықты тоқтату және инфляциядан бағаны бекіту арқылы нақты үнемді көріңіз."
                : "Укажите ежемесячный объём топлива: рассчитайте чистую экономию за счёт зачёта НДС 12%, лимитов без сливов и фиксации цены."}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-foreground/70">
            <Calculator className="size-4 text-primary" />
            <span>{isKz ? "Нақты нарықтық деректер негізінде" : "На основе фактических цен сети"}</span>
          </div>
        </div>

        {/* Сетка калькулятора */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Левая колонка: Ввод объёма и выбор топлива (7 колонок) */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* 1. Ввод литров в месяц */}
            <div className="rounded-2xl border border-primary/15 bg-background/60 p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="fuel-volume-input" className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                  {isKz ? "Айына қанша литр жанармай тұтынасыз?" : "Сколько литров в месяц вы заправляете?"}
                </label>
                
                {/* Числовое поле с возможностью прямого ввода */}
                <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-background px-3 py-1.5 focus-within:border-primary">
                  <Fuel className="size-4 text-primary" />
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
                    className="w-24 text-right font-display text-lg font-bold text-primary outline-none sm:w-28 sm:text-xl"
                  />
                  <span className="text-xs font-semibold text-foreground/60">
                    {isKz ? "литр" : "литров"}
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
                className="mt-6 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary"
              />
              <div className="mt-2 flex justify-between text-[11px] text-foreground/50">
                <span>500 л</span>
                <span>15 000 л</span>
                <span>30 000 л</span>
                <span>50 000+ л</span>
              </div>

              {/* Быстрые кнопки-пресеты объёма */}
              <div className="mt-5 border-t border-primary/10 pt-4">
                <span className="text-[11px] font-semibold text-foreground/50">
                  {isKz ? "Жылдам таңдау:" : "Быстрый выбор объёма:"}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {QUICK_VOLUMES.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setLitres(v)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                        litres === v
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-primary/15 bg-background/80 text-foreground/80 hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {v >= 1000 ? `${(v / 1000).toLocaleString()} 000 л` : `${v} л`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Выбор вида топлива */}
            <div>
              <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                {isKz ? "Негізгі жанармай түрі" : "Вид топлива"}
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
                          ? "border-gold bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                          : "border-primary/15 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute -top-2 right-2 rounded-md bg-gold px-1.5 py-0.5 text-[9px] font-extrabold text-slate-900 uppercase">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-xs font-bold">{item.name}</span>
                      <span className={`mt-1 font-display text-sm font-semibold ${isSelected ? "text-gold" : "text-primary"}`}>
                        {item.price} ₸/л
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Блок преимуществ для бизнеса */}
            <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/80">
              <ShieldCheck className="size-4.5 shrink-0 text-primary mt-0.5" />
              <p>
                {isKz
                  ? "С-Мунай корпоративтік клиенттеріне: бірыңғай дербес шот, ЭСФ және барлық жабу құжаттары уақытында, әр картаға дербес тәуліктік лимиттер."
                  : "Корпоративным клиентам С-Мунай: единый лицевой счёт, полный пакет ЭСФ и закрывающих документов день в день, суточные лимиты по картам."}
              </p>
            </div>
          </div>

          {/* Правая колонка: Итоговая выгода и кнопка действия (5 колонок) */}
          <div className="flex flex-col justify-between rounded-3xl border border-primary/20 bg-primary-deeper text-white p-6 shadow-2xl lg:col-span-5 sm:p-8">
            <div>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {isKz ? "Айлық шығын (базалық бағамен)" : "Затраты по базовой цене"}
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-white/90 sm:text-3xl">
                  {calculations.monthlySpend.toLocaleString()} ₸
                </span>
                <span className="text-xs text-white/60">
                  {isKz ? "/ айына" : "/ месяц"}
                </span>
              </div>

              {/* Детализация экономии */}
              <div className="mt-6 space-y-3.5 border-t border-white/10 pt-6 text-sm">
                
                {/* НДС */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <BadgePercent className="size-4 text-gold" />
                    {isKz ? "ҚҚС 12% есепке алу (зачёт):" : "Зачёт НДС 12% (возврат):"}
                  </span>
                  <span className="font-semibold text-white">
                    +{calculations.vatSavings.toLocaleString()} ₸
                  </span>
                </div>

                {/* Контроль сливов */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <ShieldCheck className="size-4 text-gold" />
                    {isKz ? "Ұрлық пен лимит бақылауы (~7%):" : "Исключение сливов/чеков (7%):"}
                  </span>
                  <span className="font-semibold text-white">
                    +{calculations.leakSavings.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              {/* Главный блок ИТОГО */}
              <div className="mt-8 rounded-2xl bg-white/5 border border-gold/30 p-5 text-center">
                <p className="text-xs font-bold text-gold uppercase tracking-wider">
                  {isKz ? "ЖЫЛДЫҚ ЖАЛПЫ ҮНЕМІҢІЗ:" : "ВАША ВЫГОДА В ГОД:"}
                </p>
                <div className="mt-1.5 font-display text-3xl font-extrabold text-gold-bright sm:text-4xl">
                  {calculations.totalAnnualSavings.toLocaleString()} ₸
                </div>
                <p className="mt-1 text-[11px] text-white/60">
                  {isKz 
                    ? `(ай сайын ~${calculations.totalMonthlySavings.toLocaleString()} ₸ үнемдеу)` 
                    : `(около ~${calculations.totalMonthlySavings.toLocaleString()} ₸ чистой экономии в месяц)`}
                </p>
              </div>
            </div>

            {/* Кнопка заявки */}
            <button
              type="button"
              onClick={handleApply}
              className="btn-base btn-gold glow-gold mt-8 w-full flex items-center justify-center gap-2 font-bold py-3.5 text-sm sm:text-base cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isKz ? "Коммерциялық ұсыныс алу" : "Получить коммерческое предложение"}</span>
              <ChevronRight className="size-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
