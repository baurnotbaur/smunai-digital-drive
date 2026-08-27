import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/leads";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrivacyPolicyModal } from "@/components/site/PrivacyPolicyModal";
import { CheckCircle2, AlertCircle, Loader2, Send, CreditCard, Ticket, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type B2BLeadFormProps = {
  formId?: string;
  className?: string;
  darkTheme?: boolean;
  defaultProduct?: "cards" | "vouchers" | "both";
};

export function B2BLeadForm({
  formId = "b2b_home_form",
  className = "",
  darkTheme = false,
  defaultProduct = "both",
}: B2BLeadFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<"cards" | "vouchers" | "both">(defaultProduct);
  const [isBusy, setIsBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { t } = useLanguage();
  const f = t.form;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setIsBusy(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const org = String(formData.get("org") || "").trim();
    const userComment = String(formData.get("comment") || "").trim();
    const marketingConsent = formData.get("marketingConsent") === "on";
    const dataConsent = formData.get("dataConsent") === "on";

    if (!dataConsent) {
      setErrorMsg(f.requiredError);
      setIsBusy(false);
      return;
    }

    const productNames = {
      cards: f.productCards,
      vouchers: f.productVouchers,
      both: f.productBoth,
    };
    const productTag = `[Интерес: ${productNames[selectedProduct]}]`;
    const fullComment = userComment ? `${productTag} ${userComment}` : productTag;

    try {
      await submitLead({
        name,
        phone,
        org,
        comment: fullComment,
        consent: marketingConsent,
        form_id: formId,
      });

      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setErrorMsg(err?.message || "Error submitting form. Please try again.");
    } finally {
      setIsBusy(false);
    }
  }

  if (success) {
    return (
      <div
        className={`rounded-2xl p-6 sm:p-8 text-center transition-all ${
          darkTheme
            ? "bg-primary text-primary-foreground border border-primary-foreground/15"
            : "soft-card border border-primary/20 bg-primary/5"
        } ${className}`}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/20 text-gold">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-4 text-xl font-bold font-display">{f.successTitle}</h3>
        <p
          className={`mt-2 text-sm max-w-md mx-auto ${
            darkTheme ? "text-primary-foreground/80" : "text-foreground/75"
          }`}
        >
          {f.successDesc}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn-base btn-gold mt-6 !py-2 !px-6 !text-xs font-semibold"
        >
          {f.submitAgain}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-6 sm:p-8 transition-all ${
        darkTheme
          ? "bg-primary text-primary-foreground"
          : "soft-card border border-primary/15 bg-card"
      } ${className}`}
    >
      <div className="border-b border-current/10 pb-4 mb-5">
        <h3 className="font-display text-xl font-bold tracking-wide">
          {f.title}
        </h3>
        <p
          className={`mt-1 text-xs sm:text-sm ${
            darkTheme ? "text-primary-foreground/70" : "text-foreground/65"
          }`}
        >
          {f.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {/* Выбор продукта: Карты / Талоны / Всё */}
        <div className="space-y-1.5">
          <Label
            className={`text-xs font-semibold uppercase tracking-wider ${
              darkTheme ? "text-primary-foreground/80" : "text-foreground/80"
            }`}
          >
            {f.productLabel}
          </Label>
          <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-current/15 p-1 bg-current/5">
            <button
              type="button"
              onClick={() => setSelectedProduct("cards")}
              className={`flex items-center justify-center gap-1 rounded-lg py-1.5 px-2 text-[11px] font-semibold transition-all ${
                selectedProduct === "cards"
                  ? "bg-gold text-gold-foreground shadow-xs font-bold"
                  : darkTheme
                  ? "text-primary-foreground/75 hover:bg-white/10"
                  : "text-foreground/75 hover:bg-primary/10"
              }`}
            >
              <CreditCard className="size-3" />
              {f.productCards}
            </button>
            <button
              type="button"
              onClick={() => setSelectedProduct("vouchers")}
              className={`flex items-center justify-center gap-1 rounded-lg py-1.5 px-2 text-[11px] font-semibold transition-all ${
                selectedProduct === "vouchers"
                  ? "bg-gold text-gold-foreground shadow-xs font-bold"
                  : darkTheme
                  ? "text-primary-foreground/75 hover:bg-white/10"
                  : "text-foreground/75 hover:bg-primary/10"
              }`}
            >
              <Ticket className="size-3" />
              {f.productVouchers}
            </button>
            <button
              type="button"
              onClick={() => setSelectedProduct("both")}
              className={`flex items-center justify-center gap-1 rounded-lg py-1.5 px-2 text-[11px] font-semibold transition-all ${
                selectedProduct === "both"
                  ? "bg-gold text-gold-foreground shadow-xs font-bold"
                  : darkTheme
                  ? "text-primary-foreground/75 hover:bg-white/10"
                  : "text-foreground/75 hover:bg-primary/10"
              }`}
            >
              <Sparkles className="size-3" />
              {f.productBoth}
            </button>
          </div>
        </div>

        {/* Имя */}
        <div className="space-y-1.5">
          <Label
            htmlFor={`${formId}-name`}
            className={`text-xs font-semibold uppercase tracking-wider ${
              darkTheme ? "text-primary-foreground/80" : "text-foreground/80"
            }`}
          >
            {f.nameLabel} <span className="text-terracotta">*</span>
          </Label>
          <Input
            id={`${formId}-name`}
            name="name"
            required
            disabled={isBusy}
            placeholder={f.namePlaceholder}
            className={
              darkTheme
                ? "border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                : "border-primary/20 bg-background text-foreground placeholder:text-foreground/40 focus:border-primary"
            }
          />
        </div>

        {/* Телефон */}
        <div className="space-y-1.5">
          <Label
            htmlFor={`${formId}-phone`}
            className={`text-xs font-semibold uppercase tracking-wider ${
              darkTheme ? "text-primary-foreground/80" : "text-foreground/80"
            }`}
          >
            {f.phoneLabel} <span className="text-terracotta">*</span>
          </Label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            disabled={isBusy}
            placeholder={f.phonePlaceholder}
            className={
              darkTheme
                ? "border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                : "border-primary/20 bg-background text-foreground placeholder:text-foreground/40 focus:border-primary"
            }
          />
        </div>

        {/* Организация */}
        <div className="space-y-1.5">
          <Label
            htmlFor={`${formId}-org`}
            className={`text-xs font-semibold uppercase tracking-wider ${
              darkTheme ? "text-primary-foreground/80" : "text-foreground/80"
            }`}
          >
            {f.orgLabel} <span className="text-terracotta">*</span>
          </Label>
          <Input
            id={`${formId}-org`}
            name="org"
            required
            disabled={isBusy}
            placeholder={f.orgPlaceholder}
            className={
              darkTheme
                ? "border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                : "border-primary/20 bg-background text-foreground placeholder:text-foreground/40 focus:border-primary"
            }
          />
        </div>

        {/* Дополнительно */}
        <div className="space-y-1.5">
          <Label
            htmlFor={`${formId}-comment`}
            className={`text-xs font-semibold uppercase tracking-wider ${
              darkTheme ? "text-primary-foreground/80" : "text-foreground/80"
            }`}
          >
            {f.commentLabel}
          </Label>
          <Input
            id={`${formId}-comment`}
            name="comment"
            disabled={isBusy}
            placeholder={f.commentPlaceholder}
            className={
              darkTheme
                ? "border-primary-foreground/20 bg-primary/40 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                : "border-primary/20 bg-background text-foreground placeholder:text-foreground/40 focus:border-primary"
            }
          />
        </div>

        {/* Чекбоксы согласий */}
        <div className="pt-2 space-y-2.5">
          {/* Обязательное согласие на обработку персональных данных */}
          <label className="flex items-start gap-2.5 text-xs cursor-pointer select-none">
            <input
              type="checkbox"
              name="dataConsent"
              required
              defaultChecked
              disabled={isBusy}
              className="mt-0.5 size-4 shrink-0 rounded accent-gold"
            />
            <span
              className={darkTheme ? "text-primary-foreground/85" : "text-foreground/80"}
            >
              {f.dataConsentText}{" "}
              <PrivacyPolicyModal
                triggerText={f.privacyLink}
                className={darkTheme ? "text-gold font-medium" : "text-primary font-medium"}
              />
              . <span className="text-terracotta">*</span>
            </span>
          </label>

          {/* Маркетинговое согласие */}
          <label className="flex items-start gap-2.5 text-xs cursor-pointer select-none">
            <input
              type="checkbox"
              name="marketingConsent"
              defaultChecked
              disabled={isBusy}
              className="mt-0.5 size-4 shrink-0 rounded accent-gold"
            />
            <span
              className={darkTheme ? "text-primary-foreground/70" : "text-foreground/65"}
            >
              {f.marketingConsentText}
            </span>
          </label>
        </div>

        {/* Ошибка */}
        {errorMsg && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/15 p-3 text-xs text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isBusy}
          className="btn-base btn-gold w-full mt-3 !py-3 font-bold flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
        >
          {isBusy ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {f.submittingBtn}
            </>
          ) : (
            <>
              <Send className="size-4" />
              {f.submitBtn}
            </>
          )}
        </button>

        <p
          className={`text-center text-[11px] ${
            darkTheme ? "text-primary-foreground/50" : "text-foreground/50"
          }`}
        >
          {f.privacyNote}
        </p>
      </div>
    </form>
  );
}
