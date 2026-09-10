import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, MessageCircle, ArrowUp } from "lucide-react";
import { submitLead } from "@/lib/leads";
import { useLanguage } from "@/lib/i18n";

const WORKER_URL = "https://smunai-chat-worker.smunay-chat.workers.dev"; 

interface Msg {
  role: "user" | "model";
  text: string;
}

/** Заявка, которую бот предложил оформить: уходит в CRM только после подтверждения. */
interface PendingLead {
  name: string;
  phone: string;
  comment: string;
  type: "sales" | "hr";
  position?: string;
}

/**
 * Текст ответа модели — не источник истины: посетитель может уговорить бота
 * выдать любой блок [LEAD]. Поэтому разбор строгий, а всё лишнее отбрасываем.
 */
function parseLead(raw: string): PendingLead | null {
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const phone = str(data["phone"], 40);
  // без пригодного номера заявка бесполезна менеджеру
  if (phone.replace(/\D+/g, "").length < 10) return null;
  const type = data["type"] === "hr" ? "hr" : "sales";
  const position = str(data["position"], 120);
  return {
    name: str(data["name"], 120) || (type === "hr" ? "Кандидат из чата" : "Клиент из чата"),
    phone,
    comment: str(data["comment"], 2000) || "Заявка через чат-бот Мунай",
    type,
    ...(position ? { position } : {}),
  };
}

const GREETING: Record<string, string> = {
  kz: "Сәлеметсіз бе! Мен Мұнай — С-Мұнай виртуалды көмекшісімін. Сізге қалай көмектесе аламын?",
  ru: "Здравствуйте! Я Мунай — виртуальный ассистент С-Мунай. Чем могу помочь?",
  en: "Hello! I'm Munai, the S-Munai virtual assistant. How can I help you?",
};

