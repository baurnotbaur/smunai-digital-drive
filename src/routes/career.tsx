import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads";
import { formatKzPhone } from "@/lib/utils";
import { ChevronLeft, Briefcase, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Карьера в С-Мунай — Присоединяйтесь к нашей команде" },
      { name: "description", content: "Работа в сети АЗС С-Мунай. Актуальные вакансии: кассиры, операторы, водители, менеджеры." },
    ],
  }),
  component: CareerPage,
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
  position: z.string({ required_error: "Пожалуйста, выберите желаемую должность." }),
  experience: z.string().optional(),
});

function CareerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      position: "",
      experience: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e?: React.BaseSyntheticEvent) {
    try {
      setIsSubmitting(true);
      
      const hp = e?.target?._hp?.value || "";
      
      await submitLead({
        name: values.name,
        phone: values.phone,
        comment: values.experience ? `Опыт работы: ${values.experience}` : "Опыт работы: не указан",
        extra: {
          position: values.position,
        },
        type: "hr",
        form_id: "hr_career_form",
        _hp: hp
      });

      toast.success("Ваша заявка успешно отправлена!", {
        description: "Наш HR-менеджер свяжется с вами в ближайшее время.",
      });
      
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка", {
        description: "Не удалось отправить заявку. Попробуйте еще раз позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-linear-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] -z-10" />

      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-3 sm:py-4">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary/5 p-2 text-primary transition-colors hover:bg-primary/10">
            <ChevronLeft className="size-5" />
          </Link>
          <img
            src="/images/logo-navbar.svg"
            alt="С-МУНАЙ"
            className="h-7 w-auto object-contain sm:h-8"
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-5 py-12">
        <div className="w-full max-w-xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold-foreground mb-4">
              <Briefcase className="size-3.5" />
              Команда С-Мунай
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary font-display mb-4">
              Карьера в С-Мунай
            </h1>
            <p className="text-foreground/70 max-w-md mx-auto font-medium">
              Присоединяйтесь к команде первой сети АЗС в регионе. Мы ценим ответственность, профессионализм и желание развиваться.
            </p>
          </div>

          <div className="soft-card p-6 sm:p-8 bg-background/80 backdrop-blur-md shadow-xl border-primary/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Honeypot field for bot protection */}
                <input type="text" name="_hp" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 font-medium">Ваше имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Азамат Сериков" className="bg-background/50 focus-visible:ring-primary/30" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500/90 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 font-medium">Телефон</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+7 (707) 000-00-00" 
                          className="bg-background/50 focus-visible:ring-primary/30" 
                          maxLength={18}
                          {...field}
                          onChange={(e) => {
                            const formatted = formatKzPhone(e.target.value);
                            e.target.value = formatted; // Force DOM update for React Hook Form bug
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500/90 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 font-medium">Желаемая должность</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50 focus-visible:ring-primary/30">
                            <SelectValue placeholder="Выберите должность" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Кассир">Кассир</SelectItem>
                          <SelectItem value="Оператор АЗС">Оператор АЗС</SelectItem>
                          <SelectItem value="Водитель бензовоза">Водитель бензовоза</SelectItem>
                          <SelectItem value="Менеджер">Менеджер</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500/90 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 font-medium">Опыт работы</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Расскажите кратко о вашем опыте работы..." 
                          className="min-h-[100px] resize-none bg-background/50 focus-visible:ring-primary/30" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500/90 text-xs" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 font-bold text-base shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Отправка...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="size-4" />
                      <span>Отправить заявку</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
