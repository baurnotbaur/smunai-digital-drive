import { useEffect, useRef } from "react";
import type { Station } from "@/routes/index";

type LeafletMapProps = {
  stations: Station[];
  activeStationNum: number;
  onStationSelect: (stationNum: number) => void;
};

export function LeafletMap({ stations, activeStationNum, onStationSelect }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<number, any>>({});

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const activeSt = stations.find((s) => s.number === activeStationNum) || stations[0];
        const map = L.map(mapContainerRef.current, {
          center: [activeSt.coords.lat, activeSt.coords.lng],
          zoom: 14,
          zoomControl: true,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          subdomains: "abcd",
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};

      // Add markers for all stations in this city/list
      stations.forEach((st) => {
        const isActive = st.number === activeStationNum;
        const iconHtml = `<div class="custom-leaflet-pin ${isActive ? "active-pin" : ""}"><span>${st.number}</span></div>`;

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const popupContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 175px;">
            <div style="font-weight: 700; font-size: 13px; color: #0D6C89;">АЗС №${st.number} · С-Мунай</div>
            <div style="font-size: 12px; color: #333; margin-top: 4px; font-weight: 500;">${st.address}</div>
            <div style="font-size: 11px; color: #777; margin-top: 2px;">${st.hours}</div>
            <div style="margin-top: 8px;">
              <a href="${st.gisUrl}" target="_blank" rel="noreferrer" style="display: inline-block; background: #0D6C89; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px;">
                2ГИС Маршрут →
              </a>
            </div>
          </div>
        `;

        const marker = L.marker([st.coords.lat, st.coords.lng], { icon })
          .addTo(map)
          .bindPopup(popupContent);

        marker.on("click", () => {
          onStationSelect(st.number);
        });

        markersRef.current[st.number] = marker;
      });

      // Fly to active station smoothly
      const targetSt = stations.find((s) => s.number === activeStationNum) || stations[0];
      if (targetSt) {
        map.flyTo([targetSt.coords.lat, targetSt.coords.lng], 15, { duration: 0.8 });
        const targetMarker = markersRef.current[targetSt.number];
        if (targetMarker) {
          setTimeout(() => {
            targetMarker.openPopup();
          }, 350);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stations, activeStationNum, onStationSelect]);

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
