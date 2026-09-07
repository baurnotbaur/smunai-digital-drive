import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  BadgePercent, 
  Truck, 
  Car, 
  Bus, 
  ChevronRight,
  Sparkles,
  Sliders
} from "lucide-react";

// Реальные цены сети С-Мунай на осень 2026 года (KZT / литр)
const FUEL_PRICES: Record<string, { name: string; price: number; badge?: string }> = {
  ai92: { name: "АИ-92", price: 246.5 },
  ai95: { name: "АИ-95", price: 310.9 },
  dt: { name: "ДТ (Дизель)", price: 336.9 },
  ai92ht: { name: "АИ-92HT NanoTech", price: 253.4, badge: "Premium" },
};

type VehiclePreset = {
  id: "cars" | "vans" | "trucks" | "custom";
  labelKz: string;
  labelRu: string;
  litresPerCar: number;
  icon: typeof Car;
};

const VEHICLE_PRESETS: VehiclePreset[] = [
  { id: "cars", labelKz: "Жеңіл көліктер", labelRu: "Легковые авто", litresPerCar: 250, icon: Car },
  { id: "vans", labelKz: "Шағын жүк / Газель", labelRu: "Газели / Фургоны", litresPerCar: 600, icon: Bus },
  { id: "trucks", labelKz: "Ауыр жүк / Фуралар", labelRu: "Грузовые / Фуры", litresPerCar: 2000, icon: Truck },
  { id: "custom", labelKz: "Өз көлеміңіз", labelRu: "Свой объём", litresPerCar: 0, icon: Sliders },
];

