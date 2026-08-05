import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Gauge, Wallet, FileCheck2 } from "lucide-react";
import { Station3DViewer } from "@/components/site/Station3DViewer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Топливные карты для бизнеса — С-Мунай" },
      {
        name: "description",
        content:
          "Топливные карты С-Мунай для таксопарков, грузоперевозчиков и ИП: лимиты по водителям, единый счёт, закрывающие документы. Станция в 3D.",
      },
    ],
  }),
  component: CardsPage,
});

const NAV = [
  { href: "#station", label: "Станция в 3D" },
  { href: "#cards", label: "Топливные карты" },
];

const FEATURES = [
  {
    icon: Gauge,
    title: "Лимиты по водителям",
    text: "Суточный и месячный лимит, ограничение по виду топлива для каждого водителя.",
  },
  {
    icon: Wallet,
    title: "Единый счёт",
    text: "Все карты автопарка оплачиваются с одного счёта, пополнение онлайн.",
  },
  {
    icon: FileCheck2,
    title: "Закрывающие документы",
    text: "Счёт-фактура, акт и полный отчёт каждый месяц.",
  },
];

function CardsPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <Link to="/" className="font-display text-lg font-bold tracking-wide text-primary">
            С-МУНАЙ
          </Link>
          <nav aria-label="Основная навигация" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a className="transition-colors hover:text-primary" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link className="transition-colors hover:text-primary" to="/">
                  На главную
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav aria-label="Разделы" className="border-t border-primary/10 lg:hidden">
          <ul className="flex gap-5 overflow-x-auto px-5 py-3 text-sm font-medium">
            {NAV.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li className="whitespace-nowrap">
              <Link to="/">На главную</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero + 3D station */}
        <section id="station" className="scroll-mt-28 bg-primary px-5 pt-12 pb-16 text-primary-foreground sm:pt-20 sm:pb-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                Топливные карты · для бизнеса
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
                Заправляем автопарки Жезказгана, Улытау, Сатпаева и Астаны
              </h1>
              <p className="mt-5 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
                Топливные карты для таксопарков, грузоперевозчиков и ИП — лимиты по водителям,
                единый счёт и закрывающие документы каждый месяц.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cards" className="btn-base btn-gold">
                  Оставить заявку
                </a>
                <Link
                  to="/"
                  className="btn-base border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  На главную
                </Link>
              </div>
            </div>
            <Station3DViewer />
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5">
          <div className="road-stripe my-14 sm:my-20" />
        </div>

        {/* Client fuel cards */}
        <section id="cards" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Топливные карты для бизнеса
              </h2>
              <p className="mt-3 max-w-xl text-foreground/75">
                Для таксопарков, грузоперевозчиков и индивидуальных предпринимателей: своя карта
                каждому водителю, оплата с одного счёта, ежемесячный отчёт.
              </p>
              <div className="mt-8 space-y-5">
                {FEATURES.map((feature) => (
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

            <div className="rounded-2xl bg-primary p-7 text-primary-foreground sm:p-9">
              <h3 className="font-display text-xl font-bold tracking-wide uppercase">
                Оставьте заявку
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Перезвоним в рабочее время и подберём условия для вашего автопарка.
              </p>
              <form
                className="mt-7 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="cards-name" className="text-primary-foreground/80">
                    Имя
                  </Label>
                  <Input
                    id="cards-name"
                    name="name"
                    required
                    className="border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cards-phone" className="text-primary-foreground/80">
                    Телефон
                  </Label>
                  <Input
                    id="cards-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+7 ___ ___ __ __"
                    className="border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cards-org" className="text-primary-foreground/80">
                    Организация
                  </Label>
                  <Input
                    id="cards-org"
                    name="org"
                    required
                    placeholder="ТОО / ИП"
                    className="border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                </div>
                <button type="submit" className="btn-base btn-gold w-full">
                  Отправить заявку
                </button>
                <p aria-live="polite" className="min-h-5 text-sm text-gold">
                  {sent ? "Заявка отправлена. Мы свяжемся с вами в рабочее время." : ""}
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 py-8">
        <p className="mx-auto max-w-6xl px-5 text-sm text-foreground/60">
          © С-Мунай, 1996–2026. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
