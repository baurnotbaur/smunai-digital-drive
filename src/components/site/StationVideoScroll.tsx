import { useEffect, useRef, useState, type ReactNode } from "react";

import { BASE_TIER, pickTier } from "@/lib/videoQuality";

// Доля прокрутки сцены, на которой начинает и заканчивает проявляться текст
const TEXT_REVEAL_START = 0.55;
const TEXT_REVEAL_END = 0.85;

// Десктоп: модель приближается по мере прокрутки (1 → 1 + DESKTOP_ZOOM).
// Телефон: без приближения, просто постоянно крупная.
const DESKTOP_ZOOM = 0.3;
const MOBILE_SCALE = 1.45;
const DESKTOP_MQ = "(min-width: 768px)";

export function StationVideoScroll({ children }: { children?: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // ── Загрузка ролика: сначала лёгкий файл, затем апгрейд по скорости сети
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let objectUrl: string | undefined;

    const revoke = () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = undefined;
    };

    /** Меняет источник, сохраняя текущий кадр — прокрутка не сбивается. */
    const swapSource = (url: string) => {
      const keepTime = video.currentTime;
      const restore = () => {
        // длительность у всех версий одинаковая, поэтому кадр совпадёт
        if (Number.isFinite(video.duration)) video.currentTime = keepTime;
      };
      video.addEventListener("loadedmetadata", restore, { once: true });
      video.src = url;
    };

    const upgrade = async (measuredMbps?: number) => {
      const tier = pickTier(measuredMbps);
      if (!tier || cancelled || tier.file === BASE_TIER.file) return;
      try {
        // качаем целиком: перемотка по скроллу должна попадать в буфер,
        // иначе кадры подгружаются рывками
        const res = await fetch(tier.file);
        if (!res.ok || cancelled) return;
        const blob = await res.blob();
        if (cancelled) return;
        const previous = objectUrl;
        objectUrl = URL.createObjectURL(blob);
        swapSource(objectUrl);
        if (previous) URL.revokeObjectURL(previous);
      } catch {
        // не вышло — остаёмся на лёгкой версии, она уже играет
      }
    };

    // 1. лёгкий файл: сцена появляется мгновенно на любой связи
    video.src = BASE_TIER.file;

    // 2. измеряем реальную скорость по тому, как быстро он приехал.
    //    Берём данные из Resource Timing, а не из событий <video>: событие
    //    canplaythrough не повторяется, если файл уже в кэше или элемент
    //    успел загрузиться до подписки.
    const measureAndUpgrade = () => {
      const entry = performance
        .getEntriesByType("resource")
        .find((e) => e.name.endsWith(BASE_TIER.file)) as PerformanceResourceTiming | undefined;

      let measuredMbps: number | undefined;
      // transferSize 0 — файл пришёл из кэша, скорость по нему не измерить
      if (entry && entry.transferSize > 0) {
        // нижняя граница в 1 мс защищает от деления на ноль: мгновенный ответ
        // сам по себе означает очень быстрый канал
        const seconds = Math.max((entry.responseEnd - entry.responseStart) / 1000, 0.001);
        measuredMbps = (entry.transferSize * 8) / seconds / 1e6;
      }
      void upgrade(measuredMbps);
    };

    // buffered: true — если запись уже появилась, обработчик вызовется сразу
    const observer = new PerformanceObserver((list) => {
      if (!list.getEntries().some((e) => e.name.endsWith(BASE_TIER.file))) return;
      observer.disconnect();
      measureAndUpgrade();
    });
    observer.observe({ type: "resource", buffered: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      revoke();
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastProgress = -1;

    const mq = window.matchMedia(DESKTOP_MQ);

    // при смене брейкпоинта пересчитываем масштаб даже без прокрутки
    const onMqChange = () => {
      lastProgress = -1;
    };
    mq.addEventListener("change", onMqChange);

    const update = () => {
      const wrapper = wrapperRef.current;
      const video = videoRef.current;
      if (!wrapper || !video || Number.isNaN(video.duration)) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      // Сцена «прилипает» на дистанции: высота обёртки минус высота экрана.
      // progress 0 — блок только показался, 1 — прокручен до конца.
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      let progress = scrollable > 0 ? -rect.top / scrollable : 1;
      progress = Math.max(0, Math.min(1, progress));

      if (Math.abs(progress - lastProgress) > 0.0005) {
        lastProgress = progress;
        video.currentTime = progress * video.duration;

        video.style.transform = mq.matches
          ? `scale(${1 + DESKTOP_ZOOM * progress})`
          : `scale(${MOBILE_SCALE})`;

        // Текст проявляется в конце оборота
        if (overlayRef.current) {
          const k = Math.max(
            0,
            Math.min(1, (progress - TEXT_REVEAL_START) / (TEXT_REVEAL_END - TEXT_REVEAL_START)),
          );
          overlayRef.current.style.opacity = String(k);
          overlayRef.current.style.transform = `translateY(${(1 - k) * 28}px)`;
          overlayRef.current.style.pointerEvents = k > 0.5 ? "auto" : "none";
        }
        // Подсказка «листайте» гаснет сразу после начала прокрутки
        if (hintRef.current) {
          hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 8));
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animationFrameId);
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  return (
    // фон подогнан под фактический цвет подложки в station.webm после цветокоррекции
    <div ref={wrapperRef} className="relative h-[300vh] bg-[#27809b]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-primary-foreground/60">
            Загрузка видео...
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-primary-foreground/60">
            Видео не найдено. Добавьте station.webm в public/videos
          </div>
        )}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadedMetadata={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />

        {children && (
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-5">
              <div ref={overlayRef} style={{ opacity: 0, pointerEvents: "none" }}>
                {children}
              </div>
            </div>
          </div>
        )}

        <div
          ref={hintRef}
          className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-1 text-primary-foreground/80"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase">Листайте вниз</span>
          <span aria-hidden="true" className="animate-bounce text-lg leading-none">↓</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline justify-between gap-3 px-5 pb-4 sm:px-8">
          <span className="font-display text-sm tracking-[0.12em] text-primary-foreground uppercase">
            Станция в Жезказгане · 3D
          </span>
          <span className="text-xs text-primary-foreground/70">Вращается при скролле</span>
        </div>
      </div>
    </div>
  );
}
