import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter, Images, Calendar, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { api } from "@/lib/api";

// Fallback gallery images (used when backend is offline)
const FALLBACK_IMAGES = Array.from({ length: 24 }, (_, i) => ({
  _id: String(i),
  url: `https://picsum.photos/seed/${i + 100}/${400 + (i % 3) * 100}/${300 + (i % 4) * 80}`,
  caption: ["Hackathon 2025", "AI Workshop", "Code Sprint", "IoT Bootcamp", "Team Outing", "Guest Lecture"][i % 6],
  album: ["Hackathon 2025", "AI Workshop", "Code Sprint 2025", "Team Outings"][i % 4],
  year: i < 12 ? 2025 : 2024,
  isFeatured: i < 6,
}));

const FALLBACK_ALBUMS = [
  { _id: "Hackathon 2025", count: 8, cover: "https://picsum.photos/seed/200/400/260", year: 2025 },
  { _id: "AI Workshop", count: 6, cover: "https://picsum.photos/seed/201/400/260", year: 2025 },
  { _id: "Code Sprint 2025", count: 5, cover: "https://picsum.photos/seed/202/400/260", year: 2025 },
  { _id: "Team Outings", count: 5, cover: "https://picsum.photos/seed/203/400/260", year: 2024 },
];

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>(FALLBACK_IMAGES);
  const [albums, setAlbums] = useState<any[]>(FALLBACK_ALBUMS);
  const [activeAlbum, setActiveAlbum] = useState("All");
  const [activeYear, setActiveYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [view, setView] = useState<"grid" | "albums">("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [imgRes, albumRes] = await Promise.all([api.gallery.getAll({ limit: "150" }), api.gallery.getAlbums()]);
        if (imgRes.data?.length) setImages(imgRes.data);
        if (albumRes.data?.length) setAlbums(albumRes.data);
      } catch { /* use fallback */ } finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = images.filter(img => {
    const matchesAlbum = activeAlbum === "All" || img.album === activeAlbum;
    const matchesYear = activeYear === "All" || String(img.year) === activeYear;
    const matchesSearch = !searchQuery || 
      (img.caption || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.album || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAlbum && matchesYear && matchesSearch;
  });

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prev = () => setLightbox(lb => ({ ...lb, index: (lb.index - 1 + filtered.length) % filtered.length }));
  const next = () => setLightbox(lb => ({ ...lb, index: (lb.index + 1) % filtered.length }));

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!lightbox.open) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }, [lightbox.open, filtered.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const allAlbumNames = ["All", ...new Set(images.map(img => img.album))];
  const allYears = ["All", ...new Set(images.map(img => String(img.year)))].sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-radial-glow opacity-60" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 font-display text-[9px] tracking-[0.5em] text-accent uppercase">
            Captured Memories
          </span>
          <h1 className="font-display text-6xl font-black tracking-tighter sm:text-8xl">
            OUR <span className="text-gradient-brand">MOMENTS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            A visual archive of hackathons, workshops, and the heartbeat of our technical community.
          </p>
        </motion.div>
      </section>

      {/* Controls */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search & Tabs */}
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative group w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-accent" />
                <input 
                  type="text" 
                  placeholder="Search memories..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-secondary/50 py-2 pl-9 pr-4 text-xs focus:border-accent/50 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {allYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`shrink-0 rounded-full px-4 py-1.5 font-display text-[9px] tracking-widest transition-all ${
                      activeYear === year
                        ? "bg-accent text-background shadow-lg shadow-accent/20"
                        : "border border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* View Switching */}
            <div className="flex items-center gap-4">
               <div className="flex rounded-full border border-border bg-secondary/30 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest transition-all ${view === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  <Images className="h-3 w-3" /> GRID
                </button>
                <button
                  onClick={() => setView("albums")}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest transition-all ${view === "albums" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  <Calendar className="h-3 w-3" /> ALBUMS
                </button>
              </div>
            </div>
          </div>
          
          {view === "grid" && (
            <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-border/50 pt-4">
              <Filter className="h-3 w-3 shrink-0 text-muted-foreground" />
              {allAlbumNames.map(name => (
                <button
                  key={name}
                  onClick={() => setActiveAlbum(name)}
                  className={`shrink-0 rounded-full px-3 py-1 font-display text-[9px] tracking-widest transition-all ${
                    activeAlbum === name
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {name.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Albums view */}
        <AnimatePresence mode="wait">
          {view === "albums" ? (
            <motion.div 
              key="albums"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
            >
              {albums.filter(a => activeYear === "All" || String(a.year) === activeYear).map((album, i) => (
                <motion.button
                  key={album._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setActiveAlbum(album._id); setView("grid"); }}
                  className="group relative overflow-hidden rounded-2xl border border-border aspect-[4/5] bg-secondary"
                >
                  <img src={album.cover} alt={album._id} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 border-2 border-accent/0 transition-all group-hover:border-accent/40 rounded-2xl" />
                  <div className="absolute bottom-0 left-0 p-5 text-left w-full">
                    <p className="font-display text-sm font-black tracking-wider text-foreground uppercase">{album._id}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground">{album.count} PHOTOS</p>
                      <p className="text-[10px] font-bold text-accent">{album.year}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
            >
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="group relative mb-4 cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-secondary break-inside-avoid shadow-sm hover:shadow-xl transition-all"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.url}
                    alt={img.caption || "Gallery photo"}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {img.isFeatured && (
                    <div className="absolute left-3 top-3 z-10 rounded-full bg-accent/90 backdrop-blur-sm px-2.5 py-0.5 font-display text-[8px] font-bold tracking-widest text-background">
                      FEATURED
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{img.album}</p>
                    <p className="mt-1 text-xs font-medium text-foreground line-clamp-2">{img.caption || "Untitled Memory"}</p>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-accent/5">
                    <ZoomIn className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center">
             <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
               <Filter className="h-6 w-6 text-muted-foreground" />
             </div>
             <h3 className="text-lg font-bold">No memories found</h3>
             <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-6">
               <div className="flex flex-col">
                  <p className="font-display text-xs font-bold tracking-widest text-accent uppercase">{filtered[lightbox.index]?.album}</p>
                  <p className="text-sm text-foreground">{filtered[lightbox.index]?.caption || "Technical Club Memory"}</p>
               </div>
               <button onClick={closeLightbox} className="rounded-full bg-secondary/50 p-2 text-foreground hover:bg-secondary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex h-[70vh] w-full items-center justify-center px-12">
              <button 
                onClick={e => { e.stopPropagation(); prev(); }} 
                className="absolute left-6 z-10 rounded-full bg-secondary/30 p-4 text-foreground hover:bg-secondary/80 transition-all"
              >
                ←
              </button>
              
              <motion.img
                key={lightbox.index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={filtered[lightbox.index]?.url}
                alt={filtered[lightbox.index]?.caption || ""}
                className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onClick={e => e.stopPropagation()}
              />

              <button 
                onClick={e => { e.stopPropagation(); next(); }} 
                className="absolute right-6 z-10 rounded-full bg-secondary/30 p-4 text-foreground hover:bg-secondary/80 transition-all"
              >
                →
              </button>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
                <div className="rounded-full bg-secondary/50 px-4 py-2 text-[10px] font-bold tracking-widest text-muted-foreground">
                  {lightbox.index + 1} OF {filtered.length}
                </div>
                {filtered[lightbox.index]?.year && (
                  <div className="rounded-full bg-accent/20 px-4 py-2 text-[10px] font-bold tracking-widest text-accent">
                    EST. {filtered[lightbox.index].year}
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
}
