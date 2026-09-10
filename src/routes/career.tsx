import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads";
import { formatKzPhone } from "@/lib/utils";
import { ChevronLeft, Briefcase, Send, ArrowLeft, Mail } from "lucide-react";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n";

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
  name: z.string().min(2, { message: "Минимум 2 символа." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
  position: z.string().min(1, { message: "Пожалуйста, выберите должность." }),
  experience: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных"),
});

function CareerPage() {
  const { lang } = useLanguage();
  const isKz = lang === "kz";
  const isEn = lang === "en";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      position: "",
      experience: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e?: React.BaseSyntheticEvent) {
    try {
      setIsSubmitting(true);
      
      const hp = e?.target?._hp?.value || "";
      
      await submitLead({
        name: values.name,
        phone: values.phone,
        comment: values.experience ? `Опыт: ${values.experience}` : "Опыт не указан",
        extra: {
          position: values.position,
          data_consent: values.consent,
        },
        type: "hr",
        form_id: "hr_career_form",
        _hp: hp
      });

      toast.success(
        isKz ? "Өтінішіңіз сәтті жіберілді!" : isEn ? "Application submitted successfully!" : "Ваша заявка успешно отправлена!",
        {
          description: isKz ? "Біздің HR-менеджер жақын арада сізбен байланысады." : isEn ? "Our HR manager will get in touch with you shortly." : "Наш HR-менеджер свяжется с вами в ближайшее время.",
        }
      );
      
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(
        isKz ? "Қате орын алды" : isEn ? "An error occurred" : "Произошла ошибка",
        {
          description: isKz ? "Өтінім жіберілмеді. Кейінірек қайталап көріңіз." : isEn ? "Failed to send application. Please try again later." : "Не удалось отправить заявку. Попробуйте еще раз позже.",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col relative overflow-hidden">

      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-primary/5 p-2 text-primary transition-colors hover:bg-primary/10"
              title={isKz ? "Басты бетке" : isEn ? "Back to Home" : "На главную"}
            >
              <ArrowLeft className="size-4 sm:size-5" />
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

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary-deeper text-white">
        <picture>
          <source srcSet="/images/station-hero.webp" type="image/webp" />
          <img
            src="/images/station-hero.jpg"
            alt="АЗС С-Мунай"
            className="absolute inset-0 size-full object-cover object-[35%_center]"
            fetchPriority="high"
          />
        </picture>
        <div
          className="absolute inset-0 bg-linear-to-t from-primary-deeper/95 via-primary-deeper/35 to-primary-deeper/5"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[50dvh] max-w-4xl flex-col justify-end px-5 pt-20 pb-12 sm:pb-16">
          <p className="inline-flex items-center gap-2 font-serif text-xl italic text-gold-bright sm:text-2xl">
            <Briefcase className="size-5" aria-hidden="true" />
            {isKz ? "С-Мұнай командасы" : isEn ? "S-Munai Team" : "Команда С-Мунай"}
          </p>
          <h1 className="display-hero mt-3 max-w-3xl text-3xl text-white sm:text-5xl md:text-6xl">
            {isKz ? "С-Мұнайдағы мансап" : isEn ? "Careers at S-Munai" : "Карьера в С-Мунай"}
          </h1>
          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
            {isKz
              ? "Өңірдегі алғашқы АЗС желісінің командасына қосылыңыз. Біз жауапкершілікті, кәсібилікті және бірге дамуды бағалаймыз."
              : isEn
              ? "Join the team of the region's pioneering gas station network. We value responsibility, professionalism, and team growth."
              : "Присоединяйтесь к команде первой сети АЗС в регионе. Мы ценим ответственность, профессионализм и желание развиваться."}
          </p>
        </div>
      </section>

      <main className="flex-1 flex items-center justify-center p-5 py-14 sm:py-20">
        <div className="w-full max-w-xl">
          <div className="soft-card p-6 sm:p-8 shadow-xl border-primary/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Honeypot field for bot protection */}
                <input type="text" name="_hp" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 font-medium">
                        {isKz ? "Сіздің аты-жөніңіз" : isEn ? "Full Name" : "Ваше имя"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={isKz ? "Азамат Серіков" : isEn ? "John Doe" : "Азамат Сериков"} className="bg-background/50 focus-visible:ring-primary/30" {...field} />
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
                      <FormLabel className="text-foreground/90 font-medium">
                        {isKz ? "Телефон нөмірі" : isEn ? "Phone Number" : "Телефон"}
                      </FormLabel>
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
                      <FormLabel className="text-foreground/90 font-medium">
                        {isKz ? "Қажетті лауазым" : isEn ? "Desired Position" : "Желаемая должность"}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50 focus-visible:ring-primary/30">
                            <SelectValue placeholder={isKz ? "Лауазымды таңдаңыз" : isEn ? "Select a position" : "Выберите должность"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Кассир">{isKz ? "АЗС кассирі" : isEn ? "Station Cashier" : "Кассир АЗС"}</SelectItem>
                          <SelectItem value="Оператор АЗС">{isKz ? "ЖҚС / АЗС операторы" : isEn ? "Fuel Station Operator" : "Оператор АЗС"}</SelectItem>
                          <SelectItem value="Водитель бензовоза">{isKz ? "Бензовоз жүргізушісі" : isEn ? "Fuel Tanker Driver" : "Водитель бензовоза"}</SelectItem>
                          <SelectItem value="Менеджер">{isKz ? "Менеджер / Әкімші" : isEn ? "Office / Station Manager" : "Менеджер / Администратор"}</SelectItem>
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
                      <FormLabel className="text-foreground/90 font-medium">
                        {isKz ? "Жұмыс тәжірибесі" : isEn ? "Work Experience" : "Опыт работы"}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={isKz ? "Жұмыс тәжірибеңіз бен дағдыларыңыз туралы қысқаша жазыңыз..." : isEn ? "Tell us briefly about your experience and skills..." : "Расскажите кратко о вашем опыте работы..."}
                          className="min-h-[100px] resize-none bg-background/50 focus-visible:ring-primary/30" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500/90 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2.5 space-y-0 p-1">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="mt-0.5 size-4 shrink-0 rounded accent-gold cursor-pointer"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-tight">
                        <FormLabel className="text-xs font-normal text-foreground/80 cursor-pointer">
                          {isKz ? (
                            <>
                              Мен «С-Мұнай» ЖШС-не дербес деректерімді жинауға және өңдеуге келісім беремін{" "}
                              <Link to="/privacy" className="text-primary font-medium underline hover:text-primary/80">
                                Құпиялылық саясатына
                              </Link>{" "}
                              сәйкес. <span className="text-red-500">*</span>
                            </>
                          ) : isEn ? (
                            <>
                              I consent to the collection and processing of my personal data by S-Munai LLP under the{" "}
                              <Link to="/privacy" className="text-primary font-medium underline hover:text-primary/80">
                                Privacy Policy
                              </Link>
                              . <span className="text-red-500">*</span>
                            </>
                          ) : (
                            <>
                              Я даю согласие ТОО «С-Мунай» на сбор и обработку моих персональных данных в соответствии с{" "}
                              <Link to="/privacy" className="text-primary font-medium underline hover:text-primary/80">
                                Политикой конфиденциальности
                              </Link>
                              . <span className="text-red-500">*</span>
                            </>
                          )}
                        </FormLabel>
                        <FormMessage className="text-red-500/90 text-xs" />
                      </div>
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
                      <span>{isKz ? "Жіберілуде..." : isEn ? "Submitting..." : "Отправка..."}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="size-4" />
                      <span>{isKz ? "Өтінімді жіберу" : isEn ? "Submit Application" : "Отправить заявку"}</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="hero-surface border-t border-white/10 py-8 text-white/70 text-xs">
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
            <Link to="/privacy" className="hover:text-gold transition-colors">{isKz ? "Құпиялылық" : isEn ? "Privacy" : "Конфиденциальность"}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
