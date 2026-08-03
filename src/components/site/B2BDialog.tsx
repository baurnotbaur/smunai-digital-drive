import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function B2BDialog() {
  const [sent, setSent] = useState(false);

  return (
    <Dialog onOpenChange={() => setSent(false)}>
      <DialogTrigger className="btn-base btn-gold">Оставить заявку</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">Заявка на топливные карты</DialogTitle>
          <DialogDescription>
            Заполните форму — мы свяжемся с вами и обсудим условия.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="b2b-name">Имя</Label>
            <Input id="b2b-name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b2b-company">Компания</Label>
            <Input id="b2b-company" name="company" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b2b-phone">Телефон</Label>
            <Input id="b2b-phone" name="phone" type="tel" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b2b-comment">Комментарий</Label>
            <Textarea id="b2b-comment" name="comment" rows={3} />
          </div>
          <button type="submit" className="btn-base btn-gold w-full">
            Отправить
          </button>
          <p aria-live="polite" className="min-h-5 text-sm text-primary">
            {sent ? "Заявка заполнена. Отправка будет подключена позже." : ""}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
