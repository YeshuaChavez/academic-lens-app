import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, X, CheckCircle2, AlertCircle, Sparkles, BookOpen } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudiante/matricula")({ component: EstMatricula });

const catalog = [
  { code: "IS-501", name: "Arquitectura de Software", credits: 4, schedule: "Lun-Mié 18:00-20:00", teacher: "Dr. R. Mendoza", seats: 12 },
  { code: "BD-402", name: "Big Data y Analítica", credits: 4, schedule: "Mar-Jue 16:00-18:00", teacher: "Mg. P. Salinas", seats: 8 },
  { code: "IA-301", name: "Inteligencia Artificial", credits: 5, schedule: "Lun-Vie 08:00-10:00", teacher: "Dr. M. Quispe", seats: 5 },
  { code: "SO-203", name: "Sistemas Operativos", credits: 4, schedule: "Mar-Jue 10:00-12:00", teacher: "Ing. C. Vargas", seats: 20 },
  { code: "PW-302", name: "Programación Web Full Stack", credits: 4, schedule: "Mié-Vie 14:00-16:00", teacher: "Mg. J. Torres", seats: 15 },
  { code: "SE-401", name: "Seguridad Informática", credits: 3, schedule: "Sáb 09:00-13:00", teacher: "Dr. F. Ruiz", seats: 18 },
  { code: "CN-101", name: "Cloud Computing", credits: 4, schedule: "Lun-Mié 20:00-22:00", teacher: "Ing. A. Flores", seats: 10 },
  { code: "DV-205", name: "Desarrollo de Videojuegos", credits: 3, schedule: "Sáb 14:00-18:00", teacher: "Mg. L. Cruz", seats: 22 },
];

function EstMatricula() {
  const [selected, setSelected] = useState<string[]>(["IS-501", "BD-402", "PW-302"]);
  const [search, setSearch] = useState("");
  const selectedCourses = catalog.filter((c) => selected.includes(c.code));
  const total = selectedCourses.reduce((s, c) => s + c.credits, 0);
  const filtered = catalog.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout role="Estudiante">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Proceso de Matrícula</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Selección de asignaturas oficiales para el periodo académico 2026-II</p>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-250/30 text-emerald-800 text-xs font-semibold flex items-center gap-3 shadow-sm select-none">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/80 flex items-center justify-center flex-shrink-0 text-emerald-700">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <span className="font-extrabold block">Acceso Habilitado</span>
            <span className="text-[11px] text-emerald-700/90 font-medium">Puedes inscribirte del 19/05/2026 al 30/05/2026. Recuerda no exceder los 22 créditos.</span>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          
          {/* Catalog Selection Card */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Buscar curso por nombre o código..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800 transition-all font-semibold bg-slate-50/50 focus:bg-white" 
                />
              </div>
              <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white focus:outline-none cursor-pointer">
                <option>Facultad: Todas</option>
                <option>Ingeniería de Sistemas</option>
              </select>
              <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white focus:outline-none cursor-pointer">
                <option>Créditos: Todos</option>
                <option>3 Créditos</option>
                <option>4 Créditos</option>
                <option>5 Créditos</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-slate-700">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100 text-[10px] uppercase font-extrabold tracking-wider">
                    <th className="pb-3">Código</th>
                    <th className="pb-3">Curso</th>
                    <th className="pb-3 text-center">Cr.</th>
                    <th className="pb-3">Horario</th>
                    <th className="pb-3">Docente</th>
                    <th className="pb-3 text-center">Vac.</th>
                    <th className="pb-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((c) => {
                    const isSel = selected.includes(c.code);
                    return (
                      <tr key={c.code} className={`hover:bg-slate-50/50 transition-colors ${isSel ? "bg-blue-50/20" : ""}`}>
                        <td className="py-4 font-mono text-[10px] font-extrabold text-slate-400">{c.code}</td>
                        <td className="py-4 font-bold text-sm text-slate-800">{c.name}</td>
                        <td className="py-4 text-center text-xs font-extrabold">{c.credits}</td>
                        <td className="py-4 text-xs font-semibold text-slate-500">{c.schedule}</td>
                        <td className="py-4 text-xs font-semibold text-slate-500">{c.teacher}</td>
                        <td className="py-4 text-center">
                          <span className={`text-xs font-extrabold ${c.seats < 10 ? "text-red-650 bg-red-50 px-2 py-0.5 rounded-full" : "text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded-full"}`}>
                            {c.seats}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => setSelected(s => isSel ? s.filter(x => x !== c.code) : [...s, c.code])}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                              isSel 
                                ? "bg-red-50 text-red-650 hover:bg-red-100" 
                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                            }`}
                          >
                            {isSel ? "Quitar" : "Agregar"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Sticky Panel - Sidebar */}
          <div className="relative">
            <Card className="p-6 sticky top-24 border border-slate-100 premium-card-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                    <BookOpen size={16} className="text-blue-600" /> Mi Carga
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border bg-amber-50 text-amber-600 border-amber-200">
                    Pendiente
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mb-4 leading-normal">Revisa tus asignaturas y confirma tu matrícula final.</p>
                
                <div className="space-y-2 mb-5 max-h-[280px] overflow-y-auto pr-1">
                  {selectedCourses.length === 0 ? (
                    <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                      <p className="text-[11px] font-bold text-slate-400 italic">No has agregado cursos aún</p>
                    </div>
                  ) : (
                    selectedCourses.map((c) => (
                      <div key={c.code} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-sm transition-shadow">
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold text-slate-800 truncate leading-snug">{c.name}</div>
                          <div className="text-[9px] text-slate-400 font-bold tracking-wide mt-0.5 uppercase">{c.code} · {c.credits} CR.</div>
                        </div>
                        <button 
                          onClick={() => setSelected(s => s.filter(x => x !== c.code))} 
                          className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between text-xs font-bold mb-2 text-slate-600">
                  <span>Créditos Totales</span>
                  <span className={total > 22 ? "text-red-600" : "text-blue-700"}>{total}/22 máx.</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-5 border border-slate-200/20">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ 
                      width: `${Math.min((total / 22) * 100, 100)}%`, 
                      backgroundColor: total > 22 ? "#ef4444" : "#1e40af" 
                    }} 
                  />
                </div>
                
                <button 
                  disabled={selected.length === 0 || total > 22}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:cursor-not-allowed"
                >
                  Confirmar Matrícula
                </button>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </Layout>
  );
}

