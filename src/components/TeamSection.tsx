import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const teamMembers = [
  {
    name: "Carlos M.",
    designation: "Head Promoter",
    quote: "5+ years connecting guests with Barcelona's best nightlife experiences.",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop&crop=face",
  },
  {
    name: "Sofia R.",
    designation: "VIP Concierge Manager",
    quote: "Specialist in luxury hospitality and premium client relations.",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop&crop=face",
  },
  {
    name: "Alex T.",
    designation: "Events Coordinator",
    quote: "Expert in bachelor parties, corporate events & themed nights.",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop&crop=face",
  },
  {
    name: "Laura B.",
    designation: "Partnerships Director",
    quote: "Maintains exclusive relationships with Barcelona's top venues.",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&crop=face",
  },
  {
    name: "Diego P.",
    designation: "Senior Promoter",
    quote: "Inside access to the most exclusive clubs in the city.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face",
  },
];

const partners = [
  { name: "Ku Barcelona", category: "Nightclub" },
  { name: "Opium Barcelona", category: "Beach Club" },
  { name: "Shôko", category: "Restaurant & Club" },
  { name: "W Barcelona", category: "5-Star Hotel" },
  { name: "Razzmatazz", category: "Nightclub" },
  { name: "La Fira", category: "Exclusive Venue" },
  { name: "Arts Barcelona", category: "Luxury Hotel" },
  { name: "Eclipse Bar", category: "Rooftop Bar" },
];

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [partnerIndex, setPartnerIndex] = useState(0);
  const { t } = useLanguage();

  const visiblePartners = 4;

  const prevPartner = () => setPartnerIndex((i) => Math.max(0, i - 1));
  const nextPartner = () => setPartnerIndex((i) => Math.min(partners.length - visiblePartners, i + 1));

  return (
    <section id="team" className="pt-4 pb-24 bg-background md:pb-[50px]">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.team.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.team.title}{" "}
            <span className="italic text-silver-gradient">{t.team.titleAccent}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto mt-6">
            {t.team.description}
          </p>
        </motion.div>

        {/* Promoters - Animated Testimonials Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="font-display text-xl font-light text-foreground text-center tracking-wider uppercase">
            {t.team.promotersTitle}{" "}
            <span className="italic text-silver-gradient">{t.team.promotersAccent}</span>
          </h3>
          <AnimatedTestimonials testimonials={teamMembers} autoplay />
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="font-display text-xl font-light text-foreground mb-6 tracking-wider uppercase text-center">
            {t.team.partnersTitle}{" "}
            <span className="italic text-silver-gradient">{t.team.partnersAccent}</span>
          </h3>

          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {partners.slice(partnerIndex, partnerIndex + visiblePartners).map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group border border-border hover:border-silver/40 transition-all duration-500 p-5 flex flex-col items-center justify-center text-center aspect-[5/4] bg-card/30"
                  >
                    <div className="w-12 h-12 mb-4 border border-silver/30 flex items-center justify-center rounded-full">
                      <span className="font-display text-lg text-silver-gradient">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <p className="font-display text-sm text-foreground tracking-wide">{partner.name}</p>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                      {partner.category}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Partner Nav */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={prevPartner}
                disabled={partnerIndex === 0}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground hover:border-silver/40 hover:text-silver transition-all duration-300 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5 flex-1">
                {Array.from({ length: Math.ceil(partners.length / visiblePartners) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPartnerIndex(i * visiblePartners)}
                    className={`h-0.5 flex-1 transition-all duration-300 ${
                      Math.floor(partnerIndex / visiblePartners) === i ? "bg-silver" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextPartner}
                disabled={partnerIndex >= partners.length - visiblePartners}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground hover:border-silver/40 hover:text-silver transition-all duration-300 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Decorative Note */}
            <div className="mt-8 border border-silver/20 bg-card/20 px-6 py-5">
              <p className="font-body text-xs text-silver leading-relaxed text-center">
                {t.team.partnersNote.split(t.team.partnersNoteHighlight)[0]}
                <span className="italic text-silver-gradient">{t.team.partnersNoteHighlight}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
