import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, ArrowUp } from "lucide-react";

const WORKER_URL = "https://smunai-chat-worker.smunay-chat.workers.dev"; 

interface Msg {
  role: "user" | "model";
  text: string;
}

const GREETING: Record<string, string> = {
  kz: "Сәлеметсіз бе! Мен Мұнай — С-Мунай виртуалды көмекшісімін. Қалай көмектесе аламын?",
  ru: "Здравствуйте! Я Мунай — виртуальный ассистент С-Мунай. Чем могу помочь?",
  en: "Hello! I'm Munai, the S-Munai virtual assistant. How can I help?",
};

export function SupportChat() {
  const lang = "ru"; 
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
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
               
               if (!leadSent && answer.includes("[/LEAD]")) {
                 const leadMatch = answer.match(/\[LEAD\]([\s\S]*?)\[\/LEAD\]/);
                 if (leadMatch && leadMatch[1]) {
                   try {
                     const parsedLead = JSON.parse(leadMatch[1]);
                     fetch("https://smunai-lead-service.vercel.app/api/v1/leads", {
                       method: "POST",
                       headers: { "Content-Type": "application/json" },
                       body: JSON.stringify(parsedLead),
                     }).catch(console.error);
                     leadSent = true;
                   } catch (err) {
                     console.error("Failed to parse lead JSON:", err);
                   }
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
            <p className="text-[15px] font-semibold tracking-tight text-foreground">Мунай</p>
            <p className="text-xs text-muted-foreground">Ассистент С-Мунай</p>
          </div>
          <button 
            onClick={() => {
              if (messages.length > 0 && confirm("Очистить историю чата?")) {
                localStorage.removeItem("smunai_chat_history");
                setMessages([]);
              } else {
                setOpen(false);
              }
            }} 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-foreground transition-colors hover:bg-primary/20" 
            aria-label="Очистить или закрыть"
            title="Очистить историю"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5 scrollbar-hide">
          <Bubble role="model" text={GREETING[lang]} />
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} text={m.text} typing={busy && i === messages.length - 1 && m.text === ""} />
          ))}
        </div>

        <div className="border-t border-primary/5 p-4">
          <div className="flex items-end gap-2 rounded-3xl bg-primary/5 p-1.5 pl-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Спросите что-нибудь..."
              className="flex-1 bg-transparent py-2.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={send}
              disabled={!input.trim() || busy}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform enabled:hover:scale-105 disabled:opacity-40"
              aria-label="Отправить"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
        aria-label="Чат поддержки"
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
              <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: `${d}ms` }} />
            ))}
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
