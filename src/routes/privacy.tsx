import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Mail } from "lucide-react";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — С-Мунай" },
      { name: "description", content: "Политика конфиденциальности и обработки персональных данных ТОО «С-Мунай»." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useLanguage();
  const isKz = lang === "kz";
  const isEn = lang === "en";

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-linear-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] -z-10" />

      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-primary/5 p-2 text-primary transition-colors hover:bg-primary/10"
              title={isKz ? "Басты бетке" : isEn ? "Back to Home" : "На главную"}
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </Link>
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo-navbar.svg"
                alt="С-МУНАЙ"
                className="h-7 w-auto object-contain sm:h-8"
              />
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 px-5 py-12 max-w-4xl mx-auto w-full">
        <div className="soft-card p-6 sm:p-10 bg-background/80 backdrop-blur-md shadow-xl border-primary/10 prose prose-teal max-w-none">
          <h1 className="display-hero mb-3 text-2xl text-primary sm:text-3xl md:text-4xl">
            {isKz
              ? "ДЕРБЕС ДЕРЕКТЕРДІ ӨҢДЕУ ЖӘНЕ ҚҰПИЯЛЫЛЫҚ САЯСАТЫ"
              : isEn
              ? "PRIVACY AND PERSONAL DATA PROCESSING POLICY"
              : "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ И ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ"}
          </h1>
          <p className="text-sm font-semibold text-gold mb-8">
            {isKz
              ? "«С-Мұнай» ЖШС · Қазақстан Республикасының «Дербес деректер және оларды қорғау туралы» Заңына сәйкес"
              : isEn
              ? "S-Munai LLP · In accordance with the Law of the Republic of Kazakhstan 'On Personal Data and its Protection'"
              : "ТОО «С-Мунай» · В соответствии с Законом Республики Казахстан «О персональных данных и их защите»"}
          </p>
          
          <div className="space-y-6 text-foreground/80 leading-relaxed not-prose text-sm sm:text-base">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isKz ? "1. Жалпы ережелер" : isEn ? "1. General Provisions" : "1. Общие положения"}
              </h2>
              <div className="space-y-2">
                <p>
                  {isKz
                    ? "Осы Саясат «С-Мұнай» ЖШС (бұдан әрі — Компания) ресми сайтының пайдаланушыларының дербес деректерін жинау, өңдеу, сақтау және қорғау тәртібін айқындайды."
                    : isEn
                    ? "This Policy governs the collection, processing, storage, and protection of personal data of users of the official website of S-Munai LLP (hereinafter — the Company)."
                    : "Настоящая Политика определяет порядок сбора, обработки, хранения и защиты персональных данных пользователей официального сайта сети АЗС ТОО «С-Мунай» (далее — Компания)."}
                </p>
                <p>
                  {isKz
                    ? "Дербес деректерді өңдеу Қазақстан Республикасының заңнамасына, соның ішінде Қазақстан Республикасының «Дербес деректер және оларды қорғау туралы» Заңына сәйкес жүзеге асырылады."
                    : isEn
                    ? "Processing of personal data is carried out in strict compliance with the legislation of the Republic of Kazakhstan, including the Law 'On Personal Data and its Protection'."
                    : "Обработка персональных данных осуществляется в соответствии с законодательством Республики Казахстан, в том числе Законом Республики Казахстан «О персональных данных и их защите»."}
                </p>
                <p>
                  {isKz
                    ? "Сайтта орналастырылған нысандар арқылы деректерді ұсына отырып және оларды өңдеуге келісім бере отырып, пайдаланушы осы Саясаттың шарттарымен толық келісетінін білдіреді."
                    : isEn
                    ? "By providing personal data via website inquiry forms and consenting to processing, the user expresses agreement with the terms and purposes set forth in this Policy."
                    : "Предоставляя персональные данные посредством форм, размещенных на сайте, и подтверждая свое согласие на их сбор и обработку, пользователь выражает согласие на обработку предоставленных им персональных данных в целях и на условиях, предусмотренных настоящей Политикой."}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isKz ? "2. Жинақталатын дербес деректер құрамы" : isEn ? "2. Scope of Collected Personal Data" : "2. Состав собираемых персональных данных"}
              </h2>
              <p className="mb-2">
                {isKz
                  ? "Сайтты пайдалану, кері байланыс нысандарын толтыру немесе корпоративтік отын карталары мен талондарына тапсырыс беру кезінде келесі деректер жиналуы мүмкін:"
                  : isEn
                  ? "When utilizing the website, submitting feedback forms, or requesting fleet fuel cards and vouchers, the Company may collect:"
                  : "При использовании сайта, заполнении форм обратной связи, направлении заявок на получение корпоративных топливных карт, талонов и иных обращений Компания может осуществлять сбор и обработку следующих данных:"}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isKz ? "Байланысушы тұлғаның тегі, аты, әкесінің аты;" : isEn ? "Full name of the contact person;" : "фамилия, имя, отчество контактного лица;"}</li>
                <li>{isKz ? "Байланыс телефон нөмірі;" : isEn ? "Contact telephone number;" : "контактный номер телефона;"}</li>
                <li>{isKz ? "Ұйымның атауы немесе ЖК деректері;" : isEn ? "Entity name or individual entrepreneur details;" : "наименование организации или сведения об индивидуальном предпринимателе;"}</li>
                <li>{isKz ? "Пайдаланушы өтініш нысанында ерікті түрде көрсеткен өзге де мәліметтер;" : isEn ? "Other details voluntarily supplied by the user in inquiry messages;" : "иные сведения, добровольно предоставленные пользователем в форме обращения;"}</li>
                <li>{isKz ? "Сайтқа кіру кезіндегі техникалық деректер (IP-мекенжай, cookie файлдары, браузер түрі, құрылғы түрі)." : isEn ? "Technical data automatically transmitted upon visiting (IP address, cookies, browser, device specs)." : "технические данные, автоматически передаваемые при использовании сайта, включая IP-адрес, файлы cookie, сведения о браузере, устройстве и источнике перехода на сайт."}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isKz ? "3. Дербес деректерді жинау мен өңдеу мақсаттары" : isEn ? "3. Purposes of Data Collection and Processing" : "3. Цели сбора и обработки персональных данных"}
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isKz ? "Пайдаланушылардың өтініштері мен өтінімдерін өңдеу;" : isEn ? "Processing user requests and contact forms;" : "обработка обращений и заявок пользователей;"}</li>
                <li>{isKz ? "ЖЖМ сатып алу шарттары бойынша кеңес беру үшін кері байланыс орнату;" : isEn ? "Communicating to consult on fuel procurement terms and fleet supply;" : "связь с пользователем для предоставления консультаций и информации об условиях приобретения ГСМ;"}</li>
                <li>{isKz ? "Коммерциялық ұсыныстарды дайындау және келісім-шарттар жасасу;" : isEn ? "Drafting commercial proposals and executing supply agreements;" : "подготовка коммерческих предложений, заключение и исполнение договоров на реализацию ГСМ;"}</li>
                <li>{isKz ? "Корпоративтік жанармай карталары мен талондарды рәсімдеу;" : isEn ? "Issuance and maintenance of corporate fuel cards and vouchers;" : "оформление и обслуживание корпоративных топливных карт и талонов;"}</li>
                <li>{isKz ? "Қызмет көрсету сапасы мен сайттың жұмысын жетілдіру." : isEn ? "Improving site performance and customer service standards." : "улучшение работы сайта и качества обслуживания клиентов."}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isKz ? "4. Деректерді сақтау және қорғау" : isEn ? "4. Data Storage and Security" : "4. Хранение и защита персональных данных"}
              </h2>
              <p>
                {isKz
                  ? "Дербес деректер Қазақстан Республикасының аумағында орналасқан қауіпсіз серверлік инфрақұрылымда сақталады. «С-Мұнай» ЖШС деректерді заңсыз қол жеткізуден, жоюдан немесе таралудан сақтау үшін барлық қажетті техникалық және ұйымдастырушылық шараларды қолданады."
                  : isEn
                  ? "Personal data is stored in databases located within the territory of the Republic of Kazakhstan. S-Munai LLP deploys legal, organizational, and technological security measures against unauthorized access, destruction, or distribution."
                  : "Персональные данные хранятся в базе, расположенной на территории Республики Казахстан, с соблюдением требований законодательства. ТОО «С-Мунай» принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа."}
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isKz ? "5. Пайдаланушының құқықтары" : isEn ? "5. User Rights" : "5. Права пользователя"}
              </h2>
              <p>
                {isKz
                  ? "Пайдаланушы өз деректерінің өңделуі туралы мәлімет алуға, оларды нақтылауды немесе жоюды талап етуге, сондай-ақ сайтта көрсетілген ресми байланыс нөмірлері мен поштасы арқылы өз келісімін кез келген уақытта қайтарып алуға құқылы."
                  : isEn
                  ? "Users are entitled to request information concerning their stored data, demand corrections or deletion, and revoke their processing consent at any time by contacting S-Munai LLP via official channels."
                  : "Пользователь вправе получать информацию об обработке своих данных, требовать их изменения, блокирования или уничтожения, а также в любой момент отозвать свое согласие, обратившись в ТОО «С-Мунай» по официальным контактам."}
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isKz ? "6. Cookie файлдары" : isEn ? "6. Cookie Files" : "6. Файлы cookie"}
              </h2>
              <p>
                {isKz
                  ? "Сайт ресурстың үздіксіз жұмысын және қолданушы ыңғайлылығын қамтамасыз ету үшін cookie файлдарын қолданады. Браузеріңіздің баптаулары арқылы оларды кез келген уақытта басқаруға немесе өшіруге болады."
                  : isEn
                  ? "The website uses cookies to ensure stable functionality and enhance user navigation. You may modify or disable cookie storage at any time via your browser preferences."
                  : "Сайт использует файлы cookie для обеспечения корректной работы сервисов и улучшения взаимодействия с пользователем. Вы можете в любой момент отключить сохранение cookie в настройках браузера."}
              </p>
            </section>

            <section className="pt-4 border-t border-primary/10 flex flex-wrap items-center justify-between gap-2 text-xs text-foreground/60">
              <p>
                {isKz
                  ? "Саясат сұрақтары бойынша: Жезқазған қ., Ұлытау к-сі, 4/2 · «С-Мұнай» ЖШС"
                  : isEn
                  ? "Privacy inquiries: 4/2 Ulytau st., Zhezkazgan, Kazakhstan · S-Munai LLP"
                  : "По вопросам Политики: г. Жезказган, ул. Ұлытау, 4/2 · ТОО «С-Мунай»"}
              </p>
              <a
                href="mailto:service@s-munai.kz"
                className="inline-flex items-center gap-1.5 text-primary hover:text-gold transition-colors font-medium lowercase"
              >
                <Mail className="size-3.5" />
                <span>service@s-munai.kz</span>
              </a>
            </section>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="hero-surface border-t border-white/10 py-8 text-white/70 text-xs mt-auto">
        <div className="mx-auto max-w-6xl px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 1996–2026 {isKz ? "«С-Мұнай» ЖШС. Барлық құқықтар қорғалған." : isEn ? "S-Munai LLP. All rights reserved." : "ТОО «С-Мунай». Все права защищены."}</p>
            <a
              href="mailto:service@s-munai.kz"
              className="inline-flex items-center gap-1.5 text-white/85 hover:text-gold transition-colors font-medium lowercase tracking-normal"
            >
              <Mail className="size-3.5 text-gold" />
              <span>service@s-munai.kz</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-4 font-medium">
            <Link to="/" className="hover:text-gold transition-colors">{isKz ? "Басты бет" : isEn ? "Home" : "Главная"}</Link>
            <Link to="/stations" className="hover:text-gold transition-colors">{isKz ? "АЗС" : isEn ? "Stations" : "АЗС"}</Link>
            <Link to="/b2b" className="hover:text-gold transition-colors">{isKz ? "Бизнеске" : isEn ? "Business" : "Бизнес"}</Link>
            <Link to="/career" className="hover:text-gold transition-colors">{isKz ? "Мансап" : isEn ? "Careers" : "Вакансии"}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