export function SupportChat() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingLead, setPendingLead] = useState<PendingLead | null>(null);
  const [leadConsent, setLeadConsent] = useState(false);
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Загрузка истории из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("smunai_chat_history");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {
      // Игнорируем ошибку парсинга
    }
  }, []);

  // Сохранение истории при изменении
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("smunai_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendPendingLead() {
    if (!pendingLead || !leadConsent || leadState === "sending") return;
    setLeadState("sending");
    try {
      await submitLead({
        name: pendingLead.name,
        phone: pendingLead.phone,
        comment: pendingLead.comment,
        type: pendingLead.type,
        form_id: "chat_bot",
        // Согласие на рекламные рассылки в чате отдельно не спрашиваем —
        // галочка выше касается только обработки данных по заявке.
        consent: false,
        extra: {
          data_consent: true,
          source: "ai_chat",
          position: pendingLead.position,
        },
      });
      setLeadState("sent");
    } catch (err) {
      console.error("[SupportChat] Ошибка отправки лида:", err);
      setLeadState("error");
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    
    const history: Msg[] = [...messages, { role: "user", text }];
    setMessages([...history, { role: "model", text: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: history, 
          lang, 
          path: window.location.pathname // Передаем текущую страницу для умного контекста
        }),
      });
      
      if (!res.ok || !res.body) throw new Error(String(res.status));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";
      let leadSent = false;
      
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const chunk = JSON.parse(line.slice(6));
            answer += chunk.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
            
            // Защита: Если ответ содержит скрытый тег [LEAD], убираем его из текста
            let visibleText = answer;
            if (visibleText.includes("[LEAD]")) {
              visibleText = visibleText.substring(0, visibleText.indexOf("[LEAD]")).trim();
              // Заявку не отправляем сами: показываем карточку подтверждения и
              // ждём, пока человек поставит галочку согласия. Иначе достаточно
              // уговорить бота выдать блок [LEAD] — и в CRM появится чужой номер
              // с отметкой «согласие получено», которого никто не давал.
              if (!leadSent && answer.includes("[/LEAD]")) {
                const leadMatch = answer.match(/\[LEAD\]([\s\S]*?)\[\/LEAD\]/);
                const parsed = leadMatch?.[1] ? parseLead(leadMatch[1]) : null;
                if (parsed) {
                  leadSent = true;
                  setPendingLead(parsed);
                  setLeadConsent(false);
                  setLeadState("idle");
                }
              }
            }
            
            setMessages([...history, { role: "model", text: visibleText }]);
          } catch {
            // ждем следующий кусок
          }
        }
      }
    } catch {
      setMessages([...history, {
        role: "model",
        text: "К сожалению, сервер недоступен. Напишите нам в Instagram @azs_smunai",
      }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div
        className={`fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[32px] border border-white/20 bg-background/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 scale-95 opacity-0"
        }`}
        style={{ height: "min(560px, 70vh)" }}
      >
        <div className="flex items-center gap-3 border-b border-primary/5 bg-primary/5 px-6 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground">
            М
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold tracking-tight text-foreground">
              {lang === "kz" ? "Мұнай" : lang === "en" ? "Munai" : "Мунай"}
            </p>
            <p className="text-xs text-muted-foreground">
              {lang === "kz" ? "С-Мұнай виртуалды ассистенті" : lang === "en" ? "S-Munai Virtual Assistant" : "Ассистент С-Мунай"}
            </p>
          </div>
          <button 
            onClick={() => {
              const confirmText = lang === "kz" ? "Чат тарихын тазалау керек пе?" : lang === "en" ? "Clear chat history?" : "Очистить историю чата?";
              if (messages.length > 0 && confirm(confirmText)) {
                localStorage.removeItem("smunai_chat_history");
                setMessages([]);
              } else {
                setOpen(false);
              }
            }} 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-foreground transition-colors hover:bg-primary/20" 
            aria-label={lang === "kz" ? "Жабу" : lang === "en" ? "Close" : "Закрыть"}
            title={lang === "kz" ? "Тарихты тазалау" : lang === "en" ? "Clear history" : "Очистить историю"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5 scrollbar-hide">
          <Bubble role="model" text={GREETING[lang]} />
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} text={m.text} typing={busy && i === messages.length - 1 && m.text === ""} />
          ))}
          {pendingLead && (
            <div className="rounded-3xl border border-primary/15 bg-primary/5 px-5 py-4 text-[13px]">
              {leadState === "sent" ? (
                <p className="font-medium text-foreground">
                  {lang === "kz"
                    ? `Өтінім жіберілді — менеджер ${pendingLead.phone} нөміріне хабарласады.`
                    : lang === "en"
                    ? `Request sent — our manager will contact you at ${pendingLead.phone}.`
                    : `Заявка отправлена — менеджер свяжется с вами по номеру ${pendingLead.phone}.`}
                </p>
              ) : (
                <>
                  <p className="font-semibold text-foreground">
                    {lang === "kz" ? "Өтінім қалдыру керек пе?" : lang === "en" ? "Submit inquiry?" : "Оформить заявку?"}
                  </p>
                  <dl className="mt-2 space-y-0.5 text-muted-foreground">
                    <div className="flex gap-2">
                      <dt className="shrink-0">{lang === "kz" ? "Аты-жөні:" : lang === "en" ? "Name:" : "Имя:"}</dt>
                      <dd className="text-foreground">{pendingLead.name}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0">{lang === "kz" ? "Телефон:" : lang === "en" ? "Phone:" : "Телефон:"}</dt>
                      <dd className="text-foreground">{pendingLead.phone}</dd>
                    </div>
                    {pendingLead.position && (
                      <div className="flex gap-2">
                        <dt className="shrink-0">{lang === "kz" ? "Лауазымы:" : lang === "en" ? "Position:" : "Должность:"}</dt>
                        <dd className="text-foreground">{pendingLead.position}</dd>
                      </div>
                    )}
                  </dl>
                  <label className="mt-3 flex cursor-pointer select-none items-start gap-2 text-[12px] leading-snug text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={leadConsent}
                      onChange={(e) => setLeadConsent(e.target.checked)}
                      disabled={leadState === "sending"}
                      className="mt-0.5 size-4 shrink-0 rounded accent-primary"
                    />
                    <span>
                      {lang === "kz" ? (
                        <>
                          Мен «С-Мұнай» ЖШС-не дербес деректерімді өңдеуге келісім беремін{" "}
                          <Link to="/privacy" className="font-medium text-primary underline">
                            Құпиялылық саясатына
                          </Link>{" "}
                          сәйкес.
                        </>
                      ) : lang === "en" ? (
                        <>
                          I consent to S-Munai LLP processing my personal data according to the{" "}
                          <Link to="/privacy" className="font-medium text-primary underline">
                            Privacy Policy
                          </Link>
                          .
                        </>
                      ) : (
                        <>
                          Я даю согласие ТОО «С-Мунай» на обработку моих персональных данных согласно{" "}
                          <Link to="/privacy" className="font-medium text-primary underline">
                            Политике конфиденциальности
                          </Link>
                          .
                        </>
                      )}
                    </span>
                  </label>
                  {leadState === "error" && (
                    <p className="mt-2 text-[12px] text-destructive">
                      {lang === "kz"
                        ? "Өтінім жіберілмеді. Қайталап көріңіз."
                        : lang === "en"
                        ? "Failed to submit request. Please try again."
                        : "Не удалось отправить заявку. Попробуйте ещё раз."}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={sendPendingLead}
                      disabled={!leadConsent || leadState === "sending"}
                      className="rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
                    >
                      {leadState === "sending"
                        ? lang === "kz" ? "Жіберілуде…" : lang === "en" ? "Sending…" : "Отправляем…"
                        : lang === "kz" ? "Өтінім жіберу" : lang === "en" ? "Submit Request" : "Отправить заявку"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingLead(null)}
                      disabled={leadState === "sending"}
                      className="rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {lang === "kz" ? "Қазір емес" : lang === "en" ? "Not now" : "Не сейчас"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-primary/5 p-4">
          <div className="flex items-end gap-2 rounded-3xl bg-primary/5 p-1.5 pl-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={
                lang === "kz"
                  ? "Сұрағыңызды жазыңыз..."
                  : lang === "en"
                  ? "Ask anything..."
                  : "Спросите что-нибудь..."
              }
              className="flex-1 bg-transparent py-2.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={send}
              disabled={!input.trim() || busy}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform enabled:hover:scale-105 disabled:opacity-40"
              aria-label={lang === "kz" ? "Жіберу" : lang === "en" ? "Send" : "Отправить"}
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
        aria-label={lang === "kz" ? "Қолдау чаты" : lang === "en" ? "Support Chat" : "Чат поддержки"}
      >
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </>
  );
}

function Bubble({ role, text, typing }: { role: "user" | "model"; text: string; typing?: boolean }) {
  if (!text && !typing) return null;
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-5 py-3 text-[15px] leading-relaxed shadow-sm ${
          role === "user"
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-primary/10 text-foreground"
        }`}
      >
        {typing ? (
          <span className="flex h-5 items-center gap-1.5">
            {[0, 150, 300].map((d) => (
              <span key={d} className="h-2 w-2 animate-pulse rounded-full bg-primary/60" style={{ animationDelay: `${d}ms` }} />
            ))}
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
