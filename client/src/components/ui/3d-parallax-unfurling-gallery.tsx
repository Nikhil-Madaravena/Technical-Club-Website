import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TECH_IMAGES = [
  // Coding / Software Development
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  // Robotics / Automation
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  // Hackathon / Tech Collaboration
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  // AI / Advanced Technology
  "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
  // VR / Metaverse / Gaming
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80",
  // Cybersecurity / Networks
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  // Servers / Cloud Infrastructure
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  // Electronics / IoT / Arduino
  "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=600&q=80",
  // UI/UX Design & Prototyping
  "https://images.unsplash.com/photo-1581291518655-9523c932bfcf?auto=format&fit=crop&w=600&q=80",
  // Team Brainstorming / Coding
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  // Algorithm / Logic Coding
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
  // Hardware / Drones / Electronics
  "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
  // Tech Presentation / Workshop
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  // Space Tech / Innovation
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-[#111] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d">
      <img
        src={src}
        alt="Gallery Asset"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-lg"
      />
    </div>
  );
};

export function ParallaxGallery() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const col1Base = TECH_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = TECH_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = TECH_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = TECH_IMAGES.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  // LINKED SCROLL: Now tells Framer Motion exactly which div is doing the scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  return (
    <div 
      ref={scrollWrapperRef}
      className="w-full h-[85vh] overflow-y-auto overflow-x-hidden bg-[#050505] rounded-3xl border border-neutral-800"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[300vh] bg-[#050505] text-white font-sans selection:bg-white selection:text-black"
      >
        <div className="sticky top-0 h-full w-full flex justify-center items-center overflow-hidden">
          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "#2c2738",
            }}
            className="relative bg-black overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d"
          >
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Shadow Box Masking */}
              <div className="absolute inset-0 z-20 shadow-[inset_0_50px_100px_rgba(0,0,0,0.9),inset_0_-50px_100px_rgba(0,0,0,0.9)]" />
              <div className="absolute inset-0 z-20 shadow-[inset_50px_0_100px_rgba(0,0,0,0.9),inset_-50px_0_100px_rgba(0,0,0,0.9)]" />

              {/* Parallax Image Grid Matrix */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
              >
                <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col1.map((src, index) => (
                    <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col2.map((src, index) => (
                    <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col3.map((src, index) => (
                    <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col4.map((src, index) => (
                    <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
            
            {/* Visual Instruction Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 animate-pulse">
                Scroll Inside this box to Unfurl Gallery
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ParallaxGallery;
