import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, KeyRound } from "lucide-react";

export const Route = createFileRoute("/admin/auth")({
  component: AdminAuthPage,
});

function AdminAuthPage() {
  const navigate = useNavigate({ from: "/admin/auth" });
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const urlToken = searchParams.get("token");
  
  const [view, setView] = useState<"login" | "forgot" | "reset">(
    urlToken ? "reset" : "login"
  );
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsBusy(true);
    setMessage(null);
    setTimeout(() => {
      setIsBusy(false);
      setMessage({ type: "error", text: "Неверный email или пароль." });
    }, 1500);
  }

  async function handleForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsBusy(true);
    setMessage(null);
    setTimeout(() => {
      setIsBusy(false);
      setMessage({ type: "success", text: "Ссылка для сброса отправлена на ваш email." });
    }, 1500);
  }

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsBusy(true);
    setMessage(null);
    setTimeout(() => {
      setIsBusy(false);
      setMessage({ type: "success", text: "Пароль успешно изменен. Теперь вы можете войти." });
      setTimeout(() => {
        navigate({ search: {} });
        setView("login");
        setMessage(null);
      }, 2000);
    }, 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md soft-card p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            {view === "login" ? <Lock className="size-6" /> : <KeyRound className="size-6" />}
          </div>
          <h1 className="font-display text-2xl font-bold text-primary">
            {view === "login" && "Вход в панель"}
            {view === "forgot" && "Восстановление пароля"}
            {view === "reset" && "Новый пароль"}
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            {view === "login" && "Введите email и пароль администратора."}
            {view === "forgot" && "Мы отправим ссылку для сброса на ваш email."}
            {view === "reset" && "Придумайте новый безопасный пароль."}
          </p>
        </div>

        {message && (
          <div className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            message.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
          }`}>
            {message.text}
          </div>
        )}

        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" required disabled={isBusy} placeholder="admin@smunai.kz" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Пароль</Label>
                <button
                  type="button"
                  onClick={() => { setView("forgot"); setMessage(null); }}
                  className="text-xs font-semibold text-terracotta hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>
              <Input id="login-password" type="password" required disabled={isBusy} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={isBusy} className="btn-base bg-primary text-primary-foreground w-full mt-2 inline-flex items-center justify-center gap-2">
              {isBusy && <Loader2 className="size-4 animate-spin" />}
              Войти
            </button>
          </form>
        )}

        {view === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="forgot-email">Email</Label>
              <Input id="forgot-email" type="email" required disabled={isBusy} placeholder="admin@smunai.kz" />
            </div>
            <button type="submit" disabled={isBusy} className="btn-base bg-primary text-primary-foreground w-full mt-2 inline-flex items-center justify-center gap-2">
              {isBusy && <Loader2 className="size-4 animate-spin" />}
              Получить ссылку
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => { setView("login"); setMessage(null); }}
              className="mt-4 w-full text-center text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Вернуться ко входу
            </button>
          </form>
        )}

        {view === "reset" && (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="reset-password">Новый пароль</Label>
              <Input id="reset-password" type="password" required disabled={isBusy} placeholder="Минимум 8 символов" minLength={8} />
            </div>
            <button type="submit" disabled={isBusy} className="btn-base bg-primary text-primary-foreground w-full mt-2 inline-flex items-center justify-center gap-2">
              {isBusy && <Loader2 className="size-4 animate-spin" />}
              Сохранить пароль
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
