import { useEffect, useRef } from "react";
import type { Station } from "@/routes/index";

type LeafletMapProps = {
  stations: Station[];
  activeStationNum: number;
  onStationSelect: (stationNum: number) => void;
  lang?: "kz" | "ru" | "en";
};

export function LeafletMap({ stations, activeStationNum, onStationSelect, lang = "kz" }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<number, any>>({});

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      const defaultCenter: [number, number] = [47.7844, 67.7144]; // Default Zhezkazgan center fallback

      if (!mapInstanceRef.current) {
        const activeSt = stations.find((s) => s.number === activeStationNum) || stations[0];
        const centerLat = activeSt?.coords?.lat ?? defaultCenter[0];
        const centerLng = activeSt?.coords?.lng ?? defaultCenter[1];

        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: 14,
          zoomControl: true,
        });

        // Clean OpenStreetMap tiles with no API key watermarks
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
          maxZoom: 19,
          subdomains: ["a", "b", "c"],
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};

      const isKz = lang === "kz";
      const isEn = lang === "en";

      // Add markers for all stations in this city/list
      stations.forEach((st) => {
        if (!st?.coords || typeof st.coords.lat !== "number" || typeof st.coords.lng !== "number" || isNaN(st.coords.lat) || isNaN(st.coords.lng)) {
          return;
        }

        const isActive = st.number === activeStationNum;
        const hasStore = [1, 3, 4, 6].includes(st.number);
        const isFlagship = st.number === 4;

        const pinTitle = isKz ? `№${st.number} ЖҚС` : isEn ? `Station #${st.number}` : `АЗС №${st.number}`;
        const iconHtml = `
          <div class="custom-leaflet-pin ${isActive ? "active-pin" : ""} ${hasStore ? "has-store" : ""}" title="${pinTitle}">
            <span>${st.number}</span>
          </div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18],
        });

        const addressText = isKz ? st.addressKz : isEn ? st.addressEn : st.address;
        const hoursText = isKz ? st.hoursKz : isEn ? st.hoursEn : st.hours;
        const brandTitle = isKz ? `№${st.number} ЖҚС · С-Мұнай` : isEn ? `Station #${st.number} · S-Munai` : `АЗС №${st.number} · С-Мунай`;
        const cityName = isKz ? st.cityKz : isEn ? st.cityEn : st.city;
        const gisBtnText = isKz ? "2ГИС Бағыты →" : isEn ? "2GIS Route →" : "Маршрут в 2ГИС →";

        const storeBadgeHtml = isFlagship
          ? `<span style="display: inline-block; background: #f59e0b; color: #451a03; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; margin-bottom: 4px;">⭐ ${isKz ? "Флагмандық С-Дүкен" : isEn ? "Flagship S-Duken" : "Флагманский С-Дүкен"}</span>`
          : hasStore
          ? `<span style="display: inline-block; background: rgba(13,108,137,0.12); color: #0D6C89; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; margin-bottom: 4px;">🏪 С-Дүкен 24/7</span>`
          : "";

        const fuelsHtml = st.fuels && st.fuels.length > 0
          ? `<div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #e2e8f0; display: flex; flex-wrap: wrap; gap: 4px;">
              ${st.fuels.map(f => {
                if (f === 'hitech95') return '<span style="background: rgba(212,175,55,0.18); border: 1px solid rgba(212,175,55,0.45); color: #854d0e; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 6px;">95 Hi-Tech</span>';
                if (f === 'hitech92') return '<span style="background: rgba(212,175,55,0.18); border: 1px solid rgba(212,175,55,0.45); color: #854d0e; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 6px;">92 Hi-Tech</span>';
                if (f === 'ai95') return '<span style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 6px;">АИ-95</span>';
                if (f === 'ai92') return '<span style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 6px;">АИ-92</span>';
                if (f === 'dt') return `<span style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 6px;">${isKz ? "ДТ Еуро" : isEn ? "Diesel" : "ДТ Евро"}</span>`;
                if (f === 'gas') return `<span style="background: rgba(13,108,137,0.15); border: 1px solid rgba(13,108,137,0.35); color: #0D6C89; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 6px;">${isKz ? "СҰГ Газ" : isEn ? "LPG" : "Автогаз (СУГ)"}</span>`;
                return '';
              }).join('')}
            </div>`
          : "";

        const popupContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; width: 255px; overflow: hidden; border-radius: 16px;">
            <div style="background: linear-gradient(135deg, #0D6C89, #094a5e); color: #ffffff; padding: 12px 14px;">
              <div style="font-weight: 800; font-size: 14px; letter-spacing: -0.01em;">${brandTitle}</div>
              <div style="font-size: 11px; opacity: 0.85; margin-top: 2px;">${cityName}</div>
            </div>
            <div style="padding: 12px 14px; background: #ffffff;">
              ${storeBadgeHtml}
              <div style="font-size: 12px; color: #1e293b; font-weight: 600; line-height: 1.35;">${addressText}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
                <span>${hoursText}</span>
              </div>
              ${fuelsHtml}
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9;">
                <a href="${st.gisUrl}" target="_blank" rel="noreferrer" style="display: block; text-align: center; background: #D4AF37; color: #1e293b; text-decoration: none; font-size: 11px; font-weight: 700; padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 6px rgba(212,175,55,0.35);">
                  ${gisBtnText}
                </a>
              </div>
            </div>
          </div>
        `;

        const popup = L.popup({
          autoPan: true,
          autoPanPaddingTopLeft: L.point(20, 85),
          autoPanPaddingBottomRight: L.point(20, 80),
          offset: L.point(0, -12),
          closeButton: false,
          className: "custom-smunai-popup",
        });

        const marker = L.marker([st.coords.lat, st.coords.lng], { icon })
          .addTo(map)
          .bindPopup(popupContent, popup);

        marker.on("click", () => {
          onStationSelect(st.number);
        });

        markersRef.current[st.number] = marker;
      });

      // Fly to active station smoothly with headroom offset to prevent top cutoff
      const targetSt = stations.find((s) => s.number === activeStationNum) || stations[0];
      if (
        targetSt?.coords &&
        typeof targetSt.coords.lat === "number" &&
        typeof targetSt.coords.lng === "number" &&
        !isNaN(targetSt.coords.lat) &&
        !isNaN(targetSt.coords.lng)
      ) {
        map.invalidateSize();
        const zoom = 15;
        // Project target coordinates to pixel space
        const targetPoint = map.project([targetSt.coords.lat, targetSt.coords.lng], zoom);
        // Shift camera North by 85px so station sits lower in viewport, guaranteeing ample popup headroom
        const offsetCenterPoint = L.point(targetPoint.x, targetPoint.y - 85);
        const offsetCenterLatLng = map.unproject(offsetCenterPoint, zoom);

        const targetMarker = markersRef.current[targetSt.number];
        if (targetMarker) {
          const currentCenter = map.getCenter();
          const dist = currentCenter.distanceTo(offsetCenterLatLng);

          if (dist < 15) {
            targetMarker.openPopup();
          } else {
            let popupOpened = false;
            const openCleanPopup = () => {
              if (!popupOpened) {
                popupOpened = true;
                targetMarker.openPopup();
              }
            };
            map.once("moveend", openCleanPopup);
            setTimeout(openCleanPopup, 650);

            map.flyTo(offsetCenterLatLng, zoom, {
              duration: 0.65,
              easeLinearity: 0.25,
            });
          }
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stations, activeStationNum, onStationSelect, lang]);

  // Handle container resize & mobile tab switching (hidden -> visible)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    observer.observe(mapContainerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full min-h-[360px] overflow-hidden">
      <div ref={mapContainerRef} className="h-full w-full min-h-[360px] z-0" />
    </div>
  );
}
