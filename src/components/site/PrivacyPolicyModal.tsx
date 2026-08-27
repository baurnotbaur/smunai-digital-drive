import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function PrivacyPolicyModal({
  triggerText,
  className = "",
}: {
  triggerText?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const p = t.privacyModal;

  const displayTrigger = triggerText || t.form.privacyLink;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`underline underline-offset-2 hover:text-gold transition-colors ${className}`}
      >
        {displayTrigger}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto p-6 sm:p-8">
          <DialogHeader>
            <div className="flex items-center gap-2.5 text-primary">
              <ShieldCheck className="size-6 text-gold" />
              <DialogTitle className="text-xl font-bold font-display">
                {p.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-foreground/60 mt-1">
              {p.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/80 divide-y divide-primary/10">
            <section className="pt-3 first:pt-0">
              <h4 className="font-semibold text-primary">{p.sec1Title}</h4>
              <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                {p.sec1Text}
              </p>
            </section>

            <section className="pt-3">
              <h4 className="font-semibold text-primary">{p.sec2Title}</h4>
              <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                {p.sec2Text}
              </p>
              <ul className="mt-1.5 list-disc pl-5 text-xs text-foreground/75 space-y-1">
                {p.sec2List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="pt-3">
              <h4 className="font-semibold text-primary">{p.sec3Title}</h4>
              <ul className="mt-1.5 list-disc pl-5 text-xs text-foreground/75 space-y-1">
                {p.sec3List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="pt-3">
              <h4 className="font-semibold text-primary">{p.sec4Title}</h4>
              <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                {p.sec4Text}
              </p>
            </section>

            <section className="pt-3">
              <h4 className="font-semibold text-primary">{p.sec5Title}</h4>
              <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                {p.sec5Text}
              </p>
            </section>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-base btn-gold !py-1.5 !px-5 !text-xs font-semibold"
            >
              {p.closeBtn}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