export function B2BCalculator({ onApplyCalculation }: { onApplyCalculation?: (summary: string) => void }) {
  const { lang } = useLanguage();
  const isKz = lang === "kz";

  const [vehiclePreset, setVehiclePreset] = useState<VehiclePreset["id"]>("vans");
  const [vehicleCount, setVehicleCount] = useState<number>(5);
  const [customLitres, setCustomLitres] = useState<number>(3000);
  const [selectedFuel, setSelectedFuel] = useState<string>("dt");

  // Расчет объемов и сумм
  const activeFuel = FUEL_PRICES[selectedFuel] || FUEL_PRICES.ai92;

  const totalMonthlyLitres = useMemo(() => {
    if (vehiclePreset === "custom") {
      return customLitres;
    }
    const preset = VEHICLE_PRESETS.find((p) => p.id === vehiclePreset);
    return (preset?.litresPerCar || 500) * vehicleCount;
  }, [vehiclePreset, vehicleCount, customLitres]);

  const calculations = useMemo(() => {
    const monthlySpend = totalMonthlyLitres * activeFuel.price;
    // 1. Возврат НДС (12% в зачет из суммы)
    const vatSavings = Math.round((monthlySpend * 12) / 112);
    // 2. Предотвращение сливов и левых чеков лимитами по картам (~7% экономии)
    const leakSavings = Math.round(monthlySpend * 0.07);
    // 3. Защита от инфляции цен (+24 ₸/л в год по статистике аналитики)
    const inflationSavingsAnnual = Math.round(totalMonthlyLitres * 24);
    const inflationSavingsMonthly = Math.round(inflationSavingsAnnual / 12);

    const totalMonthlySavings = vatSavings + leakSavings + inflationSavingsMonthly;
    const totalAnnualSavings = totalMonthlySavings * 12;

    return {
      monthlySpend,
      vatSavings,
      leakSavings,
      inflationSavingsMonthly,
      inflationSavingsAnnual,
      totalMonthlySavings,
      totalAnnualSavings,
    };
  }, [totalMonthlyLitres, activeFuel]);

  const handleApply = () => {
    const summaryText = isKz
      ? `B2B Калькулятор есебі: ${vehicleCount} көлік, ${totalMonthlyLitres.toLocaleString()} л/ай (${activeFuel.name}). Болжамды үнем: ${calculations.totalAnnualSavings.toLocaleString()} ₸/жыл.`
      : `Расчёт B2B калькулятора: ${vehicleCount} авто, ${totalMonthlyLitres.toLocaleString()} л/мес (${activeFuel.name}). Расчётная экономия: ${calculations.totalAnnualSavings.toLocaleString()} ₸/год.`;

    if (onApplyCalculation) {
      onApplyCalculation(summaryText);
    }

    const formEl = document.getElementById("cards");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12">
      <div className="overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-b from-primary/10 via-primary/5 to-transparent p-6 shadow-xl backdrop-blur-md sm:p-10">
        
        {/* Заголовок */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold-foreground uppercase tracking-wider">
              <Sparkles className="size-3.5 text-gold" />
              {isKz ? "Бизнеске арналған тиімділік" : "Калькулятор корпоративной выгоды"}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground font-display sm:text-4xl">
              {isKz ? "Жанармай шығындарын қанша үнемдейсіз?" : "Сколько сбережет ваш автопарк?"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-foreground/75 sm:text-base">
              {isKz 
                ? "С-Мунай отын карталары мен талондары: ҚҚС қайтару, ұрлық пен артық шығынды тоқтату және инфляциядан бағаны бекіту."
                : "Расчёт чистой экономии с топливными картами С-Мунай: зачёт НДС 12%, лимиты без сливов и фиксация цены от роста."}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-foreground/70">
            <Calculator className="size-4 text-primary" />
            <span>{isKz ? "Нақты нарықтық деректер негізінде" : "На основе фактических данных сети"}</span>
          </div>
        </div>

        {/* Сетка калькулятора */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Левая колонка: Интерактивные настройки (7 колонок) */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* 1. Пресет автопарка */}
            <div>
              <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                {isKz ? "1. Көлік түрі" : "1. Тип автопарка"}
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {VEHICLE_PRESETS.map((p) => {
                  const Icon = p.icon;
                  const isSelected = vehiclePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setVehiclePreset(p.id)}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-3.5 text-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                          : "border-primary/15 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <Icon className={`size-5 ${isSelected ? "text-gold" : "text-primary"}`} />
                      <span className="text-xs font-bold leading-tight">
                        {isKz ? p.labelKz : p.labelRu}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Количество авто или объем */}
            {vehiclePreset === "custom" ? (
              <div className="rounded-2xl border border-primary/15 bg-background/50 p-5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                    {isKz ? "Айлық көлем (литр):" : "Общий объём топлива в месяц:"}
                  </label>
                  <span className="font-display text-xl font-bold text-primary">
                    {customLitres.toLocaleString()} л
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={30000}
                  step={500}
                  value={customLitres}
                  onChange={(e) => setCustomLitres(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary"
                />
                <div className="mt-2 flex justify-between text-[11px] text-foreground/50">
                  <span>500 л</span>
                  <span>15 000 л</span>
                  <span>30 000+ л</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-primary/15 bg-background/50 p-5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                    {isKz ? "Көліктер саны:" : "Количество автомобилей:"}
                  </label>
                  <span className="font-display text-2xl font-bold text-primary">
                    {vehicleCount} {isKz ? "көлік" : vehicleCount === 1 ? "авто" : "машин"}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={vehicleCount}
                  onChange={(e) => setVehicleCount(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary"
                />
                <div className="mt-2 flex justify-between text-[11px] text-foreground/50">
                  <span>1 авто</span>
                  <span>25 машин</span>
                  <span>50+ машин</span>
                </div>
              </div>
            )}

            {/* 3. Выбор вида топлива */}
            <div>
              <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                {isKz ? "2. Негізгі жанармай түрі" : "2. Основной вид топлива"}
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {Object.entries(FUEL_PRICES).map(([key, item]) => {
                  const isSelected = selectedFuel === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedFuel(key)}
                      className={`relative flex flex-col rounded-2xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-gold bg-primary text-primary-foreground shadow-md shadow-primary/20"
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

            {/* Блок пояснения инфляции на основе статистики сети */}
            <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs text-foreground/80">
              <TrendingUp className="size-4.5 shrink-0 text-gold mt-0.5" />
              <p>
                {isKz
                  ? "С-Мунай желісінің 2 жылдық талдауы: отын бағасы орташа есеппен жылына 24 ₸/л өседі (+10% / жыл). Келісімшартпен бекітілген баға бюджетіңізді қорғайды."
                  : "Аналитика сети С-Мунай: цена топлива за последние 2 года растет в среднем на +2,0 ₸/л в месяц (+24 ₸/л в год). Безналичный договор защищает вас от скачков цен."}
              </p>
            </div>
          </div>

          {/* Правая колонка: Итоговая выгода и кнопка действия (5 колонок) */}
          <div className="flex flex-col justify-between rounded-3xl border border-primary/20 bg-primary-deeper text-white p-6 shadow-2xl lg:col-span-5 sm:p-8">
            <div>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {isKz ? "Жалпы есептік көлем" : "Расчётный объём потребления"}
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  {totalMonthlyLitres.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-white/70">
                  {isKz ? "литр / айына" : "литров в месяц"}
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

                {/* Защита от инфляции */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <TrendingUp className="size-4 text-gold" />
                    {isKz ? "Инфляциядан қорғау (бағаны бекіту):" : "Экономия на фиксации цены:"}
                  </span>
                  <span className="font-semibold text-white">
                    +{calculations.inflationSavingsMonthly.toLocaleString()} ₸
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
