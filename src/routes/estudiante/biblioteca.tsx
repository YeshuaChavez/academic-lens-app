import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, Bookmark, BookOpen, FileText, Video, GraduationCap, Compass, FolderOpen } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudiante/biblioteca")({ component: EstBiblioteca });

const resources = [
  { 
    title: "Ingeniería de Software", 
    author: "Roger S. Pressman", 
    year: 2020, 
    type: "Libro", 
    icon: BookOpen, 
    color: "#1e40af", 
    cover: "/books/software_eng.png" 
  },
  { 
    title: "Fundamentos de BD — Silberschatz", 
    author: "Abraham Silberschatz", 
    year: 2019, 
    type: "Libro", 
    icon: BookOpen, 
    color: "#059669", 
    cover: "/books/database.png" 
  },
  { 
    title: "Patrones de diseño en microservicios", 
    author: "Chris Richardson", 
    year: 2022, 
    type: "Artículo", 
    icon: FileText, 
    color: "#d97706", 
    cover: "/books/microservices.png" 
  },
  { 
    title: "Machine Learning aplicado a salud pública", 
    author: "Dra. M. Quispe", 
    year: 2024, 
    type: "Tesis", 
    icon: GraduationCap, 
    color: "#7c3aed", 
    cover: null,
    svgType: "ml"
  },
  { 
    title: "Introducción a Kubernetes", 
    author: "CNCF Foundation", 
    year: 2023, 
    type: "Video", 
    icon: Video, 
    color: "#ef4444", 
    cover: null,
    svgType: "k8s"
  },
  { 
    title: "Algoritmos y Estructuras de Datos", 
    author: "Thomas H. Cormen", 
    year: 2021, 
    type: "Libro", 
    icon: BookOpen, 
    color: "#2563eb", 
    cover: null,
    svgType: "algo"
  },
];

const filters = ["Todos", "Libros", "Artículos", "Tesis", "Videos"];

function RenderDefaultCover({ type, title, color }: { type: string; title: string; color: string }) {
  // Generates a beautiful SVG book cover dynamically
  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden rounded-r-xl"
      style={{ 
        background: `linear-gradient(145deg, ${color}dd, ${color})`,
        boxShadow: "inset 4px 0 10px rgba(0,0,0,0.15), inset -1px 0 3px rgba(255,255,255,0.2)"
      }}
    >
      {/* Texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
      {/* Book Spine border line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/20" />
      <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-white/20" />
      
      <div className="relative z-10 flex justify-between items-center text-white/80">
        <span className="text-[9px] font-bold uppercase tracking-widest">{type}</span>
        <Compass size={14} className="opacity-70 animate-spin-slow" />
      </div>

      <div className="relative z-10 my-auto text-center px-1">
        <h4 className="text-white text-xs font-extrabold leading-snug line-clamp-3 uppercase tracking-wide">
          {title}
        </h4>
      </div>

      <div className="relative z-10 text-[8px] font-semibold text-white/60 tracking-wider border-t border-white/10 pt-2 flex justify-between">
        <span>CAMPUS360</span>
        <span>2026</span>
      </div>
    </div>
  );
}

function EstBiblioteca() {
  const [active, setActive] = useState("Todos");
  const [search, setSearch] = useState("");
  
  const filtered = resources
    .filter(r => active === "Todos" ? true : r.type === active.slice(0, -1) || r.type === active)
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout role="Estudiante">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Banner Hero Virtual Library */}
        <div className="relative rounded-3xl overflow-hidden h-[240px] flex items-center shadow-lg select-none">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: "url('/library-hero.png')" }}
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />
          
          <div className="relative z-10 px-6 md:px-10 max-w-2xl text-white space-y-4">
            <Badge variant="purple">Biblioteca Digital</Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Explora miles de recursos académicos
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              Accede a libros de texto oficiales, papers de investigación, tesis de grado y materiales audiovisuales seleccionados por tus docentes.
            </p>
          </div>
        </div>

        {/* Search & Filter Actions */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center premium-card-shadow">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por título, autor, palabras clave..." 
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-800 transition-all font-semibold bg-slate-50/50 focus:bg-white" 
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center w-full md:w-auto">
            {filters.map(f => (
              <button 
                key={f} 
                onClick={() => setActive(f)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer ${
                  active === f 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          
          {/* Main Results Grid */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                <FolderOpen size={18} className="text-blue-600" /> Catálogo disponible ({filtered.length})
              </h2>
            </div>
            
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
                <p className="text-sm font-semibold text-slate-400">No se encontraron recursos que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(r => (
                  <Card key={r.title} className="p-4 flex flex-col justify-between premium-card-shadow-hover hover:border-slate-200 border border-transparent transition-all duration-300 group">
                    <div>
                      {/* Book Cover Container with Spine shadow */}
                      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-100 flex items-center justify-center relative shadow-sm border border-slate-100">
                        {r.cover ? (
                          <div className="w-full h-full relative">
                            {/* Book spine simulation on image */}
                            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/15 z-10" />
                            <div className="absolute left-2.5 top-0 bottom-0 w-[1px] bg-white/10 z-10" />
                            <img 
                              src={r.cover} 
                              alt={r.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                          </div>
                        ) : (
                          <RenderDefaultCover type={r.type} title={r.title} color={r.color} />
                        )}
                        <span className="absolute bottom-2.5 right-2.5 z-10">
                          <Badge variant={r.type === "Libro" ? "primary" : r.type === "Tesis" ? "purple" : r.type === "Video" ? "danger" : "warning"}>
                            {r.type}
                          </Badge>
                        </span>
                      </div>
                      
                      <h3 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1.5">{r.author} · {r.year}</p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-50 flex items-center justify-between">
                      <button className="text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer">
                        Ver recurso →
                      </button>
                      <button className="text-slate-400 hover:text-blue-700 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                        <Bookmark size={15} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right Panels */}
          <div className="space-y-6">
            
            {/* Recent Resources */}
            <Card className="p-5">
              <h3 className="font-extrabold text-slate-800 text-sm tracking-tight mb-4 flex items-center gap-2">
                <Bookmark size={15} className="text-blue-600" /> Agregados recientemente
              </h3>
              <ul className="space-y-3.5">
                {resources.slice(0, 3).map(r => (
                  <li key={r.title} className="group cursor-pointer">
                    <div className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors truncate">
                      {r.title}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">{r.author}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* My Bookmarks */}
            <Card className="p-5">
              <h3 className="font-extrabold text-slate-800 text-sm tracking-tight mb-4 flex items-center gap-2">
                <Bookmark size={15} className="text-amber-500 fill-amber-500" /> Mis marcadores
              </h3>
              <ul className="space-y-3.5">
                {resources.slice(2, 5).map(r => (
                  <li key={r.title} className="flex items-center gap-2.5 text-xs font-bold text-slate-600 hover:text-blue-700 cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
                    <span className="truncate flex-1">{r.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
          </div>
        </div>

      </div>
    </Layout>
  );
}

