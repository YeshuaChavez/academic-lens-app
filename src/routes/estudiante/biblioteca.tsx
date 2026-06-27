import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, Bookmark, BookOpen, FileText, Video, GraduationCap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudiante/biblioteca")({ component: EstBiblioteca });

const resources = [
  { title: "Ingeniería de Software", author: "Roger S. Pressman", year: 2020, type: "Libro", icon: BookOpen, color: "#1A56A0" },
  { title: "Fundamentos de BD — Silberschatz", author: "Abraham Silberschatz", year: 2019, type: "Libro", icon: BookOpen, color: "#15803d" },
  { title: "Patrones de diseño en microservicios", author: "Chris Richardson", year: 2022, type: "Artículo", icon: FileText, color: "#b45309" },
  { title: "Machine Learning aplicado a salud pública", author: "Dra. M. Quispe", year: 2024, type: "Tesis", icon: GraduationCap, color: "#7c3aed" },
  { title: "Introducción a Kubernetes", author: "CNCF Foundation", year: 2023, type: "Video", icon: Video, color: "#b91c1c" },
  { title: "Algoritmos y Estructuras de Datos", author: "Thomas H. Cormen", year: 2021, type: "Libro", icon: BookOpen, color: "#1A56A0" },
];

const filters = ["Todos","Libros","Artículos","Tesis","Videos"];

function EstBiblioteca() {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? resources : resources.filter(r => r.type === active.slice(0,-1) || r.type === active);
  return (
    <Layout role="Estudiante">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Biblioteca Virtual</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            <input placeholder="Buscar libros, artículos, tesis..." className="w-full pl-9 pr-3 py-2.5 border border-[#e8e8e4] rounded-lg text-sm bg-white focus:outline-none focus:border-[#1A56A0]" />
          </div>
          <button className="px-5 py-2.5 bg-[#1A56A0] text-white rounded-lg text-sm font-semibold hover:bg-[#134680]">Buscar</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${active === f ? "bg-[#1A56A0] text-white border-[#1A56A0]" : "bg-white border-[#e8e8e4] text-[#374151] hover:border-[#1A56A0]"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(r => (
              <Card key={r.title} className="p-5 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: r.color }}>
                    <r.icon size={19} />
                  </div>
                  <button className="text-[#6b7280] hover:text-[#1A56A0] p-1"><Bookmark size={15} /></button>
                </div>
                <h3 className="font-bold text-sm leading-snug flex-1">{r.title}</h3>
                <p className="text-xs text-[#6b7280] mt-1">{r.author} · {r.year}</p>
                <div className="mt-2"><Badge variant="primary">{r.type}</Badge></div>
                <button className="mt-4 text-sm font-semibold text-[#1A56A0] hover:underline text-left">Ver recurso →</button>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-3">Recursos recientes</h3>
              <ul className="space-y-2.5">
                {resources.slice(0,3).map(r => (
                  <li key={r.title} className="text-xs text-[#374151] hover:text-[#1A56A0] cursor-pointer flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: r.color }} />
                    {r.title}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-3">Mis marcadores</h3>
              <ul className="space-y-2.5">
                {resources.slice(2,5).map(r => (
                  <li key={r.title} className="flex items-center gap-2 text-xs text-[#374151]">
                    <Bookmark size={12} className="text-[#1A56A0] flex-shrink-0" />
                    <span className="truncate">{r.title}</span>
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
