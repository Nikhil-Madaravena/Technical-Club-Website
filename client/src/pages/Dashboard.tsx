import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Images, Users, Trophy, MessageSquare,
  LogOut, Menu, X, Plus, Trash2, Edit, Check, AlertCircle,
  TrendingUp, Image, Mail, ChevronRight, Tag, Folder, MoreVertical, Settings,
  ArrowLeft, CheckCircle, Search, Grid, FileText, FileDown, Download, Filter, UserPlus,
  Clock, ClipboardList, XCircle, MoreHorizontal, Save,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import tcLogo from "@/assets/tc-logo.png";

// ─── Sidebar ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview",      label: "Overview",      Icon: LayoutDashboard },
  { id: "events",        label: "Events",         Icon: Calendar },
  { id: "gallery",       label: "Gallery",        Icon: Images },
  { id: "team",          label: "Team",           Icon: Users },
  { id: "documents",     label: "Documents",      Icon: FileText },
  { id: "messages",      label: "Messages",       Icon: MessageSquare },
];

function Sidebar({ active, setActive, onLogout, open, setOpen }: any) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-background/80 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}>
        <div className="flex items-center gap-3 border-b border-border p-5">
          <img src={tcLogo} alt="TC" className="h-9 w-9 rounded-full" />
          <div>
            <p className="font-display text-xs font-bold tracking-wider">TC KITSW</p>
            <p className="font-display text-[9px] tracking-widest text-accent">ADMIN PANEL</p>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden"><X className="h-4 w-4" /></button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => { setActive(id); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${active === id ? "bg-accent/15 text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              <Icon className="h-4 w-4" />
              <span className="font-display text-xs tracking-wider">{label.toUpperCase()}</span>
              {active === id && <ChevronRight className="ml-auto h-3 w-3" />}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <LogOut className="h-4 w-4" /><span className="font-display text-xs tracking-wider">LOGOUT</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, Icon, color }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-[10px] tracking-widest text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-black">{value}</p>
          {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Overview Panel ──────────────────────────────────────────────────────────
const PIE_COLORS = ["#3b82f6","#ef4444","#10b981","#f59e0b","#8b5cf6","#ec4899"];

function OverviewPanel() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { api.stats.getDashboard().then(r => setStats(r.data)).catch(() => {}); }, []);

  const pieData = (stats?.eventsByCategory || []).map((c: any) => ({ name: c._id, value: c.count }));
  const barData = (stats?.eventsPerMonth || []).map((m: any) => ({
    name: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m._id.month - 1],
    events: m.count,
  }));

  return (
    <div className="space-y-6">
      <h2 className="font-display text-sm font-bold tracking-wider">OVERVIEW</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="TOTAL EVENTS" value={stats?.totalEvents ?? "—"} sub={`${stats?.upcomingEvents ?? 0} upcoming`} Icon={Calendar} color="bg-blue-500/15 text-blue-400" />
        <StatCard label="GALLERY PHOTOS" value={stats?.totalPhotos ?? "—"} Icon={Image} color="bg-purple-500/15 text-purple-400" />
        <StatCard label="TEAM MEMBERS" value={stats?.totalMembers ?? "—"} Icon={Users} color="bg-green-500/15 text-green-400" />
        <StatCard label="NEW MESSAGES" value={stats?.newMessages ?? "—"} sub={`${stats?.totalMessages ?? 0} total`} Icon={Mail} color="bg-orange-500/15 text-orange-400" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-4 font-display text-xs font-bold tracking-wider">EVENTS PER MONTH</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}><XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="events" fill="#3b82f6" radius={[4,4,0,0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-4 font-display text-xs font-bold tracking-wider">EVENTS BY CATEGORY</p>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} (${value})`} labelLine={false}>
                {pieData.map((_: any, i: number) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          ) : <div className="flex h-48 items-center justify-center text-xs text-muted-foreground">No data yet</div>}
        </div>
      </div>
    </div>
  );
}

// ─── Events Panel ─────────────────────────────────────────────────────────────
const CATEGORIES = ["Hackathon","Workshop","Guest Lecture","Competition","Seminar", "Sumshodini", "Other"];
const STATUSES   = ["upcoming","ongoing","completed","cancelled"];

