import { useEffect, useState } from "react";

export function Station3DViewer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  return (
    <div className="rounded-2xl bg-[#327f99] p-3">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-primary-foreground sm:aspect-video lg:aspect-4/3">
        {ready ? (
          <model-viewer
            src="/models/station.glb"
            alt="С-Мунай АЗС в 3D"
            camera-controls
            auto-rotate
            auto-rotate-delay={600}
            rotation-per-second="18deg"
            shadow-intensity="1"
            shadow-softness="0.8"
            environment-image="neutral"
            exposure="1.05"
            interaction-prompt="none"
            camera-orbit="25deg 74deg 32%"
            min-camera-orbit="auto 40deg 18%"
            max-camera-orbit="auto 86deg 55%"
            field-of-view="28deg"
            className="block h-full w-full bg-primary-foreground"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-primary/50">
            Загрузка 3D-модели…
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-1.5 pt-3 pb-1">
        <span className="font-display text-sm tracking-[0.12em] text-primary-foreground uppercase">
          Станция в Жезказгане · 3D
        </span>
        <span className="text-xs text-primary-foreground/70">Потяните, чтобы вращать</span>
      </div>
    </div>
  );
}
