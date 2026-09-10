import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function CookieConsent() {
  const { lang } = useLanguage();
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

  // Аналитика стартует в режиме denied (см. Consent Mode в __root.tsx), поэтому
  // решение посетителя нужно передать в gtag — иначе «Принять» ничего не меняет,
  // а «Отклонить» выглядело бы согласием, которого человек не давал.
  const applyConsent = (granted: boolean) => {
    try {
      localStorage.setItem("cookie_consent", granted ? "true" : "false");
    } catch (e) {
      console.warn("Could not save cookie consent to localStorage", e);
    }
    const gtag = typeof window !== "undefined" ? (window as any).gtag : undefined;
    if (gtag) {
      gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
      if (granted) {
        gtag("event", "cookie_consent_accepted", {
          event_category: "engagement",
          event_label: "Cookie Banner",
        });
      }
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
              {lang === "kz" ? (
                <>
                  Біз сайттың жұмысын жақсарту және ыңғайлылықты арттыру үшін cookie файлдарын пайдаланамыз.{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-gold"
                  >
                    Құпиялылық саясаты
                  </Link>
                </>
              ) : lang === "en" ? (
                <>
                  We use cookies to improve your browsing experience and website performance.{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-gold"
                  >
                    Privacy Policy
                  </Link>
                </>
              ) : (
                <>
                  Мы используем файлы cookie для улучшения работы сайта и повышения удобства.{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-gold"
                  >
                    Политика конфиденциальности
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center justify-end gap-3 md:w-auto">
          <button
            type="button"
            onClick={() => applyConsent(false)}
            className="btn-base w-full md:w-auto !py-2.5 !px-6 !text-xs sm:!text-sm font-semibold border border-primary/20 text-foreground/80 transition-colors hover:bg-primary/5 cursor-pointer"
          >
            {lang === "kz" ? "Бас тарту" : lang === "en" ? "Decline" : "Отклонить"}
          </button>
          <button
            type="button"
            onClick={() => applyConsent(true)}
            className="btn-base btn-gold w-full md:w-auto !py-2.5 !px-6 !text-xs sm:!text-sm font-semibold shadow-md transition-transform cursor-pointer"
          >
            {lang === "kz" ? "Қабылдау" : lang === "en" ? "Accept" : "Принять"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
