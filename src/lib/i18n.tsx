import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "kz" | "ru" | "en";

export type Translations = {
  nav: {
    azs: string;
    fuel: string;
    vouchers: string;
    services: string;
    promo: string;
    b2b: string;
    about: string;
    jobs: string;
    contacts: string;
    cards3d: string;
    toHome: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    findStation: string;
    promosBtn: string;
    featureCardTitle: string;
    featureSubtitle: string;
    feature1: string;
    feature2: string;
    feature3: string;
    slogan: string;
    yearsMetric: string;
    yearsLabel: string;
    stationsMetric: string;
    stationsLabel: string;
    citiesMetric: string;
    citiesLabel: string;
  };
  stations: {
    title: string;
    subtitle: string;
    cityZhez: string;
    citySat: string;
    cityAst: string;
    allCities: string;
    hours247: string;
    showOnMap: string;
    route2gis: string;
    branches2gis: string;
    mapTitle: string;
    fuelOnly: string;
    fuelShopCoffee: string;
    serviceFuel: string;
    serviceShop: string;
    serviceCoffee: string;
    selectedStation: string;
  };
  fuelSection: {
    title: string;
    subtitle: string;
    hitechBadge: string;
    ai92HitechTitle: string;
    ai92HitechDesc: string;
    ai92HitechBadge: string;
    ai95HitechTitle: string;
    ai95HitechDesc: string;
    ai95HitechBadge: string;
    ai92Title: string;
    ai92Desc: string;
    ai92Badge: string;
    ai95Title: string;
    ai95Desc: string;
    ai95Badge: string;
    dtTitle: string;
    dtDesc: string;
    dtBadge: string;
    shopTitle: string;
    shopDesc: string;
    coffeeTitle: string;
    coffeeDesc: string;
  };
  vouchersSection: {
    badge: string;
    title: string;
    subtitle: string;
    denominationsTitle: string;
    denom10: string;
    denom20: string;
    denom50: string;
    b1Title: string;
    b1Desc: string;
    b2Title: string;
    b2Desc: string;
    b3Title: string;
    b3Desc: string;
    b4Title: string;
    b4Desc: string;
    orderVouchersBtn: string;
  };
  servicesSection: {
    badge: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
    s5Title: string;
    s5Desc: string;
    s6Title: string;
    s6Desc: string;
  };
  promo: {
    title: string;
    subtitle: string;
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    instagramNote: string;
    openInstagram: string;
  };
  b2b: {
    badge: string;
    title: string;
    desc: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    see3d: string;
    linkCards3d: string;
  };
  form: {
    title: string;
    subtitle: string;
    productLabel: string;
    productCards: string;
    productVouchers: string;
    productBoth: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    commentLabel: string;
    commentPlaceholder: string;
    dataConsentText: string;
    privacyLink: string;
    marketingConsentText: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    submitAgain: string;
    privacyNote: string;
    requiredError: string;
  };
  privacyModal: {
    title: string;
    subtitle: string;
    sec1Title: string;
    sec1Text: string;
    sec2Title: string;
    sec2Text: string;
    sec2List: string[];
    sec3Title: string;
    sec3List: string[];
    sec4Title: string;
    sec4Text: string;
    sec5Title: string;
    sec5Text: string;
    closeBtn: string;
  };
  about: {
    title: string;
    text: string;
    badge: string;
  };
  jobs: {
    title: string;
    text: string;
    writeInsta: string;
    applyBtn: string;
  };
  contacts: {
    title: string;
    instaCardTitle: string;
    instaHandle: string;
    instaDesc: string;
    instaBtn: string;
    geoTitle: string;
    geoSubtitle: string;
  };
  footer: {
    rights: string;
  };
  cardsPage: {
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    heroOrderBtn: string;
    featuresTitle: string;
    featuresSubtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    tabCards: string;
    tabVouchers: string;
  };
};

