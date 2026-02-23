import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import nightclubVideo from "@/assets/videos/nightclub-dancefloor.mp4";
import vipVideo from "@/assets/videos/vip-celebration.mp4";
import barcelonaVideo from "@/assets/videos/barcelona-nightlife.mp4";

const photoGrid = [
{
  image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop",
  alt: "Group celebrating VIP night"
},
{
  image: "https://images.unsplash.com/photo-1529543544282-ea91407df3ae?w=600&h=400&fit=crop",
  alt: "Friends at Barcelona club"
},
{
  image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
  alt: "VIP bottle service celebration"
},
{
  image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&h=400&fit=crop",
  alt: "Dance floor energy"
},
{
  image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
  alt: "Night out with promoters"
},
{
  image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
  alt: "Concert and nightlife vibes"
}];


const VideoCard = ({
  src,
  caption,
  delay,
  inView





}: {src: string;caption: string;delay: number;inView: boolean;}) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">

      <div
        className="relative overflow-hidden border border-border hover:border-silver/40 transition-all duration-500 cursor-pointer group"
        style={{ aspectRatio: "9/16" }}
        onClick={togglePlay}>

        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover" />

        {/* Play overlay */}
        {!playing &&
        <div className="absolute inset-0 bg-background/30 flex items-center justify-center transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full border-2 border-silver/60 flex items-center justify-center bg-background/40 backdrop-blur-sm group-hover:border-silver group-hover:bg-background/60 transition-all duration-300">
              <Play size={24} className="text-silver ml-1" />
            </div>
          </div>
        }
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
          <p className="font-body text-xs text-foreground/90 leading-relaxed">{caption}</p>
        </div>
      </div>
    </motion.div>);

};

const ExperiencesSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const videos = [
  { src: nightclubVideo, caption: t.experiences.videoCaption1 },
  { src: vipVideo, caption: t.experiences.videoCaption2 },
  { src: barcelonaVideo, caption: t.experiences.videoCaption3 }];


  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="experiences" className="py-24 border-b border border-gold-dark md:py-[50px] bg-[#170202]">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.experiences.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.experiences.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.experiences.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto mt-6">
            {t.experiences.description}
          </p>
        </motion.div>

        {/* Video Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6">

          <h3 className="font-display text-foreground mb-6 tracking-wider uppercase text-center text-lg font-bold">
            🎬 {t.experiences.videoLabel}
          </h3>
        </motion.div>

        <div className="relative mb-20">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-silver transition-colors">

            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-silver transition-colors">

            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

            {videos.map((video, i) =>
            <VideoCard
              key={i}
              src={video.src}
              caption={video.caption}
              delay={0.1 * i}
              inView={inView} />

            )}
          </div>
        </div>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-10">

          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-2 block">
            📸 {t.experiences.photosLabel}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2">
            {t.experiences.photosTitle}
          </h3>
          <p className="font-body text-sm text-silver italic max-w-lg mx-auto">
            {t.experiences.photosCaption}
          </p>
          <div className="mx-auto silver-line mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photoGrid.map((photo, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
            className="group relative overflow-hidden aspect-[3/2] border border-border hover:border-silver/40 transition-all duration-500">

              <img
              src={photo.image}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ExperiencesSection;