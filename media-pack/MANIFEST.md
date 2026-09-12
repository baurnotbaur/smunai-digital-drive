# С-МУНАЙ · Медиа-пак для сайта (smunai-digital-drive)

Набор фото и видео, готовый к подключению в сайт. Код репозитория **не изменялся** — пак лежит отдельно.
Все брендовые сцены сгенерированы в стиле существующих 3D-рендеров (бирюза `#0D6C89` + золото `#D6A44A`, степь, вывески «С-МУНАЙ» / «С-ДҮКЕН»); атмосферные кадры (кофе, выпечка, дорога) — стоки Pexels (лицензия Pexels: коммерческое использование без указания авторства).

## Структура

```
media-pack/
├── images/
│   ├── generated/   мастера 2048×2048 (AI-генерация, брендовые сцены)
│   ├── stock/       стоковые фото Pexels, 1920px
│   └── web/         ГОТОВЫЕ ДЛЯ САЙТА: jpg+webp 1920×1080 (бренд) и webp 1280×720 (стоки)
├── videos/
│   ├── loops/       фоновые амбиент-лупы 12 c, 1080p, mp4+webm (бесшовные, ping-pong zoom)
│   ├── scroll/      drop-in замена station-480/720/1080.webm (4.00 c, vp9, те же размеры/fps)
│   ├── promo/       промо-ролик 26 c, 1080p, mp4+webm (8 сцен + эндкард с логотипом и слоганом)
│   ├── broll/       нарезки для Reels/монтажа (горизонт. 1080p + верт. 1080×1920)
│   └── social/      og-обложка 1200×630, пост 1080×1080, сторис 1080×1920
├── MANIFEST.md
└── CREDITS.md
```

## Куда подключать (карта вставки в smunai-digital-drive)

| Файл пака | Куда в репозитории | Что даёт |
|---|---|---|
| `images/web/hero-twilight.jpg/.webp` | `public/images/station-hero.jpg/.webp` (hero `index.tsx`, hero `career.tsx`, poster `HiTechVideoBanner.tsx`) | Новый hero: сумерки, брендовая стела и canopy |
| `images/web/pumps-night.jpg/.webp` | `public/images/station-pumps.jpg` (секция «Топливо», `index.tsx:364`) | Ночные ТРК крупным планом |
| `images/web/heritage-1996.jpg/.webp` | секция «О нас» (`index.tsx:631`) / карточка «1996» в `AnniversaryTimeline.tsx` | Архивный кадр первой станции, 30 лет |
| `images/web/career-operator.jpg/.webp` | hero страницы `career.tsx:135` | Кассир подаёт кофе — для вакансий |
| `images/web/sduken-banner.jpg/.webp` | баннер в `SDukenSection.tsx` | Флагманский маркет АЗС №4 (реальный фасад) |
| `images/web/espresso-macro.webp`, `coffee-paper-cup.webp`, `croissants-tray.webp`, `croissants-rack.webp`, `motor-oil.webp` | карточки услуг «Кофе с собой» / «Магазин» / «Автотовары и масла» в `SDukenSection.tsx` | Стоковые карточки 1280×800 |
| `images/web/tanker-steppe.jpg/.webp` | hero/баннер `b2b.tsx` | Бензовозы в степи — блок «Бизнесу» |
| `images/web/stela-night.jpg/.webp` | шапка/заглушка карты `stations.tsx` | Стела ночью, панели БЕЗ цен (политика соблюдена) |
| `images/web/road-fields.webp`, `road-golden-hour.webp` | фоны секций, `AnniversaryTimeline`, блог/Instagram | Степная дорога |
| `videos/scroll/station-{480,720,1080}.webm` | `public/videos/station-{480,720,1080}.webm` (замена 1-в-1: 4.00 c, vp9, 854×480@15 / 1280×720@30 / 1920×1080@30) | Scroll-видео легче оригинала в ~10 раз |
| `videos/loops/loop-{hero,pumps,sduken}-1080.mp4/.webm` | источники `HiTechVideoBanner.tsx` (сейчас там `station-1080.webm`) или фон hero | Бесшовные фоновые лупы 12 c |
| `videos/promo/smunai-promo-1080.mp4/.webm` | главная (автоплей-баннер), YouTube/Instagram | Промо 26 c: заезд → аэро-ночь → ТРК → эспрессо → С-ДҮКЕН → персонал → бензовозы → эндкард |
| `videos/broll/*` | исходники для Reels/монтажа в Premiere | Нарезки 3–8 c, вкл. вертикальную 1080×1920 |
| `videos/social/og-1200x630.jpg` | `og:image` / `twitter:image` в `__root.tsx:92-93` | Нормальная обложка для шеринга |
| `videos/social/post-square-1080.jpg`, `story-1080x1920.jpg` | Instagram-посты/сторис | Готовые форматы |