export const DICTIONARY: Record<Lang, Translations> = {
  kz: {
    nav: {
      azs: "ЖҚС",
      fuel: "Жанармай",
      vouchers: "Талондар",
      services: "Сервис",
      promo: "Акциялар",
      b2b: "Бизнеске",
      about: "Біз туралы",
      jobs: "Бос орындар",
      contacts: "Байланыс",
      cards3d: "Карталар мен 3D",
      toHome: "Басты бетке",
    },
    hero: {
      badge: "Сапалы жанармай",
      title: "Жезқазған, Сәтбаев және Астананы сапалы жанармаймен қамтамасыз етіп келеміз",
      subtitle: "8 жеке ЖҚС · сапалы жанармай · Hi-Tech бензині · талондар мен карталар",
      findStation: "ЖҚС табу",
      promosBtn: "Акциялар",
      featureCardTitle: "С-МҰНАЙ ЖЕЛІСІ",
      featureSubtitle: "Сенімді жанармай бекеттері",
      feature1: "Әрбір партияның сапасын қатаң зертханалық бақылау",
      feature2: "Дүкен мен жаңа демделген кофе (негізгі станцияларда)",
      feature3: "Барлық станцияларда 24/7 үздіксіз қызмет көрсету",
      slogan: "Жанармай — көлікке, Ұлытау — жүректе",
      yearsMetric: "24/7",
      yearsLabel: "нарықтағы тәжірибе",
      stationsMetric: "8",
      stationsLabel: "жеке ЖҚС станциясы",
      citiesMetric: "3",
      citiesLabel: "қатысу қалалары",
    },
    stations: {
      title: "Біздің ЖҚС станциялары",
      subtitle: "Өзіңізге ең жақын станцияны таңдаңыз — біз сіздер үшін тәулік бойы жұмыс істейміз.",
      cityZhez: "Жезқазған",
      citySat: "Сәтбаев",
      cityAst: "Астана",
      allCities: "Барлық станциялар (8)",
      hours247: "Тәулік бойы (24/7)",
      showOnMap: "Картада көрсету →",
      route2gis: "2ГИС бағыты",
      branches2gis: "2ГИС филиалдары",
      mapTitle: "Интерактивті карта және 2ГИС бағыттары",
      fuelOnly: "Жанармай",
      fuelShopCoffee: "Жанармай, Дүкен, Кофе",
      serviceFuel: "Жанармай",
      serviceShop: "Дүкен",
      serviceCoffee: "Кофе",
      selectedStation: "Таңдалған станция:",
    },
    fuelSection: {
      title: "Жанармай түрлері және Hi-Tech желісі",
      subtitle: "Сенімді зауыттық отын, сапа паспорты және қозғалтқышты қорғайтын арнайы инновациялық Hi-Tech қоспалар.",
      hitechBadge: "Инновациялық формула",
      ai92HitechTitle: "АИ-92 Hi-Tech",
      ai92HitechDesc: "Қозғалтқышты тазалайтын, клапандарды нагардан қорғайтын және отын шығынын үнемдейтін белсенді қоспалар кешені.",
      ai92HitechBadge: "Hi-Tech Формула",
      ai95HitechTitle: "АИ-95 Hi-Tech",
      ai95HitechDesc: "Қозғалтқышты тазалайтын, клапандарды нагардан қорғайтын және отын шығынын үнемдейтін белсенді қоспалар кешені.",
      ai95HitechBadge: "Hi-Tech Premium",
      ai92Title: "АИ-92",
      ai92Desc: "Қозғалтқыштың күнделікті бірқалыпты және сенімді жұмысына арналған тазаланған классикалық отын.",
      ai92Badge: "ГОСТ / К-4",
      ai95Title: "АИ-95",
      ai95Desc: "Жоғары октанды, қозғалтқыш қуатын сақтайтын және детонацияға қарсы сапалы жанармай.",
      ai95Badge: "Евро-5 / К-5",
      dtTitle: "ДТ (Дизель)",
      dtDesc: "Жүк және жеңіл дизельді көліктерге арналған сенімді, жоғары цетанды таза дизель отыны.",
      dtBadge: "Евро ДТ",
      shopTitle: "ЖҚС жанындағы дүкен",
      shopDesc: "Жолға қажеттінің бәрі: сусындар, тіскебасарлар, сапалы автохимия және майлар.",
      coffeeTitle: "Жолға арналған ыстық кофе",
      coffeeDesc: "Негізгі станцияларда жаңа тартылған хош иісті кофе — көлігіңізбен бірге өзіңіз де қуаттаныңыз.",
    },
    vouchersSection: {
      badge: "Ыңғайлы есеп айырысу",
      title: "С-Мұнай жанармай талондары",
      subtitle: "Бағаны алдын ала бекітіп, автопаркті немесе жеке көліктерді жанармаймен қамтамасыз етудің ең сенімді тәсілі.",
      denominationsTitle: "Қолжетімді талон номиналдары:",
      denom10: "10 литр",
      denom20: "20 литр",
      denom50: "50 литр",
      b1Title: "Бағаның тұрақтылығы",
      b1Desc: "Талон сатып алған сәттегі баға бекітіледі. Жанармай құнының кез келген өзгеруінен толық қорғалғансыз.",
      b2Title: "Беруге және сақтауға қолайлы",
      b2Desc: "Іссапарларға, қосалқы мердігерлерге, жүргізушілерге беру немесе сыйлық ретінде қолдануға өте ыңғайлы.",
      b3Title: "Толық ресми құжаттар",
      b3Desc: "Бухгалтерияға қажетті барлық есептік құжаттар (ЭШФ, жүкқұжаттар, төлем чектері) сатып алу кезінде бірден беріледі.",
      b4Title: "8 станцияның барлығында жарамды",
      b4Desc: "Жезқазған, Сәтбаев және Астана қалаларындағы барлық «С-Мұнай» ЖҚС-де кедергісіз қабылданады.",
      orderVouchersBtn: "Талондарға тапсырыс беру",
    },
    servicesSection: {
      badge: "Жоғары стандарт",
      title: "ЖҚС-дағы қызмет пен қолайлылық",
      subtitle: "Біз әрбір жүргізуші мен жолаушының өзін жайлы сезінуі үшін барлық жағдайды жасадық.",
      s1Title: "Дәл өлшемді жанармай құю",
      s1Desc: "Заманауи электронды калибрленген бағаналар арқылы грамына дейін дәл әрі жылдам құю.",
      s2Title: "24/7 Экспресс-маркет",
      s2Desc: "Жолда қажетті салқын сусындар, энергетиктер, балғын тіскебасарлар мен тәттілердің кең таңдауы.",
      s3Title: "100% Арабика дәнді кофе",
      s3Desc: "Арнайы швейцариялық кофемашиналарда жаңа тартылған дәннен демделетін американо, капучино, латте.",
      s4Title: "Сертификатталған автомайлар",
      s4Desc: "Әлемдік брендтердің сапалы мотор майлары, салқындатқыш сұйықтықтар (антифриз) және маусымдық шыны жуғыштар.",
      s5Title: "Тәулік бойы операторлар қызметі",
      s5Desc: "Әрбір станцияда тәжірибелі әрі мейірімді операторлар көлігіңізге жанармай құюға кез келген уақытта көмектеседі.",
      s6Title: "Төлемнің барлық түрлері",
      s6Desc: "Kaspi QR, Halyk QR, банк карталары, қолма-қол ақша, жанармай карталары мен талондар арқылы лезде төлем.",
    },
    promo: {
      title: "Біздің акциялар",
      subtitle: "С-Мұнай желісінің тұтынушыларына арналған арнайы ұтыстар мен сыйлықтар.",
      card1Badge: "Мерейтойлық ұтыс",
      card1Title: "Бағалы сыйлықтар ұтысы",
      card1Desc: "ЖҚС-да жанармай құйып, мерейтойлық чектермен бағалы сыйлықтар мен тегін жанармай ұтысына қатысыңыз.",
      card2Badge: "Бонустық бағдарлама",
      card2Title: "Әрбір сапарда тиімді үнем",
      card2Desc: "Тұрақты клиенттер мен автопарктер үшін арнайы бағалар және кепілдендірілген жеңілдіктер.",
      instagramNote: "Барлық жаңа акциялар мен ұтыс шарттары ресми Instagram парақшамызда жарияланады:",
      openInstagram: "Instagram парақшасына өту",
    },
    b2b: {
      badge: "Корпоративтік клиенттерге",
      title: "Бизнеске арналған жанармай карталары мен талондар",
      desc: "Автопаркіңізді қолма-қол ақшасыз тиімді басқарыңыз: жанармай карталары мен талондар, әр көлікке жеке шектеулер, салықтық құжаттар және Жезқазған, Сәтбаев, Астана кәсіпорындарына арналған жеңілдіктер.",
      f1: "Әр жүргізуші мен көлікке жеке тәуліктік/айлық шектеулер",
      f2: "Электронды құжат айналымы және ҚҚС есепке жатқызу",
      f3: "Әрбір жанармай құю бойынша толық айлық есептер",
      f4: "Жеке менеджер және жедел техникалық қолдау",
      see3d: "Толық шарттар және 3D-станция моделі:",
      linkCards3d: "Жанармай карталары және 3D-модель беті →",
    },
    form: {
      title: "Бизнеске арналған өтінім",
      subtitle: "Байланыс деректеріңізді қалдырыңыз — автопаркіңізге арналған тиімді баға мен шарттарды ұсынамыз.",
      productLabel: "Сізді қандай қызмет қызықтырады?",
      productCards: "Жанармай карталары",
      productVouchers: "Жанармай талондары",
      productBoth: "Карталар + Талондар",
      nameLabel: "Байланысатын тұлға",
      namePlaceholder: "Бауыржан / Автопарк жетекшісі",
      phoneLabel: "Телефон нөмірі",
      phonePlaceholder: "+7 (___) ___-__-__",
      orgLabel: "Компания атауы / ЖК",
      orgPlaceholder: "ЖШС / ЖК / Таксопарк",
      commentLabel: "Қосымша ақпарат (көлік саны / литр көлемі)",
      commentPlaceholder: "Көлік саны немесе қажетті отын көлемі",
      dataConsentText: "Мен «С-Мұнай» ЖШС-не дербес деректерімді жинауға, өңдеуге және сақтауға келісім беремін",
      privacyLink: "Құпиялылық саясатына",
      marketingConsentText: "Арнайы коммерциялық ұсыныстар мен жаңа акциялар туралы хабарлама алуға келісемін",
      submitBtn: "Өтінім жіберу",
      submittingBtn: "Өтінім жіберілуде…",
      successTitle: "Өтінішіңіз сәтті қабылданды!",
      successDesc: "Рақмет! Біздің корпоративтік менеджер жұмыс уақытында 15 минут ішінде сізбен байланысады.",
      submitAgain: "Тағы бір өтінім жіберу",
      privacyNote: "Деректеріңіз қорғалған және үшінші тұлғаларға берілмейді.",
      requiredError: "Дербес деректерді өңдеуге келісім беру қажет",
    },
    privacyModal: {
      title: "«С-Мұнай» ЖШС Құпиялылық саясаты",
      subtitle: "Қазақстан Республикасының «Дербес деректер және оларды қорғау туралы» Заңына сәйкес",
      sec1Title: "1. Жалпы ережелер",
      sec1Text: "Осы Саясат «С-Мұнай» ЖШС ресми сайтының пайдаланушыларының дербес деректерін жинау, өңдеу, сақтау және қорғау тәртібін белгілейді. Біз ҚР заңнамасына сәйкес азаматтардың құқықтары мен бостандықтарының сақталуына кепілдік береміз.",
      sec2Title: "2. Жинақталатын дербес деректер",
      sec2Text: "Кері байланыс және жанармай карталарына өтінім жіберу кезінде жиналатын деректер:",
      sec2List: [
        "Байланысатын тұлғаның аты-жөні;",
        "Байланыс телефон нөмірі;",
        "Ұйым атауы немесе ЖК мәртебесі;",
        "Техникалық деректер (IP-мекенжай, cookie файлдары, өту көзі).",
      ],
      sec3Title: "3. Деректерді өңдеу мақсаттары",
      sec3List: [
        "Клиентпен байланысу және автопаркке жанармай құю шарттарын таңдау;",
        "Коммерциялық ұсыныстар дайындау және шарттар жасасу;",
        "Акциялар мен жеңілдіктер туралы ақпараттандыру (келісім болған жағдайда);",
        "Қызмет көрсету сапасын арттыру.",
      ],
      sec4Title: "4. Деректерді қорғау және жария етпеу",
      sec4Text: "«С-Мұнай» ЖШС дербес деректерді заңсыз қол жеткізуден, жоюдан, өзгертуден немесе таратудан қорғау үшін барлық қажетті құқықтық, ұйымдастырушылық және техникалық шараларды қолданады.",
      sec5Title: "5. Дербес деректер субъектісінің құқықтары",
      sec5Text: "Пайдаланушы өз дербес деректерінің өңделуі туралы ақпарат алуға, оларды түзетуді немесе жоюды талап етуге, сондай-ақ ресми байланыс арналары арқылы келісімін кез келген уақытта қайтарып алуға құқылы.",
      closeBtn: "Түсінікті",
    },
    about: {
      title: "Біз туралы",
      text: "Біз Ұлытау облысы мен Астана қаласында жеке ЖҚС желісін дамытып келеміз. Бір станциядан бастап, бүгінде сегізге жеттік. Біз жергілікті ұжымбыз: өз қалаларымыз бен тұтынушыларымызды жақсы білеміз және адал абыройымызбен жанармай сапасына кепілдік береміз.",
      badge: "Сапалы жанармай",
    },
    jobs: {
      title: "Бос жұмыс орындары",
      text: "С-Мұнай ұжымына қосылыңыз — бізге ұқыпты әрі мейірімді жандар қажет: кассирлер, операторлар, баристалар. Instagram Direct-ке жазыңыз, біз бос орындар туралы айтып береміз.",
      writeInsta: "Instagram-ға жазу",
      applyBtn: "Өтініш беру",
    },
    contacts: {
      title: "Байланыс",
      instaCardTitle: "Ресми Instagram",
      instaHandle: "@azs_smunai",
      instaDesc: "Желінің барлық жаңалықтары, мерекелік акциялар, ұтыстар және Direct арқылы жедел байланыс.",
      instaBtn: "@azs_smunai парақшасына өту",
      geoTitle: "Желі станцияларының географиясы",
      geoSubtitle: "3 өңірдегі 8 жанармай құю станциясы",
    },
    footer: {
      rights: "© С-Мұнай. Барлық құқықтар қорғалған.",
    },
    cardsPage: {
      heroBadge: "Бизнес-клиенттерге",
      heroTitle: "Жезқазған, Сәтбаев және Астана автопарктеріне қызмет көрсетеміз",
      heroDesc: "Таксопарктер, жүк тасымалдаушылар және кәсіпкерлерге арналған жанармай карталары мен талондары — жүргізушілерге шектеу, бірыңғай баланс және ай сайынғы есептер.",
      heroOrderBtn: "Өтінім қалдыру",
      featuresTitle: "Бизнеске арналған жанармай карталары мен талондар",
      featuresSubtitle: "Таксопарктер, жүк көліктері мен ЖК үшін: әр жүргізушіге жеке карта, бірыңғай шоттан төлем және ай сайынғы толық есеп.",
      f1Title: "Жүргізушілерге шектеулер қою",
      f1Desc: "Әрбір автокөлікке тәуліктік және айлық көлемдер мен жанармай түрлері бойынша шектеулер орнатыңыз.",
      f2Title: "Бүкіл автопаркке бір ортақ баланс",
      f2Desc: "Жүргізушілерге қолма-қол ақша бермей-ақ, компанияның ортақ балансын банк аударымымен толтырыңыз.",
      f3Title: "Есептік құжаттар дер кезінде",
      f3Desc: "Бухгалтерияға арналған ай сайынғы жанармай құю тізілімі, ЭШФ және салыстыру актілері мерзімінде беріледі.",
      tabCards: "Топливные карты",
      tabVouchers: "Талоны на топливо",
    },
  },
  ru: {
    nav: {
      azs: "АЗС",
      fuel: "Топливо",
      vouchers: "Талоны",
      services: "Сервис",
      promo: "Акции",
      b2b: "Бизнесу",
      about: "О нас",
      jobs: "Вакансии",
      contacts: "Контакты",
      cards3d: "Карты и 3D",
      toHome: "На главную",
    },
    hero: {
      badge: "Качественное топливо",
      title: "Заправляем Жезказган, Сатпаев и Астану качественным топливом",
      subtitle: "8 собственных АЗС · качественное топливо · линейка Hi-Tech · талоны и карты",
      findStation: "Найти АЗС",
      promosBtn: "Акции",
      featureCardTitle: "СЕТЬ С-МУНАЙ",
      featureSubtitle: "Надёжные автозаправки",
      feature1: "Лабораторный контроль качества каждой поставки",
      feature2: "Магазин и свежий кофе с собой (на основных АЗС)",
      feature3: "Круглосуточное обслуживание на всех станциях",
      slogan: "Жанармай — көлікке, Ұлытау — жүректе",
      yearsMetric: "24/7",
      yearsLabel: "режим работы",
      stationsMetric: "8",
      stationsLabel: "собственных АЗС",
      citiesMetric: "3",
      citiesLabel: "города присутствия",
    },
    stations: {
      title: "Наши АЗС",
      subtitle: "Выберите ближайшую станцию — мы работаем для вас каждый день и круглосуточно.",
      cityZhez: "Жезказган",
      citySat: "Сатпаев",
      cityAst: "Астана",
      allCities: "Все станции (8)",
      hours247: "Круглосуточно (24/7)",
      showOnMap: "Показать на карте →",
      route2gis: "Маршрут в 2ГИС",
      branches2gis: "2ГИС филиалы",
      mapTitle: "Интерактивная карта и маршруты в 2ГИС",
      fuelOnly: "Топливо",
      fuelShopCoffee: "Топливо, Магазин, Кофе",
      serviceFuel: "Топливо",
      serviceShop: "Магазин",
      serviceCoffee: "Кофе",
      selectedStation: "Выбрана станция:",
    },
    fuelSection: {
      title: "Виды топлива и линейка Hi-Tech",
      subtitle: "Заводское сертифицированное топливо, контроль плотности и температуры, а также инновационные виды топлива Hi-Tech с активной защитой двигателя.",
      hitechBadge: "Инновационная формула",
      ai92HitechTitle: "АИ-92 Hi-Tech",
      ai92HitechDesc: "Инновационный бензин с активным моющим комплексом: удаляет нагар с форсунок и клапанов, повышает приёмистость и снижает расход.",
      ai92HitechBadge: "Hi-Tech Формула",
      ai95HitechTitle: "АИ-95 Hi-Tech",
      ai95HitechDesc: "Инновационный бензин с активным моющим комплексом: удаляет нагар с форсунок и клапанов, повышает приёмистость и снижает расход.",
      ai95HitechBadge: "Hi-Tech Premium",
      ai92Title: "АИ-92",
      ai92Desc: "Качественный классический бензин ГОСТ для стабильной ежедневной работы двигателя в любых погодных условиях.",
      ai92Badge: "ГОСТ / К-4",
      ai95Title: "АИ-95",
      ai95Desc: "Высокооктановый бензин для плавной динамики разгона и надёжной защиты двигателя от детонации.",
      ai95Badge: "Евро-5 / К-5",
      dtTitle: "ДТ (Дизель)",
      dtDesc: "Очищенное дизельное топливо с высоким цетановым числом для легкового и грузового транспорта.",
      dtBadge: "Евро ДТ",
      shopTitle: "Магазин на АЗС",
      shopDesc: "Всё нужное в дорогу: напитки, снеки, полезные автотовары и автомасла.",
      coffeeTitle: "Кофе с собой",
      coffeeDesc: "Свежесваренный зерновой кофе на наших флагманских станциях — заправьтесь и вы.",
    },
    vouchersSection: {
      badge: "Простой и надёжный расчёт",
      title: "Топливные талоны С-Мунай",
      subtitle: "Фиксируйте цену на топливо, оптимизируйте затраты автопарка и выдавайте талоны водителям или субподрядчикам.",
      denominationsTitle: "Доступные номиналы талонов:",
      denom10: "10 литров",
      denom20: "20 литров",
      denom50: "50 литров",
      b1Title: "Фиксация цены",
      b1Desc: "Цена топлива фиксируется в момент оплаты. Вы на 100% застрахованы от любых колебаний розничных цен.",
      b2Title: "Удобство передачи",
      b2Desc: "Идеально для командировок, привлечённого транспорта, субподрядчиков и разовых поощрений водителей.",
      b3Title: "Полный пакет документов",
      b3Desc: "Все бухгалтерские документы (ЭСФ, накладные, чеки) выдаются в день оформления заказа.",
      b4Title: "Действуют на всех 8 АЗС",
      b4Desc: "Талоны принимаются без ограничений на всех станциях сети в Жезказгане, Сатпаеве и Астане.",
      orderVouchersBtn: "Заказать талоны",
    },
    servicesSection: {
      badge: "Высокий стандарт",
      title: "Сервис и комфорт на наших АЗС",
      subtitle: "Мы продумали каждую деталь, чтобы визит на С-Мунай был быстрым, комфортным и приятным для вас и вашего авто.",
      s1Title: "Высокоточный налив топлива",
      s1Desc: "Современные ТРК с регулярной электронной поверкой и защитой от недолива до миллилитра.",
      s2Title: "Экспресс-маркет 24/7",
      s2Desc: "Широкий выбор прохладительных напитков, энергетиков, горячей выпечки, снеков и товаров первой необходимости.",
      s3Title: "Зерновой кофе из 100% Арабики",
      s3Desc: "Свежемолотый бодрящий кофе на швейцарских суперавтоматах — эспрессо, американо, капучино и нежный латте.",
      s4Title: "Сертифицированные автомасла",
      s4Desc: "Оригинальные моторные и трансмиссионные масла, антифризы, тормозная жидкость и сезонные омыватели стекла.",
      s5Title: "Заботливый сервис операторов",
      s5Desc: "Внимательные операторы на колонках всегда помогут быстро и аккуратно заправить ваш автомобиль в любую погоду.",
      s6Title: "Все современные виды оплаты",
      s6Desc: "Kaspi QR, Halyk QR, бесконтактные банковские карты, наличные, корпоративные топливные карты и талоны.",
    },
    promo: {
      title: "Наши акции",
      subtitle: "Специальные предложения, розыгрыши призов и подарки для наших любимых клиентов.",
      card1Badge: "Розыгрыш",
      card1Title: "Розыгрыш ценных призов",
      card1Desc: "Заправляйтесь на АЗС С-Мунай и участвуйте в праздничных розыгрышах топлива и ценных подарков.",
      card2Badge: "Выгода для бизнеса",
      card2Title: "Специальные условия для автопарков",
      card2Desc: "Индивидуальные скидки и отсрочка платежа при оформлении топливных карт и талонов.",
      instagramNote: "Все актуальные акции и условия розыгрышей публикуются в нашем Instagram:",
      openInstagram: "Перейти в Instagram",
    },
    b2b: {
      badge: "Корпоративным клиентам",
      title: "Топливные карты и талоны для бизнеса",
      desc: "Заправляйте автопарк по безналичному расчёту: топливные карты и талоны, контроль расходов по каждой машине, закрывающие документы в срок и персональные скидки для предприятий Жезказгана, Сатпаева и Астаны.",
      f1: "Индивидуальные суточные и месячные лимиты по машинам",
      f2: "Электронный документооборот и полный НДС к зачёту",
      f3: "Детализированные ежемесячные отчёты по каждой заправке",
      f4: "Персональный менеджер и оперативная техподдержка",
      see3d: "Подробные условия и 3D-станция:",
      linkCards3d: "Страница топливных карт и 3D-модели →",
    },
    form: {
      title: "Заявка для бизнеса",
      subtitle: "Оставьте контакты — подберём индивидуальные условия и скидки на топливо для вашего автопарка.",
      productLabel: "Что вас интересует?",
      productCards: "Топливные карты",
      productVouchers: "Талоны на топливо",
      productBoth: "Карты + Талоны",
      nameLabel: "Контактное лицо",
      namePlaceholder: "Бауыржан / Руководитель автопарка",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+7 (___) ___-__-__",
      orgLabel: "Компания / ИП",
      orgPlaceholder: "ТОО / ИП / Таксопарк",
      commentLabel: "Дополнительно (число машин / объём топлива)",
      commentPlaceholder: "Количество автомобилей или планируемый объём в месяц",
      dataConsentText: "Я даю согласие ТОО «С-Мунай» на сбор и обработку моих данных в соответствии с",
      privacyLink: "Политикой конфиденциальности",
      marketingConsentText: "Согласен получать индивидуальные коммерческие предложения и новости об акциях сети",
      submitBtn: "Отправить заявку",
      submittingBtn: "Отправляем заявку…",
      successTitle: "Заявка успешно принята!",
      successDesc: "Спасибо за обращение! Наш менеджер по работе с корпоративными клиентами свяжется с вами в течение 15 минут в рабочее время.",
      submitAgain: "Отправить ещё одну заявку",
      privacyNote: "Ваши данные защищены и не передаются третьим лицам.",
      requiredError: "Необходимо дать согласие на обработку персональных данных",
    },
    privacyModal: {
      title: "Политика конфиденциальности ТОО «С-Мунай»",
      subtitle: "В соответствии с Законом Республики Казахстан «О персональных данных и их защите»",
      sec1Title: "1. Общие положения",
      sec1Text: "Настоящая Политика определяет порядок сбора, обработки, хранения и защиты персональных данных пользователей официального сайта сети АЗС «С-Мунай» (ТОО «С-Мунай»). Мы гарантируем соблюдение прав и свобод человека при обработке персональных данных в соответствии с законодательством Республики Казахстан.",
      sec2Title: "2. Состав собираемых персональных данных",
      sec2Text: "При отправке форм обратной связи и заявок на получение корпоративных топливных карт или талонов мы собираем:",
      sec2List: [
        "Фамилия, имя, отчество контактного лица;",
        "Контактный номер телефона;",
        "Наименование организации или статус ИП;",
        "Технические данные (IP-адрес, файлы cookie, источник перехода).",
      ],
      sec3Title: "3. Цели сбора и обработки данных",
      sec3List: [
        "Связь с клиентом для консультации и подбора условий заправки автопарка;",
        "Подготовка коммерческих предложений и оформление договоров на отпуск ГСМ;",
        "Информирование об акциях и скидках сети (при наличии отдельного согласия);",
        "Улучшение качества обслуживания клиентов на АЗС сети.",
      ],
      sec4Title: "4. Защита и неразглашение данных",
      sec4Text: "ТОО «С-Мунай» принимает все необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования или распространения.",
      sec5Title: "5. Права субъекта персональных данных",
      sec5Text: "Пользователь имеет право на получение информации, касающейся обработки его персональных данных, требовать их уточнения, блокирования или уничтожения, а также в любой момент отозвать свое согласие, обратившись к нам через официальные контакты сети.",
      closeBtn: "Понятно",
    },
    about: {
      title: "О нас",
      text: "Мы развиваем собственную сеть АЗС в Улытауской области и Астане. Начинали с одной станции — сегодня нас восемь. Мы местная команда: знаем свои города, своих клиентов и отвечаем за качество топлива своей репутацией.",
      badge: "Качественное топливо",
    },
    jobs: {
      title: "Вакансии",
      text: "Присоединяйтесь к команде С-Мунай — нам нужны внимательные и доброжелательные люди: кассиры, операторы, бариста. Напишите нам в Instagram Direct, и мы расскажем о свободных позициях.",
      writeInsta: "Написать в Instagram",
      applyBtn: "Подать заявку",
    },
    contacts: {
      title: "Контакты",
      instaCardTitle: "Официальный Instagram",
      instaHandle: "@azs_smunai",
      instaDesc: "Все актуальные новости сети, праздничные акции, розыгрыши призов и оперативная связь в Direct.",
      instaBtn: "Перейти в @azs_smunai",
      geoTitle: "География станций сети",
      geoSubtitle: "8 станций в 3 регионах",
    },
    footer: {
      rights: "© С-Мунай. Все права защищены.",
    },
    cardsPage: {
      heroBadge: "Бизнес-клиентам",
      heroTitle: "Заправляем автопарки Жезказгана, Сатпаева и Астаны",
      heroDesc: "Топливные карты и талоны для таксопарков, грузоперевозчиков и ИП — лимиты по водителям, единый счёт и закрывающие документы каждый месяц.",
      heroOrderBtn: "Оставить заявку",
      featuresTitle: "Топливные карты и талоны для бизнеса",
      featuresSubtitle: "Для таксопарков, грузоперевозчиков и индивидуальных предпринимателей: своя карта каждому водителю, оплата с одного счёта, ежемесячный отчёт.",
      f1Title: "Лимиты по водителям",
      f1Desc: "Устанавливайте суточные и месячные ограничения по объёму и видам топлива для каждого автомобиля.",
      f2Title: "Один счёт на весь автопарк",
      f2Desc: "Пополняйте единый баланс компании безналичным переводом без необходимости выдавать наличные водителям.",
      f3Title: "Закрывающие документы вовремя",
      f3Desc: "Ежемесячный реестр заправок, ЭСФ и акты сверки для бухгалтерии в установленные сроки.",
      tabCards: "Топливные карты",
      tabVouchers: "Талоны на топливо",
    },
  },
  en: {
    nav: {
      azs: "Stations",
      fuel: "Fuel",
      vouchers: "Vouchers",
      services: "Services",
      promo: "Offers",
      b2b: "Business",
      about: "About",
      jobs: "Careers",
      contacts: "Contacts",
      cards3d: "Cards & 3D",
      toHome: "Back to Home",
    },
    hero: {
      badge: "Premium Fuel",
      title: "Fueling Zhezkazgan, Satpayev, and Astana with quality fuel",
      subtitle: "8 company stations · premium fuel quality · Hi-Tech line · fuel cards & vouchers",
      findStation: "Find Station",
      promosBtn: "Special Offers",
      featureCardTitle: "S-MUNAI NETWORK",
      featureSubtitle: "Trusted gas station network",
      feature1: "Strict laboratory quality control for every fuel delivery",
      feature2: "Convenience store and fresh bean coffee 24/7",
      feature3: "24/7 continuous friendly service at all stations",
      slogan: "Fuel for the car, Ulytau in the heart",
      yearsMetric: "24/7",
      yearsLabel: "working hours",
      stationsMetric: "8",
      stationsLabel: "network stations",
      citiesMetric: "3",
      citiesLabel: "cities served",
    },
    stations: {
      title: "Our Gas Stations",
      subtitle: "Find your nearest station — we are open 24/7 every single day.",
      cityZhez: "Zhezkazgan",
      citySat: "Satpayev",
      cityAst: "Astana",
      allCities: "All Stations (8)",
      hours247: "24/7 (Open daily)",
      showOnMap: "Show on map →",
      route2gis: "2GIS Route",
      branches2gis: "2GIS Branches",
      mapTitle: "Interactive Map & 2GIS Navigation",
      fuelOnly: "Fuel Only",
      fuelShopCoffee: "Fuel, Store, Coffee",
      serviceFuel: "Fuel",
      serviceShop: "Store",
      serviceCoffee: "Coffee",
      selectedStation: "Selected Station:",
    },
    fuelSection: {
      title: "Fuel Grades & Hi-Tech Series",
      subtitle: "Refinery-grade certified fuels with strict quality passports and advanced Hi-Tech engine protection formulas.",
      hitechBadge: "Advanced Hi-Tech Series",
      ai92HitechTitle: "AI-92 Hi-Tech",
      ai92HitechDesc: "Innovative gasoline with active cleaning additives: removes injector deposits, protects valves, and saves fuel.",
      ai92HitechBadge: "Hi-Tech Formula",
      ai95HitechTitle: "AI-95 Hi-Tech",
      ai95HitechDesc: "Premium high-octane fuel with friction modifier technology for maximum power, acceleration, and cylinder protection.",
      ai95HitechBadge: "Hi-Tech Premium",
      ai92Title: "AI-92",
      ai92Desc: "Reliable classic GOST fuel for smooth daily engine performance in any temperature conditions.",
      ai92Badge: "GOST / K-4",
      ai95Title: "AI-95",
      ai95Desc: "High-octane gasoline for responsive acceleration and effective engine knock prevention.",
      ai95Badge: "Euro-5 / K-5",
      dtTitle: "Diesel (DT)",
      dtDesc: "Purified high-cetane diesel fuel for passenger cars and heavy commercial fleets.",
      dtBadge: "Euro Diesel",
      shopTitle: "On-Site Store",
      shopDesc: "Road trip essentials: cold drinks, snacks, car care accessories and engine oils.",
      coffeeTitle: "Fresh Coffee To Go",
      coffeeDesc: "Freshly brewed specialty coffee at every station — fuel up yourself too.",
    },
    vouchersSection: {
      badge: "Simple & Flexible Billing",
      title: "S-Munai Fuel Vouchers",
      subtitle: "Lock in fuel prices in advance, optimize fleet budgets, and issue flexible vouchers to drivers and subcontractors.",
      denominationsTitle: "Available Voucher Denominations:",
      denom10: "10 Liters",
      denom20: "20 Liters",
      denom50: "50 Liters",
      b1Title: "Price Lock Guarantee",
      b1Desc: "Your fuel price is fixed upon purchase. You are 100% protected against any future retail price hikes.",
      b2Title: "Easy to Distribute",
      b2Desc: "Perfect for business trips, third-party contractors, temporary drivers, or employee fuel bonuses.",
      b3Title: "Full Tax Invoicing",
      b3Desc: "All statutory accounting documents (electronic tax invoices, delivery notes) are issued instantly upon purchase.",
      b4Title: "Accepted at All 8 Stations",
      b4Desc: "Valid without restrictions across all network stations in Zhezkazgan, Satpayev, and Astana.",
      orderVouchersBtn: "Order Fuel Vouchers",
    },
    servicesSection: {
      badge: "High Standard",
      title: "Station Services & Driver Comfort",
      subtitle: "Every detail is designed to make your stop at S-Munai fast, comfortable, and seamless.",
      s1Title: "High-Precision Dispensing",
      s1Desc: "Modern dispenser pumps with regular electronic calibration for exact milliliter precision.",
      s2Title: "24/7 Express Market",
      s2Desc: "Wide selection of chilled drinks, energy drinks, freshly baked snacks, and travel essentials.",
      s3Title: "100% Arabica Bean Coffee",
      s3Desc: "Freshly ground Swiss-machine brewed espresso, americano, cappuccino, and silky latte.",
      s4Title: "Certified Motor Oils",
      s4Desc: "Original motor and gear oils, radiator coolants, brake fluids, and seasonal windshield wash.",
      s5Title: "24/7 Friendly Attendants",
      s5Desc: "Attentive station operators on duty around the clock to help fuel your car smoothly in any weather.",
      s6Title: "All Modern Payment Methods",
      s6Desc: "Kaspi QR, Halyk QR, contactless bank cards, cash, corporate fuel cards, and vouchers.",
    },
    promo: {
      title: "Special Promotions",
      subtitle: "Special prize draws and fuel discounts for our loyal customers.",
      card1Badge: "Prize Draw",
      card1Title: "Valuable Prize Draws",
      card1Desc: "Fill up at S-Munai and join our jubilee prize giveaways of free fuel and electronics.",
      card2Badge: "Fleet Advantage",
      card2Title: "Exclusive Terms for Businesses",
      card2Desc: "Tailored fuel discounts and flexible payment terms for corporate fleet cards.",
      instagramNote: "All latest offers and campaign rules are posted on our official Instagram:",
      openInstagram: "Visit Instagram",
    },
    b2b: {
      badge: "For Corporate Clients",
      title: "Fuel Cards & Vouchers for Fleets",
      desc: "Manage fleet fueling with zero cash: corporate fuel cards and vouchers, driver-level limits, timely monthly tax invoices, and tailored discounts across Zhezkazgan, Satpayev, and Astana.",
      f1: "Custom daily and monthly volume limits per vehicle",
      f2: "Electronic invoicing and full VAT deduction compliance",
      f3: "Detailed monthly fueling statement reports",
      f4: "Dedicated account manager and fast technical support",
      see3d: "Detailed terms and interactive 3D station model:",
      linkCards3d: "Explore Fuel Cards & 3D Station Page →",
    },
    form: {
      title: "Corporate Inquiry",
      subtitle: "Leave your contact information — we will prepare tailored fuel discounts and terms for your fleet.",
      productLabel: "What are you interested in?",
      productCards: "Fuel Cards",
      productVouchers: "Fuel Vouchers",
      productBoth: "Cards + Vouchers",
      nameLabel: "Contact Name",
      namePlaceholder: "Baurzhan / Fleet Manager",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+7 (___) ___-__-__",
      orgLabel: "Company / Sole Proprietor",
      orgPlaceholder: "LLP / Individual Entrepreneur / Fleet",
      commentLabel: "Additional Info (Fleet Size / Volume)",
      commentPlaceholder: "Number of vehicles or estimated fuel volume per month",
      dataConsentText: "I consent to the collection and processing of my personal data by S-Munai LLP under the",
      privacyLink: "Privacy Policy",
      marketingConsentText: "I agree to receive personalized commercial proposals and network promotion updates",
      submitBtn: "Submit Inquiry",
      submittingBtn: "Submitting inquiry…",
      successTitle: "Inquiry successfully received!",
      successDesc: "Thank you! Our corporate fleet manager will contact you within 15 minutes during business hours.",
      submitAgain: "Submit another inquiry",
      privacyNote: "Your data is strictly protected and never shared with third parties.",
      requiredError: "Consent to personal data processing is required",
    },
    privacyModal: {
      title: "S-Munai LLP Privacy Policy",
      subtitle: "In accordance with the Law of the Republic of Kazakhstan on Personal Data Protection",
      sec1Title: "1. General Provisions",
      sec1Text: "This Policy governs the collection, processing, storage, and protection of personal data of users of the official website of S-Munai LLP. We guarantee the protection of personal rights and freedoms in compliance with Kazakhstan legislation.",
      sec2Title: "2. Personal Data Collected",
      sec2Text: "When submitting contact forms or corporate fuel card applications, we collect:",
      sec2List: [
        "Full name of the contact person;",
        "Contact phone number;",
        "Company name or sole trader status;",
        "Technical visit parameters (IP address, cookies, referral source).",
      ],
      sec3Title: "3. Purpose of Data Processing",
      sec3List: [
        "Client consultation and fleet fuel program customization;",
        "Preparing commercial proposals and supply contracts;",
        "Notification regarding network promotions and special offers (with consent);",
        "Improving service quality at our stations.",
      ],
      sec4Title: "4. Security & Non-Disclosure",
      sec4Text: "S-Munai LLP takes all required organizational, legal, and technical security measures to prevent unauthorized access, alteration, deletion, or distribution of personal data.",
      sec5Title: "5. Data Subject Rights",
      sec5Text: "Users have the right to request information about their data processing, demand corrections, or withdraw their consent at any time via our official contact channels.",
      closeBtn: "Understood",
    },
    about: {
      title: "About Us",
      text: "We have developed our own gas station network across the Ulytau region and Astana. Starting from a single station, today we operate eight. We are a local team: we know our cities and our drivers, standing behind our fuel quality with our hard-earned reputation.",
      badge: "Premium Fuel",
    },
    jobs: {
      title: "Careers",
      text: "Join the S-Munai team — we are looking for attentive and friendly people: cashiers, fuel operators, baristas. Message us in Instagram Direct to learn about open positions.",
      writeInsta: "Message on Instagram",
      applyBtn: "Apply Now",
    },
    contacts: {
      title: "Contacts",
      instaCardTitle: "Official Instagram",
      instaHandle: "@azs_smunai",
      instaDesc: "All latest network updates, prize draws, promos, and direct communication in Direct.",
      instaBtn: "Open @azs_smunai",
      geoTitle: "Network Station Footprint",
      geoSubtitle: "8 stations across 3 regions",
    },
    footer: {
      rights: "© S-Munai. All rights reserved.",
    },
    cardsPage: {
      heroBadge: "For Business Fleets",
      heroTitle: "Fueling fleets across Zhezkazgan, Satpayev, and Astana",
      heroDesc: "Corporate fuel cards and vouchers for taxi fleets, freight carriers, and businesses — driver limits, unified billing, and monthly tax invoices.",
      heroOrderBtn: "Submit Application",
      featuresTitle: "Fuel Cards & Vouchers for Business",
      featuresSubtitle: "For taxi companies, logistics carriers, and entrepreneurs: individual card for each driver, single account billing, and detailed monthly reports.",
      f1Title: "Driver Volume Limits",
      f1Desc: "Set daily and monthly volume or fuel grade limits for each vehicle in your fleet.",
      f2Title: "One Unified Account",
      f2Desc: "Replenish one company balance via bank transfer with no need to issue cash to drivers.",
      f3Title: "Timely Tax Invoices",
      f3Desc: "Monthly fueling statement registries, electronic tax invoices (ESF), and reconciliation acts on schedule.",
      tabCards: "Fuel Cards",
      tabVouchers: "Fuel Vouchers",
    },
  },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("kz");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("smunai_lang") as Lang | null;
      if (saved && (saved === "kz" || saved === "ru" || saved === "en")) {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    try {
      localStorage.setItem("smunai_lang", newLang);
      document.documentElement.lang = newLang === "kz" ? "kk" : newLang;
    } catch {
      // ignore
    }
  }

  const t = DICTIONARY[lang] || DICTIONARY.kz;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "kz" as Lang,
      setLang: () => {},
      t: DICTIONARY.kz,
    };
  }
  return ctx;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  const options: { id: Lang; label: string }[] = [
    { id: "kz", label: "ҚАЗ" },
    { id: "ru", label: "РУС" },
    { id: "en", label: "ENG" },
  ];

  return (
    <div
      role="group"
      aria-label="Тілді таңдау / Выбор языка"
      className={`inline-flex items-center rounded-full border border-primary/20 bg-background/80 p-0.5 shadow-sm backdrop-blur ${className}`}
    >
      {options.map((opt) => {
        const isActive = lang === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLang(opt.id)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
