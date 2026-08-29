import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookie consent
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Handle cases where localStorage is disabled or restricted
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie_consent", "true");
      // Send event to Google Analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "cookie_consent_accepted", {
          event_category: "engagement",
          event_label: "Cookie Banner",
        });
      }
    } catch (e) {
      console.warn("Could not save cookie consent to localStorage", e);
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-primary/20 bg-background/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 sm:py-4 sm:px-6 transition-all duration-300"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-3.5 text-sm text-foreground/90 sm:items-center">
          <div className="rounded-full bg-primary/10 p-2 text-gold shrink-0">
            <Cookie className="size-5 sm:size-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm leading-relaxed">
              Біз сайттың жұмысын жақсарту және ыңғайлылықты арттыру үшін cookie файлдарын пайдаланамыз.{" "}
              <Link
                to="/privacy"
                className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-gold"
              >
                Құпиялылық саясаты
              </Link>
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
              Мы используем файлы cookie для улучшения работы сайта и повышения удобства.{" "}
              <Link
                to="/privacy"
                className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-gold"
              >
                Политика конфиденциальности
              </Link>
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center justify-end gap-3 md:w-auto">
          <button
            type="button"
            onClick={handleAccept}
            className="btn-base btn-gold w-full md:w-auto !py-2.5 !px-6 !text-xs sm:!text-sm font-semibold shadow-md transition-transform cursor-pointer"
          >
            Accept / Қабылдау
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
