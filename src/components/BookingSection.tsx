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
  "other",
] as const;

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

    // Build mailto body (destination email to be configured later)
    const selectedActivities = ACTIVITY_KEYS.filter((k) => activities[k])
      .map((k) => (t.booking as Record<string, string>)[k])
      .join(", ");

    const body = [
      `Arrival: ${arrivalDate ? format(arrivalDate, "PPP") : "N/A"}`,
      departureDate ? `Departure: ${format(departureDate, "PPP")}` : null,
      `People: ${people}`,
      `Activities: ${selectedActivities || "None"}`,
      activities.other && otherText ? `Other request: ${otherText}` : null,
      `Email: ${email}`,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = encodeURIComponent("VIP Booking Request — Concierging Barcelona");
    const encodedBody = encodeURIComponent(body);

    // Opens user's mail client — destination address configurable
    window.location.href = `mailto:hello@conciergingbarcelona.com?subject=${subject}&body=${encodedBody}`;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-24 md:py-32 bg-warm-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" strokeWidth={1.2} />
            <h3 className="font-display text-3xl md:text-4xl font-light text-navy mb-4">
              {t.booking.successTitle}
            </h3>
            <p className="font-body text-sm text-navy/70 leading-relaxed">
              {t.booking.successMessage}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-warm-white">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.booking.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy">
            {t.booking.titleLine1}{" "}
            <span className="italic text-gold-gradient">{t.booking.titleLine2}</span>
          </h2>
          <p className="font-body text-sm text-navy/60 max-w-2xl mx-auto mt-6 leading-relaxed">
            {t.booking.description}
          </p>
          <div className="mx-auto gold-line mt-8" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* Date Pickers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-body text-xs tracking-[0.15em] uppercase text-navy/70">
                {t.booking.arrivalDate} *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center gap-3 border border-navy/20 px-4 py-3 font-body text-sm text-left transition-colors hover:border-gold",
                      !arrivalDate && "text-navy/40"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 text-gold" />
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
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-body text-xs tracking-[0.15em] uppercase text-navy/70">
                {t.booking.departureDate}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center gap-3 border border-navy/20 px-4 py-3 font-body text-sm text-left transition-colors hover:border-gold",
                      !departureDate && "text-navy/40"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 text-gold" />
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
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Number of People */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-navy/70">
              {t.booking.numberOfPeople} *
            </label>
            <input
              type="number"
              min="1"
              required
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder={t.booking.peoplePlaceholder}
              className="w-full bg-transparent border border-navy/20 px-4 py-3 font-body text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Activities */}
          <div className="space-y-4">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-navy/70 block">
              {t.booking.activities} *
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
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-navy/20 text-navy/60 hover:border-gold/50"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors",
                      activities[key] ? "border-gold bg-gold" : "border-navy/30"
                    )}
                  >
                    {activities[key] && (
                      <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {(t.booking as Record<string, string>)[key]}
                </button>
              ))}
            </div>

            {/* Other text field */}
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
                  placeholder={t.booking.otherPlaceholder}
                  className="w-full bg-transparent border border-navy/20 px-4 py-3 font-body text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold transition-colors"
                />
              </motion.div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-navy/70">
              {t.booking.email} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.booking.emailPlaceholder}
              className="w-full bg-transparent border border-navy/20 px-4 py-3 font-body text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-navy/70">
              {t.booking.notes}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.booking.notesPlaceholder}
              className="w-full bg-transparent border border-navy/20 px-4 py-3 font-body text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-gold px-12 py-4 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:bg-gold-dark transition-all duration-300"
            >
              <Send size={14} />
              {t.booking.submit}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
