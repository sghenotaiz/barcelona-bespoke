import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  {
    name: "Carlos M.",
    role: "Head Promoter",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop&crop=face",
    bio: "5+ years connecting guests with Barcelona's best nightlife experiences.",
  },
  {
    name: "Sofia R.",
    role: "VIP Concierge Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop&crop=face",
    bio: "Specialist in luxury hospitality and premium client relations.",
  },
  {
    name: "Alex T.",
    role: "Events Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop&crop=face",
    bio: "Expert in bachelor parties, corporate events & themed nights.",
  },
  {
    name: "Laura B.",
    role: "Partnerships Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&crop=face",
    bio: "Maintains exclusive relationships with Barcelona's top venues.",
  },
  {
    name: "Diego P.",
    role: "Senior Promoter",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face",
    bio: "Inside access to the most exclusive clubs in the city.",
  },
];

const partners = [
  { name: "Pacha Barcelona", category: "Nightclub" },
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
  const [teamIndex, setTeamIndex] = useState(0);
  const [partnerIndex, setPartnerIndex] = useState(0);

  const visibleTeam = 1;
  const visiblePartners = 4;

  const prevTeam = () => setTeamIndex((i) => Math.max(0, i - 1));
  const nextTeam = () => setTeamIndex((i) => Math.min(teamMembers.length - visibleTeam, i + 1));
  const prevPartner = () => setPartnerIndex((i) => Math.max(0, i - 1));
  const nextPartner = () => setPartnerIndex((i) => Math.min(partners.length - visiblePartners, i + 1));

  return (
    <section id="team" className="py-24 md:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            La Nostra Squadra
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            IL NOSTRO{" "}
            <span className="italic text-silver-gradient">TEAM</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Team Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display text-xl font-light text-foreground mb-6 tracking-wider uppercase">
              I Nostri <span className="italic text-silver-gradient">Promoter</span>
            </h3>

            <div className="relative overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${teamIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {teamMembers.map((member, i) => (
                  <div key={member.name} className="flex-shrink-0 w-full">
                    <div className="group relative overflow-hidden border border-border hover:border-silver/40 transition-all duration-500" style={{ height: "380px" }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-silver mb-1">
                          {member.role}
                        </p>
                        <h4 className="font-display text-2xl text-foreground mb-2">{member.name}</h4>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Team Nav */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={prevTeam}
                disabled={teamIndex === 0}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground hover:border-silver/40 hover:text-silver transition-all duration-300 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5 flex-1">
                {teamMembers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTeamIndex(i)}
                    className={`h-0.5 flex-1 transition-all duration-300 ${i === teamIndex ? "bg-silver" : "bg-border"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTeam}
                disabled={teamIndex === teamMembers.length - visibleTeam}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground hover:border-silver/40 hover:text-silver transition-all duration-300 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Partner Logos */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-display text-xl font-light text-foreground mb-6 tracking-wider uppercase">
              I Nostri <span className="italic text-silver-gradient">Partner</span>
            </h3>

            <div className="overflow-hidden">
              <motion.div
                className="grid grid-cols-2 gap-4"
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {partners.slice(partnerIndex, partnerIndex + visiblePartners).map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group border border-border hover:border-silver/40 transition-all duration-500 p-6 flex flex-col items-center justify-center text-center aspect-square bg-card/30"
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
                Collaboriamo con i <span className="text-foreground font-semibold">migliori venue di Barcellona</span> —
                clubs esclusivi, hotel di lusso, ristoranti gourmet e molto altro.{" "}
                <span className="italic text-silver-gradient">Sempre presenti, sempre disponibili.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
