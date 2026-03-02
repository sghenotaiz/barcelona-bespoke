import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/i18n/LanguageContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ACTIVITY_KEYS = [
"nightclubs",
"restaurants",
"jetSkis",
"sportsActivities",
"poolParties",
"other"] as
const;

const BookingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const [arrivalDate, setArrivalDate] = useState<Date>();
  const [departureDate, setDepartureDate] = useState<Date>();
  const [people, setPeople] = useState("");
  const [activities, setActivities] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleActivity = (key: string) =>
  setActivities((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedActivities = ACTIVITY_KEYS.filter((k) => activities[k]).
    map((k) => (t.booking as Record<string, string>)[k]).
    join(", ");

    const body = [
    `Arrival: ${arrivalDate ? format(arrivalDate, "PPP") : "N/A"}`,
    departureDate ? `Departure: ${format(departureDate, "PPP")}` : null,
    `People: ${people}`,
    `Activities: ${selectedActivities || "None"}`,
    activities.other && otherText ? `Other request: ${otherText}` : null,
    `Email: ${email}`,
    notes ? `Notes: ${notes}` : null].

    filter(Boolean).
    join("\n");

    const subject = encodeURIComponent("VIP Booking Request — NightDreams Barcelona");
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:hello@nightdreamsbarcelona.com?subject=${subject}&body=${encodedBody}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-24 md:py-32 bg-[hsl(0,0%,0%)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center">

            <CheckCircle className="w-16 h-16 text-silver mx-auto mb-6" strokeWidth={1.2} />
            <h3 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
              {t.booking.successTitle}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {t.booking.successMessage}
            </p>
          </motion.div>
        </div>
      </section>);

  }

  return (
    <section id="booking" className="py-24 bg-[hsl(0,0%,0%)] md:py-[50px] border border-gold-dark">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.booking.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.booking.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.booking.titleLine2}</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            {t.booking.description}
          </p>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-8">

          {/* Date Pickers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {t.booking.arrivalDate} *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center gap-3 border border-border px-4 py-3 font-body text-sm text-left transition-colors hover:border-silver",
                      !arrivalDate && "text-muted-foreground"
                    )}>

                    <CalendarIcon className="w-4 h-4 text-silver" />
                    {arrivalDate ? format(arrivalDate, "PPP") : t.booking.pickDate}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={arrivalDate}
                    onSelect={setArrivalDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto" />

                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {t.booking.departureDate}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center gap-3 border border-border px-4 py-3 font-body text-sm text-left transition-colors hover:border-silver",
                      !departureDate && "text-muted-foreground"
                    )}>

                    <CalendarIcon className="w-4 h-4 text-silver" />
                    {departureDate ? format(departureDate, "PPP") : t.booking.pickDate}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < (arrivalDate || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto" />

                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Number of People */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {t.booking.numberOfPeople} *
            </label>
            <input
              type="number"
              min="1"
              required
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder={t.booking.peoplePlaceholder}
              className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors" />

          </div>

          {/* Activities */}
          <div className="space-y-4">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground block">
              {t.booking.activities} *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ACTIVITY_KEYS.map((key) =>
              <button
                key={key}
                type="button"
                onClick={() => toggleActivity(key)}
                className={cn(
                  "flex items-center gap-3 border px-4 py-3 font-body text-sm transition-all duration-200",
                  activities[key] ?
                  "border-silver bg-silver/10 text-foreground" :
                  "border-border text-muted-foreground hover:border-silver/50"
                )}>

                  <span
                  className={cn(
                    "w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors",
                    activities[key] ? "border-silver bg-silver" : "border-muted-foreground/30"
                  )}>

                    {activities[key] &&
                  <svg className="w-3 h-3 text-background" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                  }
                  </span>
                  {(t.booking as Record<string, string>)[key]}
                </button>
              )}
            </div>

            {activities.other &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}>

                <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder={t.booking.otherPlaceholder}
                className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors" />

              </motion.div>
            }
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {t.booking.email} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.booking.emailPlaceholder}
              className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors" />

          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {t.booking.notes}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.booking.notesPlaceholder}
              className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors resize-none" />

          </div>

          {/* Submit */}
          <div className="text-center pt-4 space-y-4">
            <button
              type="submit"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-background transition-all duration-300 bg-muted-foreground text-left font-medium px-[40px] py-[15px]">
              <Send size={14} />
              {t.booking.submit}
            </button>

            <div>
              <a
                href="https://wa.me/393494104470"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-white transition-all duration-300 font-medium px-[40px] py-[15px] rounded-md"
                style={{ backgroundColor: "hsl(142, 70%, 45%)" }}
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.06-1.94A15.924 15.924 0 0016.004 32C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.616c-.39 1.1-1.932 2.012-3.172 2.278-.848.18-1.956.324-5.684-1.222-4.772-1.976-7.838-6.82-8.074-7.138-.228-.318-1.906-2.54-1.906-4.844s1.208-3.436 1.636-3.906c.39-.428.914-.608 1.216-.608.15 0 .284.008.406.014.428.018.642.044.924.716.354.842 1.216 2.96 1.32 3.178.106.218.21.512.064.822-.138.318-.258.458-.476.708-.218.25-.424.442-.642.71-.2.236-.422.488-.178.916.244.428 1.082 1.786 2.324 2.894 1.596 1.424 2.942 1.866 3.36 2.072.42.206.664.178.908-.106.252-.292 1.076-1.252 1.362-1.682.28-.428.566-.358.952-.214.39.138 2.468 1.164 2.89 1.376.42.214.702.318.806.5.1.178.1 1.044-.29 2.144z" />
                </svg>
                {t.whatsapp.contactUs}
              </a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>);

};

export default BookingSection;