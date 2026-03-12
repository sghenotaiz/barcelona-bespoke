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
  "poolParties",
  "jetSkis",
  "restaurants",
  "apartments",
  "other",
] as const;

const BookingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date>();
  const [departureDate, setDepartureDate] = useState<Date>();
  const [people, setPeople] = useState("");
  const [email, setEmail] = useState("");
  const [activities, setActivities] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const booking = t.booking as Record<string, string>;

  const toggleActivity = (key: string) =>
    setActivities((prev) => ({ ...prev, [key]: !prev[key] }));

  const getSelectedActivities = () => {
    return ACTIVITY_KEYS.filter((k) => activities[k])
      .map((k) => booking[k])
      .join(", ");
  };

  const buildBody = () => {
    return [
      `Nome: ${name}`,
      `Data di arrivo: ${arrivalDate ? format(arrivalDate, "PPP") : "N/A"}`,
      `Data di ripartenza: ${departureDate ? format(departureDate, "PPP") : "N/A"}`,
      `Numero persone: ${people}`,
      `Indirizzo email: ${email}`,
      `Attività: ${getSelectedActivities() || "Nessuna"}`,
      activities.other && otherText ? `Richiesta speciale: ${otherText}` : null,
      `Come ci hai conosciuto: ${source ? source.toUpperCase() : "N/A"}`,
      notes ? `Note aggiuntive: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window.gtag === "function") {
      window.gtag("event", "prenotazione_submit", { method: "email" });
    }
    const subject = encodeURIComponent("Nuova Prenotazione NightDreams");
    const encodedBody = encodeURIComponent(buildBody());
    window.location.href = `mailto:nightdreamsbarcelona@gmail.com?subject=${subject}&body=${encodedBody}`;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", { source: "booking_form" });
    }
    const waBody = [
      "🆕 NUOVA PRENOTAZIONE",
      `Nome: ${name}`,
      `Arrivo: ${arrivalDate ? format(arrivalDate, "PPP") : "N/A"}`,
      `Ripartenza: ${departureDate ? format(departureDate, "PPP") : "N/A"}`,
      `Persone: ${people}`,
      `Email: ${email}`,
      `Attività: ${getSelectedActivities() || "Nessuna"}`,
      activities.other && otherText ? `Richiesta: ${otherText}` : null,
      `Origine: ${source || "N/A"}`,
      notes ? `Note: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/393494104470?text=${encodeURIComponent(waBody)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            <CheckCircle className="w-16 h-16 text-silver mx-auto mb-6" strokeWidth={1.2} />
            <h3 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
              {booking.successTitle}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {booking.successMessage}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors";

  return (
    <section id="booking" className="py-24 bg-background md:py-[40px]">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {booking.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {booking.titleLine1}{" "}
            <span className="italic text-silver-gradient">{booking.titleLine2}</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            {booking.description}
          </p>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <motion.form
          onSubmit={handleEmailSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* 1. Nome Completo */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {booking.fullName} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={booking.fullNamePlaceholder}
              className={inputClass}
            />
          </div>

          {/* 2-3. Date Pickers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {booking.arrivalDate} *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center gap-3 border border-border px-4 py-3 font-body text-sm text-left transition-colors hover:border-silver",
                      !arrivalDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 text-silver" />
                    {arrivalDate ? format(arrivalDate, "PPP") : booking.pickDate}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={arrivalDate}
                    onSelect={setArrivalDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {booking.departureDate} *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center gap-3 border border-border px-4 py-3 font-body text-sm text-left transition-colors hover:border-silver",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 text-silver" />
                    {departureDate ? format(departureDate, "PPP") : booking.pickDate}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < (arrivalDate || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* 4. Numero persone */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {booking.numberOfPeople} *
            </label>
            <input
              type="number"
              min="1"
              required
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder={booking.peoplePlaceholder}
              className={inputClass}
            />
          </div>

          {/* 5. Email */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {booking.email} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={booking.emailPlaceholder}
              className={inputClass}
            />
          </div>

          {/* 6. Attività toggle buttons */}
          <div className="space-y-4">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground block">
              {booking.activities} *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ACTIVITY_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleActivity(key)}
                  className={cn(
                    "flex items-center gap-3 border px-4 py-3 font-body text-sm transition-all duration-200",
                    activities[key]
                      ? "border-silver bg-silver/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-silver/50"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors",
                      activities[key] ? "border-silver bg-silver" : "border-muted-foreground/30"
                    )}
                  >
                    {activities[key] && (
                      <svg className="w-3 h-3 text-background" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {booking[key]}
                </button>
              ))}
            </div>

            {activities.other && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder={booking.otherPlaceholder}
                  className={inputClass}
                />
              </motion.div>
            )}
          </div>

          {/* 7. Come ci hai conosciuto */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {booking.howDidYouFind} *
            </label>
            <select
              required
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={cn(
                inputClass,
                "appearance-none cursor-pointer",
                !source && "text-muted-foreground"
              )}
            >
              <option value="" disabled className="bg-background text-muted-foreground">
                {booking.howDidYouFindPlaceholder}
              </option>
              <option value="instagram" className="bg-background text-foreground">{booking.sourceInstagram}</option>
              <option value="tiktok" className="bg-background text-foreground">{booking.sourceTiktok}</option>
              <option value="google" className="bg-background text-foreground">{booking.sourceGoogle}</option>
              <option value="amici" className="bg-background text-foreground">{booking.sourceFriends}</option>
              <option value="promoter" className="bg-background text-foreground">{booking.sourcePromoter}</option>
              <option value="altro" className="bg-background text-foreground">{booking.sourceOther}</option>
            </select>
          </div>

          {/* 8. Note */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {booking.notes}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={booking.notesPlaceholder}
              className={cn(inputClass, "resize-none")}
            />
          </div>

          {/* Buttons */}
          <div className="text-center pt-4 space-y-4">
            <button
              type="submit"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-background transition-all duration-300 bg-muted-foreground font-medium px-[40px] py-[15px]"
            >
              <Send size={14} />
              {booking.submitEmail}
            </button>

            <div>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-background transition-all duration-300 font-medium px-[40px] py-[15px] bg-green-400"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.06-1.94A15.924 15.924 0 0016.004 32C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.616c-.39 1.1-1.932 2.012-3.172 2.278-.848.18-1.956.324-5.684-1.222-4.772-1.976-7.838-6.82-8.074-7.138-.228-.318-1.906-2.54-1.906-4.844s1.208-3.436 1.636-3.906c.39-.428.914-.608 1.216-.608.15 0 .284.008.406.014.428.018.642.044.924.716.354.842 1.216 2.96 1.32 3.178.106.218.21.512.064.822-.138.318-.258.458-.476.708-.218.25-.424.442-.642.71-.2.236-.422.488-.178.916.244.428 1.082 1.786 2.324 2.894 1.596 1.424 2.942 1.866 3.36 2.072.42.206.664.178.908-.106.252-.292 1.076-1.252 1.362-1.682.28-.428.566-.358.952-.214.39.138 2.468 1.164 2.89 1.376.42.214.702.318.806.5.1.178.1 1.044-.29 2.144z" />
                </svg>
                {booking.submitWhatsApp}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