function EventsPanel() {
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({ title:"", description:"", date:"", location:"", category:"Workshop", status:"upcoming", organizedBy:"TC Club", registrationLink:"" });
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const load = () => api.events.getAll({ limit:"50" }).then(r => setEvents(r.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm({ title:"", description:"", date:"", location:"", category:"Workshop", status:"upcoming", organizedBy:"", registrationLink:"" }); setShowForm(true); };
  const openEdit = (ev: any) => { setEditing(ev); setForm({ title: ev.title, description: ev.description, date: ev.date?.slice(0,10), location: ev.location, category: ev.category, status: ev.status, organizedBy: ev.organizedBy ,registrationLink: ev.registrationLink || "" }); setShowForm(true); };

  const save = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v as string));
    try {
      if (editing) await api.events.update(editing._id, fd);
      else await api.events.create(fd);
      setMsg("Saved!"); setShowForm(false); load();
    } catch { setMsg("Error saving event."); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await api.events.delete(id); load();
  };

  const filteredEvents = events
  .filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-bold tracking-wider">EVENTS MANAGER</h2>
        <button onClick={openNew} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-display text-[10px] tracking-widest text-background hover:bg-accent/90"><Plus className="h-3.5 w-3.5" />ADD EVENT</button>
      </div>
      {msg && <p className="rounded-lg bg-accent/10 px-4 py-2 text-xs text-accent">{msg}</p>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input  type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)}   className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:border-accent"/>
         </div>
         <div className="relative">
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}className="rounded-lg border border-border bg-card px-4 py-2 pr-10 text-sm outline-none">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          </div>
      </div>


      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-display text-xs font-bold tracking-wider">{editing ? "EDIT EVENT" : "NEW EVENT"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[["title","Title"],["location","Location"],["organizedBy","Organized By"]].map(([k,l]) => (
              <div key={k}><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground">{l}</label>
                <input value={form[k]} onChange={e => setForm((f:any) => ({...f,[k]:e.target.value}))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:border-accent/50 focus:outline-none" /></div>
            ))}
            <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground">DATE</label>
              <input type="date" value={form.date} onChange={e => setForm((f:any)=>({...f,date:e.target.value}))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:border-accent/50 focus:outline-none" /></div>
            <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground">CATEGORY</label>
              <select value={form.category} onChange={e => setForm((f:any)=>({...f,category:e.target.value}))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none">
                {CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
            <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground">STATUS</label>
              <select value={form.status} onChange={e => setForm((f:any)=>({...f,status:e.target.value}))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none">
                {STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground">REGISTRATION LINK (Optional)</label>
              <input value={form.registrationLink} onChange={e => setForm((f:any)=>({...f,registrationLink:e.target.value}))} placeholder="https://forms.gle/..." className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:border-accent/50 focus:outline-none" /></div>
          </div>
          <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground">DESCRIPTION</label>
            <textarea rows={3} value={form.description} onChange={e => setForm((f:any)=>({...f,description:e.target.value}))} className="w-full resize-none rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:border-accent/50 focus:outline-none" /></div>
          <div className="flex gap-3">
            <button onClick={save} className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 font-display text-[10px] tracking-widest text-background"><Check className="h-3.5 w-3.5" />SAVE</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-5 py-2 font-display text-[10px] tracking-widest text-muted-foreground hover:text-foreground">CANCEL</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {filteredEvents.map(ev => (
          <div key={ev._id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex-1 min-w-0">
              <p className="font-display text-xs font-bold tracking-wide truncate">{ev.title}</p>
              <p className="text-[10px] text-muted-foreground">{ev.category} · {new Date(ev.date).toLocaleDateString()} · <span className="capitalize">{ev.status}</span>{ev.organizedBy && ` · ${ev.organizedBy}`}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(ev)} className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><Edit className="h-3.5 w-3.5" /></button>
              <button onClick={() => del(ev._id)} className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="py-10 text-center text-xs text-muted-foreground">No events yet. Add your first event!</p>}
      </div>
    </div>
  );
}

function GalleryPanel() {
  const [images, setImages] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"photos" | "albums">("photos");
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [editingPhoto, setEditingPhoto] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [albumFilter, setAlbumFilter] = useState("All");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  
  // Batch Metadata
  const [batchData, setBatchData] = useState({
    album: "General",
    year: new Date().getFullYear().toString(),
    caption: "",
    tags: ""
  });

  const loadPhotos = (albumName?: string) => {
    api.gallery.getAll({ limit: "500", ...(albumName ? { album: albumName } : {}) })
      .then(r => setImages(r.data || []))
      .catch(() => {});
  };

  const loadAlbums = () => {
    api.gallery.getAlbums()
      .then(r => setAlbums(r.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    if (selectedAlbum) loadPhotos(selectedAlbum);
    else if (viewMode === "photos") loadPhotos();
    else loadAlbums();
  }, [viewMode, selectedAlbum]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    const fd = new FormData();
    selectedFiles.forEach(f => fd.append("images", f));
    fd.append("album", batchData.album);
    fd.append("year", batchData.year);
    fd.append("caption", batchData.caption);
    fd.append("tags", batchData.tags);
    try {
      await api.gallery.upload(fd);
      setSelectedFiles([]);
      setPreviews([]);
      setBatchData(prev => ({ ...prev, caption: "", tags: "" }));
      loadPhotos(selectedAlbum || undefined);
      if (viewMode === "albums") loadAlbums();
    } catch {
      alert("Upload failed.");
    } finally { setUploading(false); }
  };

  const handleUpdatePhoto = async () => {
    if (!editingPhoto) return;
    try {
      await api.gallery.update(editingPhoto._id, {
        caption: editingPhoto.caption,
        tags: typeof editingPhoto.tags === "string" ? editingPhoto.tags.split(",").map((t: string) => t.trim()) : editingPhoto.tags,
        isFeatured: editingPhoto.isFeatured,
        album: editingPhoto.album,
        year: parseInt(editingPhoto.year)
      });
      setEditingPhoto(null);
      loadPhotos(selectedAlbum || undefined);
    } catch { alert("Failed to update photo."); }
  };

  const handleBulkMove = async () => {
    const targetAlbum = prompt("Enter target album name:");
    if (!targetAlbum || selectedPhotos.length === 0) return;
    
    try {
      await Promise.all(selectedPhotos.map(id => api.gallery.update(id, { album: targetAlbum })));
      setSelectedPhotos([]);
      loadPhotos(selectedAlbum || undefined);
      alert(`Moved ${selectedPhotos.length} photos to ${targetAlbum}`);
    } catch { alert("Failed to move some photos."); }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedPhotos.length} selected photos?`) || selectedPhotos.length === 0) return;
    try {
      await Promise.all(selectedPhotos.map(id => api.gallery.delete(id)));
      setSelectedPhotos([]);
      loadPhotos(selectedAlbum || undefined);
    } catch { alert("Failed to delete some photos."); }
  };

  const toggleSelectAll = () => {
    if (selectedPhotos.length === filteredImages.length) setSelectedPhotos([]);
    else setSelectedPhotos(filteredImages.map(img => img._id));
  };

  const handleUpdateAlbum = async () => {
    if (!editingAlbum) return;
    try {
      await api.gallery.updateAlbum(editingAlbum._id, editingAlbum.newName, parseInt(editingAlbum.year));
      setEditingAlbum(null);
      loadAlbums();
    } catch { alert("Failed to update album."); }
  };

  const handleDeleteAlbum = async (name: string) => {
    if (!confirm(`Delete entire album "${name}" and ALL its photos? This cannot be undone.`)) return;
    await api.gallery.deleteAlbum(name);
    loadAlbums();
  };

  const filteredImages = images.filter(img => {
  const matchesSearch =
    !searchQuery ||
    (img.caption || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (img.tags || []).some((t: string) =>
      t.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const matchesAlbum =
    albumFilter === "All" ||
    img.album === albumFilter;

  return matchesSearch && matchesAlbum;
});

  const allAlbumNames = [
  "All",
  ...new Set(images.map(img => img.album).filter(Boolean))
];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="sticky top-0 z-20 rounded-xl border border-border bg-background/95 p-4 backdrop-blur">
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

    {/* Left Side */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

      {/* Back Button */}
      {selectedAlbum && (
        <button
          onClick={() => setSelectedAlbum(null)}
          className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground transition-all hover:border-accent/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          BACK
        </button>
      )}

      {/* Title */}
      <h2 className="font-display text-sm font-bold tracking-wider uppercase">
        {selectedAlbum
          ? `ALBUM: ${selectedAlbum}`
          : "Gallery Manager"}
      </h2>

      {/* View Switch */}
      {!selectedAlbum && (
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("photos")}
            className={`rounded-lg px-3 py-2 font-display text-[10px] tracking-widest transition-all ${
              viewMode === "photos"
                ? "bg-accent text-background"
                : "border border-border text-muted-foreground"
            }`}
          >
            PHOTOS
          </button>

          <button
            onClick={() => setViewMode("albums")}
            className={`rounded-lg px-3 py-2 font-display text-[10px] tracking-widest transition-all ${
              viewMode === "albums"
                ? "bg-accent text-background"
                : "border border-border text-muted-foreground"
            }`}
          >
            ALBUMS
          </button>
        </div>
      )}
    </div>

    {/* Right Side */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

  {/* Search */}
  <div className="relative flex-1 sm:w-80">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

    <input
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search photos..."
      className="w-full rounded-lg border border-border bg-secondary py-2 pl-9 pr-4 text-sm focus:border-accent/50 focus:outline-none"
    />
  </div>

  {/* Album Filter */}
  <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2">
    <Filter className="h-3.5 w-3.5 text-muted-foreground" />

    <select
      value={albumFilter}
      onChange={(e) => setAlbumFilter(e.target.value)}
      className="bg-transparent text-xs focus:outline-none"
    >
      {allAlbumNames.map((album) => (
        <option key={album} value={album}>
          {album}
        </option>
      ))}
    </select>
  </div>

  {/* Upload Button */}
  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 font-display text-[10px] tracking-widest text-background transition-all hover:opacity-90">
    <Plus className="h-3.5 w-3.5" />

    SELECT PHOTOS

    <input
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={onFileChange}
      disabled={uploading}
    />
  </label>
</div>
  </div>
</div>

      {/* Upload Preview Section */}
      {previews.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-accent/20 bg-accent/5 p-6 shadow-lg shadow-accent/5">
          <div className="mb-6 grid gap-4 lg:grid-cols-4">
            <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Target Album</label>
              <input value={batchData.album} onChange={e => setBatchData({ ...batchData, album: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none" /></div>
            <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Year</label>
              <input type="number" value={batchData.year} onChange={e => setBatchData({ ...batchData, year: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none" /></div>
            <div className="lg:col-span-2"><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Batch Tags</label>
              <input value={batchData.tags} onChange={e => setBatchData({ ...batchData, tags: e.target.value })} placeholder="comma separated" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none" /></div>
          </div>
          <div className="flex items-center justify-between border-t border-accent/10 pt-4">
            <p className="font-display text-[10px] font-bold tracking-widest text-accent uppercase">{previews.length} Ready for Upload</p>
            <div className="flex gap-3">
              <button onClick={() => { setSelectedFiles([]); setPreviews([]); }} className="text-[10px] text-muted-foreground hover:text-foreground">CANCEL</button>
              <button onClick={handleUpload} disabled={uploading} className="rounded-lg bg-accent px-6 py-2 font-display text-[10px] font-bold text-background disabled:opacity-50 uppercase tracking-widest shadow-lg shadow-accent/20">Upload Batch</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedPhotos.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center justify-between rounded-xl bg-accent p-3 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <p className="px-3 font-display text-[10px] font-bold tracking-widest text-background uppercase">{selectedPhotos.length} PHOTOS SELECTED</p>
              <button onClick={toggleSelectAll} className="rounded-md bg-background/20 px-3 py-1 font-display text-[9px] font-bold tracking-widest text-background hover:bg-background/30 transition-all uppercase">
                {selectedPhotos.length === filteredImages.length ? "Deselect All" : "Select All"}
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={handleBulkMove} className="flex items-center gap-2 rounded-lg bg-background/20 px-4 py-1.5 font-display text-[10px] font-bold tracking-widest text-background hover:bg-background/30 transition-all uppercase">Move</button>
              <button onClick={handleBulkDelete} className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-1.5 font-display text-[10px] font-bold tracking-widest text-background hover:bg-red-500/40 transition-all uppercase">Delete</button>
              <button onClick={() => setSelectedPhotos([])} className="px-3 text-[10px] font-bold text-background">CLEAR</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Content */}
      <div className="min-h-[400px]">
        {viewMode === "albums" && !selectedAlbum ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map(a => (
              <div key={a._id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-accent/50 hover:shadow-2xl">
                <div className="flex items-start gap-4">
                  <div 
                    className="h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-secondary"
                    onClick={() => setSelectedAlbum(a._id)}
                  >
                    <img src={a.cover} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <h3 className="cursor-pointer font-display text-xs font-black tracking-widest uppercase text-foreground group-hover:text-accent transition-colors" onClick={() => setSelectedAlbum(a._id)}>{a._id}</h3>
                    <p className="mt-1 text-[10px] font-bold text-muted-foreground uppercase">{a.count} Photos · {a.year}</p>
                    <div className="mt-6 flex gap-2">
                      <button onClick={() => setEditingAlbum({ ...a, newName: a._id, year: a.year.toString() })} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-display text-[9px] tracking-widest text-muted-foreground hover:bg-secondary hover:text-foreground"><Settings className="h-3 w-3" /> SETTINGS</button>
                      <button onClick={() => handleDeleteAlbum(a._id)} className="flex items-center gap-1.5 rounded-lg border border-red-500/10 px-3 py-1.5 font-display text-[9px] tracking-widest text-red-400 hover:bg-red-500/20"><Trash2 className="h-3 w-3" /> DELETE</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {filteredImages.map(img => (
              <div 
                key={img._id} 
                className={`group relative aspect-square overflow-hidden rounded-xl border transition-all ${selectedPhotos.includes(img._id) ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background" : "border-border hover:border-accent/40"}`}
              >
                <img src={img.url} className="h-full w-full object-cover" />
                
                {/* Checkbox Overlay */}
                <button 
                  onClick={() => setSelectedPhotos(prev => prev.includes(img._id) ? prev.filter(id => id !== img._id) : [...prev, img._id])}
                  className={`absolute left-2 top-2 z-10 rounded-full bg-background/80 p-1 shadow-sm transition-all ${selectedPhotos.includes(img._id) ? "opacity-100 scale-110 text-accent" : "opacity-0 group-hover:opacity-100 text-muted-foreground"}`}
                >
                  <CheckCircle className="h-4 w-4" />
                </button>

                {/* Actions Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => setEditingPhoto({ ...img, year: img.year?.toString() })} className="rounded-full bg-accent p-2 text-background hover:scale-110 transition-transform"><Edit className="h-4 w-4" /></button>
                  <button onClick={async () => { if (confirm("Delete photo?")) { await api.gallery.delete(img._id); loadPhotos(selectedAlbum || undefined); } }} className="rounded-full bg-red-500 p-2 text-white hover:scale-110 transition-transform"><Trash2 className="h-4 w-4" /></button>
                </div>

                {img.isFeatured && (
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-accent/90 px-2 py-0.5 font-display text-[8px] font-bold text-background shadow-lg">FAV</div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="truncate font-display text-[8px] font-bold tracking-widest text-foreground uppercase">{img.album}</p>
                </div>
              </div>
            ))}
            {filteredImages.length === 0 && (
              <div className="col-span-full py-20 text-center uppercase tracking-widest text-muted-foreground text-[10px]">No matches for your search</div>
            )}
          </div>
        )}
      </div>

      {/* Photo Edit Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-[0_0_50px_rgba(0,0,0,0.4)]">
             <div className="mb-6 flex items-start gap-6">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
                  <img src={editingPhoto.url} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-display text-lg font-black tracking-tighter uppercase">Edit Metadata</h3>
                  <div><label className="mb-1 block font-display text-[10px] tracking-widest text-muted-foreground uppercase">Caption</label>
                    <input value={editingPhoto.caption || ""} onChange={e => setEditingPhoto({ ...editingPhoto, caption: e.target.value })} className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs focus:border-accent focus:outline-none" placeholder="Add a description..." /></div>
                </div>
             </div>
             
             <div className="grid gap-6 sm:grid-cols-2">
                <div><label className="mb-1 block font-display text-[10px] tracking-widest text-muted-foreground uppercase">Album</label>
                  <input value={editingPhoto.album} onChange={e => setEditingPhoto({ ...editingPhoto, album: e.target.value })} className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs focus:border-accent focus:outline-none" /></div>
                <div><label className="mb-1 block font-display text-[10px] tracking-widest text-muted-foreground uppercase">Year</label>
                  <input type="number" value={editingPhoto.year} onChange={e => setEditingPhoto({ ...editingPhoto, year: e.target.value })} className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs focus:border-accent focus:outline-none" /></div>
                <div className="sm:col-span-2"><label className="mb-1 block font-display text-[10px] tracking-widest text-muted-foreground uppercase">Tags</label>
                  <input value={editingPhoto.tags?.join(", ")} onChange={e => setEditingPhoto({ ...editingPhoto, tags: e.target.value })} className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs focus:border-accent focus:outline-none" placeholder="winners, hackathon, prize" /></div>
             </div>

             <div className="mt-6 flex items-center gap-3">
               <input type="checkbox" checked={editingPhoto.isFeatured} onChange={e => setEditingPhoto({ ...editingPhoto, isFeatured: e.target.checked })} className="h-4 w-4 rounded border-border bg-secondary text-accent" />
               <label className="font-display text-[10px] font-bold tracking-widest text-foreground uppercase">Feature this photo on landing page</label>
             </div>

             <div className="mt-10 flex gap-4">
               <button onClick={handleUpdatePhoto} className="flex-1 rounded-xl bg-accent py-3 font-display text-[11px] font-black tracking-widest text-background hover:bg-accent/90 transition-all uppercase shadow-lg shadow-accent/20">Update Photo</button>
               <button onClick={() => setEditingPhoto(null)} className="flex-1 rounded-xl border border-border py-3 font-display text-[11px] font-black tracking-widest text-muted-foreground hover:bg-secondary transition-all uppercase">Cancel</button>
             </div>
          </motion.div>
        </div>
      )}

      {/* Album Edit Modal */}
      {editingAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
            <h3 className="mb-8 font-display text-sm font-black tracking-tighter uppercase">Edit Album: {editingAlbum._id}</h3>
            <div className="space-y-6">
              <div><label className="mb-1 block font-display text-[10px] tracking-widest text-muted-foreground uppercase">Album Name</label>
                <input value={editingAlbum.newName} onChange={e => setEditingAlbum({ ...editingAlbum, newName: e.target.value })} className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-xs focus:border-accent focus:outline-none" /></div>
              <div><label className="mb-1 block font-display text-[10px] tracking-widest text-muted-foreground uppercase">Year</label>
                <input type="number" value={editingAlbum.year} onChange={e => setEditingAlbum({ ...editingAlbum, year: e.target.value })} className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-xs focus:border-accent focus:outline-none" /></div>
            </div>
            <div className="mt-10 flex gap-4">
              <button onClick={handleUpdateAlbum} className="flex-1 rounded-xl bg-accent py-3 font-display text-[11px] font-black tracking-widest text-background hover:bg-accent/90 transition-all uppercase shadow-lg shadow-accent/20">Save Changes</button>
              <button onClick={() => setEditingAlbum(null)} className="flex-1 rounded-xl border border-border py-3 font-display text-[11px] font-black tracking-widest text-muted-foreground hover:bg-secondary transition-all uppercase">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ─── Messages Panel ───────────────────────────────────────────────────────────
function MessagesPanel() {
  const [messages, setMessages] = useState<any[]>([]);
  const [filter, setFilter] = useState("new");

  const load = () => api.contact.getAll({ type: "contact", ...(filter !== "all" ? { status: filter } : {}) })
    .then(r => setMessages(r.data || []))
    .catch(() => {});
    
  useEffect(() => { load(); }, [filter]);

  const mark = async (id: string, status: string) => { await api.contact.update(id, { status }); load(); };
  const del  = async (id: string) => { await api.contact.delete(id); load(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-bold tracking-wider uppercase">Contact Inquiries</h2>
        <div className="flex gap-1">
          {["new","read","all"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`rounded-lg px-3 py-1.5 font-display text-[10px] tracking-widest transition-all ${filter === s ? "bg-accent text-background" : "border border-border text-muted-foreground"}`}>{s.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m._id} className={`rounded-xl border bg-card p-5 ${m.status === "new" ? "border-accent/30" : "border-border"}`}>
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xs font-bold tracking-wide">{m.name} <span className="font-normal text-muted-foreground">— {m.email}</span></p>
                <p className="mt-0.5 text-xs font-medium text-foreground">{m.subject}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {m.status === "new" && <button onClick={() => mark(m._id,"read")} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"><Check className="h-3.5 w-3.5" /></button>}
                <button onClick={() => del(m._id)} className="rounded-lg border border-red-500/30 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{m.message}</p>
            <p className="mt-3 text-[10px] text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="py-10 text-center text-xs text-muted-foreground uppercase tracking-widest">No messages found</p>}
      </div>
    </div>
  );
}

// ─── Placeholder panels ───────────────────────────────────────────────────────
// ─── Team Panel ───────────────────────────────────────────────────────────────
function TeamPanel() {
  const [team, setTeam] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [view, setView] = useState<"members" | "apps">("members");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString());
  const [form, setForm] = useState<any>({ name: "", role: "", domain: "Web Development", batch: "", isCoreTeam: true, bio: "", academicYear: new Date().getFullYear().toString() });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const loadTeam = () => api.team.getAll({ academicYear: yearFilter }).then(r => setTeam(r.data || [])).catch(() => {});
  const loadApps = () => api.contact.getAll({ type: "membership" }).then(r => setApps(r.data || [])).catch(() => {});
  
  useEffect(() => {
    if (view === "members") loadTeam();
    else loadApps();
  }, [view, yearFilter]);

  const openNew = () => { setEditing(null); setForm({ name: "", role: "", domain: "Web Development", batch: "", isCoreTeam: true, bio: "", academicYear: yearFilter }); setFile(null); setShowForm(true); };
  const openEdit = (m: any) => { setEditing(m); setForm({ name: m.name, role: m.role, domain: m.domain, batch: m.batch, isCoreTeam: m.isCoreTeam, bio: m.bio || "", academicYear: m.academicYear?.toString() || yearFilter }); setFile(null); setShowForm(true); };

  const save = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (file) fd.append("photo", file);
    try {
      if (editing) await api.team.update(editing._id, fd);
      else await api.team.create(fd);
      setMsg("Saved!"); setShowForm(false); loadTeam();
    } catch { setMsg("Error saving member."); }
  };

  const del = async (id: string) => { if (confirm("Delete this member?")) { await api.team.delete(id); loadTeam(); } };
  const delApp = async (id: string) => { await api.contact.delete(id); loadApps(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-display text-sm font-bold tracking-wider uppercase">Team Manager</h2>
          <div className="flex rounded-lg border border-border bg-secondary/50 p-1">
            <button onClick={() => setView("members")} className={`flex items-center gap-1.5 px-3 py-1 font-display text-[9px] tracking-widest transition-all ${view === "members" ? "bg-background text-accent shadow-sm" : "text-muted-foreground"}`}><Users className="h-3 w-3" /> MEMBERS</button>
            <button onClick={() => setView("apps")} className={`flex items-center gap-1.5 px-3 py-1 font-display text-[9px] tracking-widest transition-all ${view === "apps" ? "bg-background text-accent shadow-sm" : "text-muted-foreground"}`}><UserPlus className="h-3 w-3" /> APPLICATIONS</button>
          </div>
          {view === "members" && (
            <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-1 text-[9px] font-bold tracking-widest uppercase focus:outline-none">
              {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}-{y-1999}</option>)}
            </select>
          )}
        </div>
        {view === "members" && (
          <button onClick={openNew} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-display text-[10px] tracking-widest text-background hover:bg-accent/90 transition-all"><Plus className="h-3.5 w-3.5" />ADD MEMBER</button>
        )}
      </div>

      {msg && <p className="rounded-lg bg-accent/10 px-4 py-2 text-xs text-accent">{msg}</p>}

      {view === "members" ? (
        <>
          {showForm && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-2xl">
              <h3 className="font-display text-xs font-bold tracking-wider uppercase">{editing ? "Edit Member" : "New Member"}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[["name", "Name"], ["role", "Role"], ["batch", "Batch (e.g. 2022-26)"]].map(([k, l]) => (
                  <div key={k}><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">{l}</label>
                    <input value={form[k]} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none" /></div>
                ))}
                <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Academic Year</label>
                  <input type="number" value={form.academicYear} onChange={e => setForm((f: any) => ({ ...f, academicYear: e.target.value }))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none" /></div>
                <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Domain</label>
                  <select value={form.domain} onChange={e => setForm((f: any) => ({ ...f, domain: e.target.value }))} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none">
                    {["Web Development", "AI/ML", "IoT", "Design", "Cybersecurity", "Core"].map(d => <option key={d}>{d}</option>)}</select></div>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" checked={form.isCoreTeam} onChange={e => setForm((f: any) => ({ ...f, isCoreTeam: e.target.checked }))} className="h-4 w-4 rounded border-border bg-secondary text-accent" />
                  <label className="font-display text-[9px] tracking-widest text-muted-foreground uppercase">Is Core Team</label>
                </div>
                <div><label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Photo</label>
                  <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-xs text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-[10px] file:font-bold file:text-foreground" /></div>
              </div>
              <div className="flex gap-3">
                <button onClick={save} className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 font-display text-[10px] tracking-widest text-background uppercase"><Check className="h-3.5 w-3.5" />Save</button>
                <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-5 py-2 font-display text-[10px] tracking-widest text-muted-foreground hover:text-foreground uppercase">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(m => (
              <div key={m._id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/30">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-secondary">
                  {m.photo && <img src={m.photo.startsWith('http') ? m.photo : `${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${m.photo}`} className="h-full w-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xs font-bold tracking-wide truncate">{m.name}</p>
                  <p className="text-[9px] text-muted-foreground uppercase">{m.role} · {m.batch}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(m)} className="p-1.5 text-muted-foreground hover:text-foreground"><Edit className="h-3.5 w-3.5" /></button>
                  <button onClick={() => del(m._id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-md"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Applications Header/Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary/30 p-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">Total Apps</p>
                <p className="text-xl font-black text-foreground">{apps.length}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">Pending</p>
                <p className="text-xl font-black text-accent">{apps.filter(a => a.status === 'pending').length}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'reviewing', 'shortlisted', 'accepted', 'rejected'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setView(view)} // Placeholder for actual filter logic if needed, currently showing all
                  className="rounded-lg px-3 py-1.5 font-display text-[9px] font-bold tracking-widest uppercase border border-border hover:bg-accent hover:text-background transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {apps.map(a => <ApplicationCard key={a._id} app={a} onUpdate={loadApps} onDelete={() => delApp(a._id)} />)}
            {apps.length === 0 && (
              <div className="py-20 text-center uppercase tracking-widest text-muted-foreground text-[10px]">No membership applications yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const STATUS_CONFIG: Record<string, { color: string, icon: any }> = {
  pending: { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: Clock },
  reviewing: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Search },
  shortlisted: { color: "text-purple-400 bg-purple-400/10 border-purple-400/20", icon: Trophy },
  accepted: { color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle },
  rejected: { color: "text-red-400 bg-red-400/10 border-red-400/20", icon: XCircle },
};

function ApplicationCard({ app, onUpdate, onDelete }: { app: any, onUpdate: () => void, onDelete: () => void }) {
  const [notes, setNotes] = useState(app.notes || "");
  const [isSaving, setIsSaving] = useState(false);
  const config = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;

  const updateApp = async (data: any) => {
    try {
      setIsSaving(true);
      await api.contact.update(app._id, data);
      onUpdate();
    } catch { alert("Update failed"); }
    finally { setIsSaving(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all hover:border-accent/30">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Info Section */}
        <div className="flex-1 p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-lg font-black tracking-widest uppercase text-foreground">{app.name}</h3>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${config.color}`}>
                  <config.icon className="h-3 w-3" /> {app.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {app.email}
                <span className="text-border">|</span>
                <Clock className="h-3.5 w-3.5" /> {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              {app.resumeUrl && (
                <a 
                  href={app.resumeUrl.startsWith('http') ? app.resumeUrl : `${import.meta.env.VITE_API_URL.replace('/api', '')}${app.resumeUrl}`} 
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-display text-[9px] font-black tracking-widest text-background hover:scale-105 transition-all uppercase shadow-lg shadow-accent/20"
                >
                  <FileDown className="h-3.5 w-3.5" /> View Resume
                </a>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-secondary/50 p-5">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2 flex items-center gap-2">
              <ClipboardList className="h-3.5 w-3.5" /> Statement of Interest
            </p>
            <p className="text-sm text-foreground leading-relaxed italic">"{app.message}"</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(STATUS_CONFIG).map(s => (
              <button 
                key={s} 
                onClick={() => updateApp({ status: s })}
                disabled={app.status === s}
                className={`rounded-lg px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-all ${app.status === s ? "bg-accent/10 text-accent border border-accent/20" : "bg-secondary text-muted-foreground hover:bg-accent/10 hover:text-accent"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Internal Admin Section */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-secondary/20 p-6 md:p-8 space-y-4">
          <div>
            <label className="mb-2 block font-display text-[9px] font-black tracking-widest text-muted-foreground uppercase">Internal Admin Notes</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="h-32 w-full rounded-2xl border border-border bg-card p-4 text-xs focus:outline-none focus:border-accent transition-all resize-none"
              placeholder="Add interview feedback or notes..."
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => updateApp({ notes })}
              disabled={isSaving || notes === app.notes}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 font-display text-[9px] font-black tracking-widest text-background hover:bg-accent transition-all uppercase disabled:opacity-30"
            >
              <Save className="h-3.5 w-3.5" /> {isSaving ? "Saving..." : "Save Notes"}
            </button>
            <button 
              onClick={onDelete}
              className="flex items-center justify-center rounded-xl bg-red-500/10 p-2.5 text-red-400 hover:bg-red-500 hover:text-background transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderPanel({ label }: { label: string }) {
  return <div className="py-20 text-center"><TrendingUp className="mx-auto mb-3 h-10 w-10 text-muted-foreground" /><p className="text-sm text-muted-foreground">{label} management panel coming soon.</p></div>;
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/admin");
  }, [user, isLoading, navigate]);

  const handleLogout = () => { logout(); navigate("/admin"); };

  if (isLoading) return <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">Loading…</div>;
  if (!user) return null;

  const panels: Record<string, ReactNode> = {
    overview:     <OverviewPanel />,
    events:       <EventsPanel />,
    gallery:      <GalleryPanel />,
    team:         <TeamPanel />,
    documents:    <DocumentsPanel />,
    messages:     <MessagesPanel />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 border-b border-border bg-card px-6 py-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="flex-1">
            <p className="font-display text-xs font-bold tracking-wider">{NAV.find(n => n.id === active)?.label.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 font-display text-xs font-bold text-accent">
              {user.name?.[0]?.toUpperCase() || "A"}
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">{user.name}</span>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {panels[active]}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// ─── Documents Panel ──────────────────────────────────────────────────────────
function DocumentsPanel() {
  const [docs, setDocs] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({ type: "", year: "" });
  const [form, setForm] = useState<any>({ title: "", type: "Report", event: "", year: new Date().getFullYear().toString() });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = () => api.documents.getAll(filter).then(r => setDocs(r.data || [])).catch(() => {});
  const loadEvents = () => api.events.getAll({ limit: "200" }).then(r => setEvents(r.data || [])).catch(() => {});

  useEffect(() => { load(); }, [filter]);
  useEffect(() => { loadEvents(); }, []);

  const handleUpload = async () => {
    if (!file || !form.title) return alert("Title and File are required");
    setUploading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v as string));
    fd.append("file", file);
    try {
      await api.documents.create(fd);
      setShowForm(false);
      setForm({ title: "", type: "Report", event: "", year: new Date().getFullYear().toString() });
      setFile(null);
      load();
    } catch { alert("Failed to upload document"); }
    finally { setUploading(false); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    await api.documents.delete(id);
    load();
  };

  const DOC_TYPES = ["Report", "Permission Letter", "Budget", "Certificate", "Other"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-bold tracking-wider uppercase">Repository & Documents</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-display text-[10px] tracking-widest text-background hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
          <Plus className="h-3.5 w-3.5" /> UPLOAD DOCUMENT
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs focus:outline-none" placeholder="e.g. Workshop Report" />
            </div>
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs focus:outline-none">
                {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Related Event (Optional)</label>
              <select value={form.event} onChange={e => setForm({ ...form, event: e.target.value })} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs focus:outline-none">
                <option value="">None</option>
                {events.map(ev => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-widest text-muted-foreground uppercase">Year</label>
              <input type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="text-[10px] text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-4 file:py-2 file:text-[10px] file:font-bold file:text-accent" />
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Cancel</button>
              <button onClick={handleUpload} disabled={uploading} className="rounded-lg bg-accent px-6 py-2 font-display text-[10px] font-bold text-background uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-accent/20">
                {uploading ? "Uploading..." : "Save Document"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-accent transition-colors" />
           <input placeholder="Search documents..." className="w-full rounded-xl border border-border bg-card px-9 py-2.5 text-xs focus:outline-none focus:border-accent/50 transition-all" />
        </div>
        <select value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })} className="rounded-xl border border-border bg-card px-4 text-xs focus:outline-none">
          <option value="">All Types</option>
          {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Docs Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {docs.map(doc => (
          <div key={doc._id} className="group relative rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-all">
              {doc.type === "Report" ? <FileText className="h-6 w-6" /> : <FileDown className="h-6 w-6" />}
            </div>
            <h3 className="font-display text-xs font-black tracking-widest uppercase text-foreground">{doc.title}</h3>
            <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase">{doc.type} · {doc.year}</p>
            {doc.event && <p className="mt-2 truncate text-[10px] text-accent/80 font-medium">Event: {doc.event.title}</p>}
            
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <a 
                href={doc.url.startsWith('http') ? doc.url : `${import.meta.env.VITE_API_URL.replace('/api', '')}${doc.url}`} 
                target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 font-display text-[9px] font-bold tracking-widest text-accent hover:underline uppercase"
              >
                <Download className="h-3 w-3" /> View/Download
              </a>
              <button onClick={() => del(doc._id)} className="text-muted-foreground hover:text-red-400 transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {docs.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/20" />
            <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">No documents found in the repository</p>
          </div>
        )}
      </div>
    </div>
  );
}
