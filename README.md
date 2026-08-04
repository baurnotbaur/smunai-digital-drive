# С-Мунай: Your Journey Companion

# Lovable Prompt — Сайт С-Мунай (сеть АЗС)

Copy everything below this line into Lovable as the first prompt.

-----

Build a single-page corporate website for **С-Мунай** — a family-run fuel station network in Kazakhstan: 8 stations across Zhezkazgan, Satpayev and Astana, operating since 1996 (30th anniversary in 2026). Site language: **Russian** (a Kazakh version will be added later — no language toggle yet). All Russian copy is provided below — use it exactly as written. Do NOT invent addresses, prices, phone numbers or legal details: keep the [square-bracket] placeholders and “___ ₸” price placeholders as-is.

## Design direction

Brand palette (mandatory):

- Primary: deep teal #0D6C89 (headings, navbar, key panels)

- Accent: gold #D6A44A (anniversary elements, primary CTA buttons, price digits)

- Secondary accent: terracotta #9D4C29 (small details, icons, tags — use sparingly)

- Background: warm near-white #FCFBF8, text: dark slate #1E2A30

Typography (must support Cyrillic): **Unbounded** for headings (bold, used with restraint), **Golos Text** for body. Google Fonts.

Signature element: in the hero, a vertical **roadside fuel price totem** — a dark-teal rounded panel styled like the real stela at a station, with gold monospace-style digits:

АИ-92 — ___ ₸ · АИ-95 — ___ ₸ · ДТ — ___ ₸, small caption «Актуальные цены уточняйте на АЗС». On mobile it stacks below the headline.

Other rules: light, clean, trustworthy corporate feel; cards with soft shadows and 12–16px radius; a thin “road stripe” divider motif between sections (subtle horizontal line with a short gold dash); smooth scroll-reveal, reduced-motion respected; no stock photos — use neutral image placeholders (real station photos will be added later); fully responsive, mobile-first.

## Structure & content (Russian copy — use verbatim)

### Navbar

Logo text «С-МУНАЙ» + links: АЗС · Топливо · Акции · Бизнесу · О нас · Вакансии · Контакты. Instagram icon on the right (link placeholder INSTAGRAM_URL).

### 1. Hero

- Заголовок: «Заправляем Жезказган, Сатпаев и Астану уже 30 лет»

- Подзаголовок: «8 собственных АЗС · качественное топливо · магазин и кофе с собой»

- Кнопки: «Найти АЗС» (anchor to stations) и «Акции» (anchor), gold primary button

- Price totem (signature element) beside the headline

- Stat strip below: «30 лет на рынке» · «8 АЗС» · «3 города»

### 2. Наши АЗС (id: azs)

Intro line: «Выберите ближайшую станцию — мы работаем для вас каждый день.»

8 station cards grouped under three city headers: **Жезказган**, **Сатпаев**, **Астана** (exact distribution will be provided — for now create 8 cards total, split roughly between the cities). Each card: «АЗС №N», «[Адрес]», «[Часы работы]», service icons with labels: Топливо · Магазин · Кофе. Below the grid — a map embed placeholder block with caption «Карта станций».

### 3. Топливо и сервис (id: fuel)

Three fuel cards: «АИ-92», «АИ-95», «ДТ» — each with one line «Топливо с контролем качества на каждой поставке». Then two service cards:

- «Магазин на АЗС» — «Всё нужное в дорогу: снеки, напитки, автотовары.»

- «Кофе с собой» — «Свежий кофе на каждой станции — заправьтесь и вы.»

### 4. Акции и бонусы (id: promo)

Anniversary banner (gold background, teal text): «Нам 30 лет! Празднуем юбилей вместе с Днём работников нефтегазовой промышленности — следите за акциями и розыгрышами в нашем Instagram.» Button: «Мы в Instagram» (INSTAGRAM_URL).

Promo cards (3 placeholders):

- «Бонусные топливные карты» — «Участвуйте в акциях и выигрывайте карты с бесплатным топливом.»

- «Акция месяца» — «[Описание акции]»

- «Промокоды в Instagram» — «Следите за сторис — ловите промокоды на кофе и покупки в магазине.»

### 5. Бизнесу (id: b2b)

Заголовок: «Топливные карты для бизнеса»

Текст: «Заправляйте автопарк по безналичному расчёту: контроль расходов по каждой машине, закрывающие документы, персональные условия для компаний Жезказгана, Сатпаева и Астаны.»

Bullets: «Безналичный расчёт и договор» · «Отчёты по каждой карте» · «Закрывающие документы» · «Персональный менеджер»

Button: «Оставить заявку» → opens a simple form (Имя, Компания, Телефон, Комментарий) — form is UI-only for now, no backend.

### 6. О нас (id: about)

«С 1996 года мы развиваем собственную сеть АЗС в Улытауской области и Астане. Начинали с одной станции — сегодня нас восемь. Мы местная команда: знаем свои города, своих клиентов и отвечаем за качество топлива репутацией, заработанной за 30 лет.»

Small gold badge: «1996–2026 · 30 лет»

### 7. Вакансии (id: jobs)

«Присоединяйтесь к команде С-Мунай — нам нужны внимательные и доброжелательные люди: кассиры, операторы, бариста. Напишите нам, и мы расскажем о свободных позициях.» Button: «Написать нам» (mailto placeholder EMAIL).

### 8. Контакты + Footer (id: contacts)

- «Телефон: 87770000000» · «Instagram: https://www.instagram.com/azs_smunai?igsh=MWRnOHhrcGM1MHk4dg==» · «Почта: EMAIL»

- Compact list of all 8 stations (city — АЗС №N — мира 39)

- Footer line: «© С-Мунай, 1996–2026. Все права защищены.»

## Rules

- Keep every placeholder (мира 39, [8777000000, ___ ₸, https://www.instagram.com/azs_smunai?igsh=MWRnOHhrcGM1MHk4dg==, EMAIL) untouched — they will be replaced manually.

- No invented facts, no fake reviews, no partner logos, no lorem ipsum.

- Accessibility: visible focus states, sufficient contrast on gold buttons (dark text), semantic headings.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://smunai-digital-drive.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59eeb293-96df-41d7-95a9-607edab5076d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
