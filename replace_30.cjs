const fs = require('fs');
let text = fs.readFileSync('src/lib/i18n.tsx', 'utf8');

const r = (a, b) => { text = text.split(a).join(b); };

r('1996–2026 · 30 жыл', 'Сапалы жанармай');
r('1996–2026 · 30 лет', 'Качественное топливо');
r('1996–2026 · 30 Years', 'Premium Fuel');

r('Жезқазған, Сәтбаев және Астананы 30 жыл бойы жанармаймен қамтамасыз етіп келеміз', 'Жезқазған, Сәтбаев және Астананы сапалы жанармаймен қамтамасыз етіп келеміз');
r('Заправляем Жезказган, Сатпаев и Астану уже 30 лет', 'Заправляем Жезказган, Сатпаев и Астану качественным топливом');
r('Fueling Zhezkazgan, Satpayev, and Astana for 30 years', 'Fueling Zhezkazgan, Satpayev, and Astana with quality fuel');

r('yearsMetric: "30 жыл"', 'yearsMetric: "24/7"');
r('yearsLabel: "нарықта"', 'yearsLabel: "жұмыс уақыты"');
r('yearsMetric: "30 лет"', 'yearsMetric: "24/7"');
r('yearsLabel: "на рынке"', 'yearsLabel: "режим работы"');
r('yearsMetric: "30 Years"', 'yearsMetric: "24/7"');
r('yearsLabel: "on the market"', 'yearsLabel: "working hours"');

r('30 жылдық мерейтойлық акциялар', 'Біздің акциялар');
r('С-Мұнай желісінің 30 жылдығына орай тұтынушыларымызға арналған арнайы ұтыстар мен сыйлықтар.', 'С-Мұнай желісінің тұтынушыларына арналған арнайы ұтыстар мен сыйлықтар.');
r('30 жылдыққа орай құнды сыйлықтар', 'Бағалы сыйлықтар ұтысы');

r('Акции к 30-летию сети', 'Наши акции');
r('Юбилейный розыгрыш', 'Розыгрыш');
r('Ценные призы к 30-летию компании', 'Розыгрыш ценных призов');

r('30th Anniversary Promotions', 'Special Promotions');
r('Special prize draws and fuel discounts celebrating our 30 years on the road.', 'Special prize draws and fuel discounts for our loyal customers.');
r('Anniversary Draw', 'Prize Draw');
r('Valuable Prizes for our 30th Year', 'Valuable Prize Draws');

r('1996 жылдан бастап біз Ұлытау облысы мен Астана қаласында жеке ЖҚС желісін дамытып келеміз. Бір станциядан бастап, бүгінде сегізге жеттік. Біз жергілікті ұжымбыз: өз қалаларымыз бен тұтынушыларымызды жақсы білеміз және 30 жыл бойы жинаған адал абыройымызбен жанармай сапасына кепілдік береміз.', 'Біз Ұлытау облысы мен Астана қаласында жеке ЖҚС желісін дамытып келеміз. Бір станциядан бастап, бүгінде сегізге жеттік. Біз жергілікті ұжымбыз: өз қалаларымыз бен тұтынушыларымызды жақсы білеміз және адал абыройымызбен жанармай сапасына кепілдік береміз.');
r('С 1996 года мы развиваем собственную сеть АЗС в Улытауской области и Астане. Начинали с одной станции — сегодня нас восемь. Мы местная команда: знаем свои города, своих клиентов и отвечаем за качество топлива репутацией, заработанной за 30 лет.', 'Мы развиваем собственную сеть АЗС в Улытауской области и Астане. Начинали с одной станции — сегодня нас восемь. Мы местная команда: знаем свои города, своих клиентов и отвечаем за качество топлива своей репутацией.');
r('Since 1996, we have developed our own gas station network across the Ulytau region and Astana. Starting from a single station, today we operate eight. We are a local team: we know our cities and our drivers, standing behind our fuel quality with 30 years of hard-earned reputation.', 'We have developed our own gas station network across the Ulytau region and Astana. Starting from a single station, today we operate eight. We are a local team: we know our cities and our drivers, standing behind our fuel quality with our hard-earned reputation.');

r('Желінің барлық жаңалықтары, мерекелік акциялар, 30 жылдық ұтыстар және Direct арқылы жедел байланыс.', 'Желінің барлық жаңалықтары, мерекелік акциялар, ұтыстар және Direct арқылы жедел байланыс.');
r('Все актуальные новости сети, праздничные акции, розыгрыши призов к 30-летию компании и оперативная связь в Direct.', 'Все актуальные новости сети, праздничные акции, розыгрыши призов и оперативная связь в Direct.');
r('All latest network updates, 30th anniversary prize draws, promos, and direct communication in Direct.', 'All latest network updates, prize draws, promos, and direct communication in Direct.');

r('© С-Мұнай, 1996–2026. Барлық құқықтар қорғалған.', '© С-Мұнай. Барлық құқықтар қорғалған.');
r('© С-Мунай, 1996–2026. Все права защищены.', '© С-Мунай. Все права защищены.');
r('© S-Munai, 1996–2026. All rights reserved.', '© S-Munai. All rights reserved.');

fs.writeFileSync('src/lib/i18n.tsx', text);
console.log('Done');
