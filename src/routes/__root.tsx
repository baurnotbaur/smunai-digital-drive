import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "@/lib/i18n";
import { CookieConsent } from "@/components/site/CookieConsent";
import { SupportChat } from "@/components/site/SupportChat";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Бет табылмады / Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Сіз іздеген бет жоқ немесе жылжытылған. / Запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Басты бетке / На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Қате кетті / Произошла ошибка
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Бетті қайта жүктеп көріңіз немесе басты бетке оралыңыз. / Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Қайталау / Повторить
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Басты бетке / На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "С-Мунай" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве, Улытау и Астане" },
      { property: "og:title", content: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве, Улытау и Астане" },
      { name: "twitter:title", content: "С-Мунай — сеть АЗС в Жезказгане, Сатпаеве, Улытау и Астане" },
      { name: "description", content: "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: качественное топливо, магазин и кофе с собой." },
      { property: "og:description", content: "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: качественное топливо, магазин и кофе с собой." },
      { name: "twitter:description", content: "С-Мунай — семейная сеть из 8 АЗС в Жезказгане, Сатпаеве и Астане: качественное топливо, магазин и кофе с собой." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/198522ec-efeb-434a-b981-7876e0d9b3cd/id-preview-c4cea230--59eeb293-96df-41d7-95a9-607edab5076d.lovable.app-1785768443057.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/198522ec-efeb-434a-b981-7876e0d9b3cd/id-preview-c4cea230--59eeb293-96df-41d7-95a9-607edab5076d.lovable.app-1785768443057.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Oswald:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-30E1D5EVGJ",
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-30E1D5EVGJ');
        `,
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="kk">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <CookieConsent />
          <SupportChat />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