## Технические параметры

- **Scroll-видео**: vp9 (Profile 0), yuv420p, длительность 4.00 c у всех трёх файлов — механика `videoQuality.ts` (swap по скорости сети) сохранится. Битрейты: 263 / 587 / 974 kb/s против 1546 / 6614 / 12540 kb/s у текущих.
- **Лупы**: 12 c, 25 fps, 1920×1080, бесшовные (zoom 1.0→1.10→1.0), mp4 (h264) + webm (vp9). Можно ставить в `<video loop muted autoplay playsinline>`.
- **Промо**: 26.0 c, 25 fps, h264 crf19 / vp9 crf33, без звука (музыку добавить в Premiere по `higgsfield-prompts.md`, раздел «Советы по монтажу»). Эндкард: реальный логотип `smunai-logo-trim.png` + слоган «Жанармай — көлікке, Ұлытау — жүректе» + «1996–2026 · 30 ЖЫЛ БІРГЕ» (Oswald, кириллица-расширенная проверена).
- **Фото web**: progressive JPEG q88 + WebP q80; брендовые 1920×1080 (16:9), стоковые карточки 1280×720.
- **Цены на стеле/в кадрах отсутствуют** — соблюдено правило «не публиковать розничные цены».

## Быстрый старт (замена 1-в-1 без правок кода)

```sh
cp media-pack/images/web/hero-twilight.jpg   smunai-digital-drive/public/images/station-hero.jpg
cp media-pack/images/web/hero-twilight.webp  smunai-digital-drive/public/images/station-hero.webp
cp media-pack/images/web/pumps-night.jpg     smunai-digital-drive/public/images/station-pumps.jpg
cp media-pack/videos/scroll/station-*.webm   smunai-digital-drive/public/videos/
```

Остальное — по таблице выше (потребуется добавить `<img>`/`<source>` в соответствующих компонентах).

## Сверка с базой знаний (smunai-infra-vault, verified 2026-08-24)

- **Справка (из vault, verified 2026-08-24):** работающих узлов в ERP — девять (NID 1, 3–10), включая с. Улытау и Астану (АЗС-8, АЗС-9). Копирайты сайта по решению владельца **не изменяются**; в медиа-паке число АЗС нигде не указано, конфликтов с текущими текстами нет.
- Топливная линейка факта: АИ-92, АИ-95, ДТ, **АИ-92HT/АИ-95HT (HiTech), автогаз (АЗС-1, 4, 6), ДТ-З** — модель топлива сайта (`hitech95/hitech92/gas`) согласуется.
- Vault — IT-документация (GasNet/GasKit/Talon/Ultron); бренд-ассетов (фото, логотипы) в нём нет. Чувствительные данные vault в пак и на сайт не переносились.

## Ограничения и честные пометки

- AI-генерация: вывески «С-МУНАЙ»/«С-ДҮКЕН» читаемы, но логотип-«крыло» на стеле и мелочи интерьера — авторские вариации, не векторный брендбук. Для печатных материалов используйте оригинальные SVG из `public/images/`.
- Стоковые видео/фото содержат нейтральные небрендованные сцены; клип с чужим брендом и ценами (JET) из пакета исключён намеренно.
- Репозиторий `Abek1ng/smunai-infra-vault` приватный (404 без авторизации) — не просматривался и не изменялся.
