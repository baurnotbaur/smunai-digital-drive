import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Gauge, Wallet, FileCheck2, Ticket, Droplets, Zap, ShieldCheck, CreditCard, Sparkles } from "lucide-react";
import { Station3DViewer } from "@/components/site/Station3DViewer";
import { B2BLeadForm } from "@/components/site/B2BLeadForm";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Топливные карты и талоны для бизнеса — С-Мунай" },
      {
        name: "description",
        content:
          "Топливные карты и талоны С-Мунай для таксопарков, грузоперевозчиков и ИП: лимиты по водителям, фиксация цен, единый счёт, закрывающие документы. Станция в 3D.",
      },
    ],
  }),
  component: CardsPage,
});

function CardsPage() {
  const [activeTab, setActiveTab] = useState<"cards" | "vouchers">("cards");
  const { t } = useLanguage();
  const cp = t.cardsPage;
  const v = t.vouchersSection;

  const cardFeatures = [
    {
      icon: Gauge,
      title: cp.f1Title,
      text: cp.f1Desc,
    },
    {
      icon: Wallet,
      title: cp.f2Title,
      text: cp.f2Desc,
    },
    {
      icon: FileCheck2,
      title: cp.f3Title,
      text: cp.f3Desc,
    },
  ];

  const voucherFeatures = [
    {
      icon: Zap,
      title: v.b1Title,
      text: v.b1Desc,
    },
    {
      icon: CreditCard,
      title: v.b2Title,
      text: v.b2Desc,
    },
    {
      icon: ShieldCheck,
      title: v.b3Title,
      text: v.b3Desc,
    },
  ];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:py-3.5">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-90">
            <img
              src="/images/logo-navbar.svg"
              alt="С-МУНАЙ"
              className="h-8 w-auto object-contain sm:h-9"
            />
          </Link>
          <nav aria-label="Основная навигация" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <a className="transition-colors hover:text-primary" href="#station">
                  3D
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#cards">
                  {t.nav.b2b}
                </a>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary font-semibold text-primary" to="/">
                  {t.nav.toHome}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="ml-auto lg:ml-2 flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
        <nav aria-label="Разделы" className="border-t border-primary/10 lg:hidden">
          <ul className="flex gap-5 overflow-x-auto px-5 py-2.5 text-xs font-medium">
            <li className="whitespace-nowrap">
              <a href="#station">3D</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="#cards">{t.nav.b2b}</a>
            </li>
            <li className="whitespace-nowrap">
              <Link to="/" className="font-semibold text-primary">{t.nav.toHome}</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* 3D Viewer hero */}
        <section id="station" className="mx-auto max-w-6xl scroll-mt-28 px-5 pt-10 sm:pt-14">
          <div className="grid items-center gap-8 rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div>
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3.5 py-1 text-xs font-semibold text-gold">
                {cp.heroBadge}
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl font-display">
                {cp.heroTitle}
              </h1>
              <p className="mt-5 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
                {cp.heroDesc}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cards" className="btn-base btn-gold font-bold">
                  {cp.heroOrderBtn}
                </a>
              </div>
            </div>
            <Station3DViewer />
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5">
          <div className="road-stripe my-14 sm:my-20" />
        </div>

        {/* Client fuel cards & vouchers */}
        <section id="cards" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="flex items-center gap-2 border-b border-primary/10 pb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("cards")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    activeTab === "cards"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-primary/5 text-foreground/75 hover:bg-primary/10"
                  }`}
                >
                  <CreditCard className="size-4" />
                  {t.form.productCards}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("vouchers")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    activeTab === "vouchers"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-primary/5 text-foreground/75 hover:bg-primary/10"
                  }`}
                >
                  <Ticket className="size-4" />
                  {t.form.productVouchers}
                </button>
              </div>

              {activeTab === "cards" ? (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-primary font-display sm:text-3xl">
                    {cp.featuresTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-foreground/75">
                    {cp.featuresSubtitle}
                  </p>
                  <div className="mt-8 space-y-5">
                    {cardFeatures.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-4 border-t border-primary/10 pt-5 first:border-t-0 first:pt-0"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <feature.icon className="size-4.5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">{feature.title}</h3>
                          <p className="mt-1 text-sm text-foreground/70">{feature.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-primary font-display sm:text-3xl">
                    {v.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-foreground/75">
                    {v.subtitle}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {[v.denom10, v.denom20, v.denom50].map((denom) => (
                      <span
                        key={denom}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold text-primary"
                      >
                        <Droplets className="size-3.5 text-gold" />
                        {denom}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 space-y-5">
                    {voucherFeatures.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-4 border-t border-primary/10 pt-5 first:border-t-0 first:pt-0"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-foreground">
                          <feature.icon className="size-4.5 text-gold" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">{feature.title}</h3>
                          <p className="mt-1 text-sm text-foreground/70">{feature.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <B2BLeadForm
                formId="cards-b2b"
                darkTheme
                defaultProduct={activeTab === "cards" ? "cards" : "vouchers"}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img
              src="/images/logo-navbar.svg"
              alt="С-МУНАЙ"
              className="h-7 w-auto object-contain opacity-80"
            />
          </Link>
          <p className="text-sm text-foreground/60">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
