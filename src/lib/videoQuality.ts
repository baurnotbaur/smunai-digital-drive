/**
 * Выбор качества ролика по возможностям устройства и скорости сети.
 *
 * Логика как у ленты соцсетей: страница всегда стартует с лёгкого файла,
 * чтобы сцена появилась мгновенно даже на слабом мобильном интернете, а затем
 * догружает версию получше — но только если соединение это тянет.
 */

export type QualityTier = {
  /** файл в /public/videos */
  file: string;
  /** ширина кадра — по ней подбирается уровень под экран */
  width: number;
};

export const TIERS: QualityTier[] = [
  { file: "/videos/station-480.webm", width: 854 },
  { file: "/videos/station-720.webm", width: 1280 },
  { file: "/videos/station-1080.webm", width: 1920 },
];

/** С него начинаем всегда: 0,7 МБ грузятся быстро на любой связи. */
export const BASE_TIER = TIERS[0] as QualityTier;

type NetworkInfo = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
};

function getNetworkInfo(): NetworkInfo | undefined {
  // Network Information API есть в Chrome и Android, в Safari и Firefox — нет
  return (navigator as Navigator & { connection?: NetworkInfo }).connection;
}

/**
 * Максимальный уровень, который вообще имеет смысл на этом экране.
 * Учитываем плотность пикселей: на retina-телефоне 480p выглядит мылом.
 */
export function maxTierForScreen(): number {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const needed = window.innerWidth * dpr;
  if (needed <= 900) return 0;
  if (needed <= 1400) return 1;
  return 2;
}

/**
 * Верхняя граница по сети. Возвращает -1, если апгрейд запрещён совсем
 * (экономия трафика или заведомо медленное соединение).
 *
 * @param measuredMbps скорость, измеренная на загрузке базового файла;
 *                     undefined, если измерить не удалось (например, файл
 *                     пришёл из кэша)
 */
export function maxTierForNetwork(measuredMbps?: number): number {
  const net = getNetworkInfo();

  // Явная просьба экономить трафик — уважаем без оговорок.
  if (net?.saveData) return -1;

  // Замер важнее заявленного типа сети: effectiveType — грубая оценка,
  // которую браузер часто занижает (а в автоматизации она вообще не
  // соответствует действительности). Реально измеренная скорость не врёт.
  if (measuredMbps !== undefined) {
    if (measuredMbps < 1.5) return -1;
    if (measuredMbps < 4) return 0;
    if (measuredMbps < 12) return 1;
    return 2;
  }

  // Замера нет (файл пришёл из кэша) — опираемся на подсказки браузера.
  if (net?.effectiveType === "2g" || net?.effectiveType === "slow-2g") return -1;
  if (net?.effectiveType === "3g") return 0;
  if (typeof net?.downlink === "number") {
    if (net.downlink < 2) return 0;
    if (net.downlink < 6) return 1;
  }

  // Ничего не известно (Safari, Firefox) — берём средний уровень:
  // заметно лучше базового, но без риска утянуть 6 МБ на слабом канале.
  return net ? 2 : 1;
}

/** Итоговый уровень: минимум из того, что нужно экрану и что тянет сеть. */
export function pickTier(measuredMbps?: number): QualityTier | null {
  const index = Math.min(maxTierForScreen(), maxTierForNetwork(measuredMbps));
  return index < 0 ? null : (TIERS[index] ?? BASE_TIER);
}
