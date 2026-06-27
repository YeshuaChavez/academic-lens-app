import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, X, CheckCircle2 } from "lucide-react";
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
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Matrícula — Ciclo 2026-II</h1>
        <div className="p-4 rounded-xl bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} /> Período de matrícula abierto: 19/05/2026 — 30/05/2026
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar curso..."
                  className="w-full pl-9 pr-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#1A56A0]" />
              </div>
              <select className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none"><option>Área: Todas</option><option>Ingeniería</option></select>
              <select className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none"><option>Créditos: Todos</option><option>3</option><option>4</option><option>5</option></select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                    <th className="pb-3 font-semibold">Código</th><th className="pb-3 font-semibold">Curso</th>
                    <th className="pb-3 font-semibold">Cr.</th><th className="pb-3 font-semibold">Horario</th>
                    <th className="pb-3 font-semibold">Docente</th><th className="pb-3 font-semibold">Vac.</th><th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => {
                    const isSel = selected.includes(c.code);
                    return (
                      <tr key={c.code} className={`border-b border-[#f3f3f0] last:border-0 ${isSel ? "bg-[#EBF3FB]/40" : ""}`}>
                        <td className="py-3 font-mono text-xs text-[#6b7280]">{c.code}</td>
                        <td className="py-3 font-semibold">{c.name}</td>
                        <td className="py-3">{c.credits}</td>
                        <td className="py-3 text-xs text-[#6b7280]">{c.schedule}</td>
                        <td className="py-3 text-xs">{c.teacher}</td>
                        <td className="py-3"><span className={`text-xs font-semibold ${c.seats < 10 ? "text-[#b91c1c]" : "text-[#15803d]"}`}>{c.seats}</span></td>
                        <td className="py-3">
                          <button onClick={() => setSelected(s => isSel ? s.filter(x => x !== c.code) : [...s, c.code])}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${isSel ? "bg-[#fee2e2] text-[#b91c1c] hover:bg-[#fecaca]" : "bg-[#1A56A0] text-white hover:bg-[#134680]"}`}>
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

          <div>
            <Card className="p-6 sticky top-20">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold">Mi carga académica</h2>
                <Badge variant="warning">Pendiente</Badge>
              </div>
              <p className="text-xs text-[#6b7280] mb-4">Matrícula pendiente de confirmación</p>
              <div className="space-y-2 mb-4 min-h-[80px]">
                {selectedCourses.length === 0 && <p className="text-sm text-[#6b7280] italic">Sin cursos seleccionados</p>}
                {selectedCourses.map((c) => (
                  <div key={c.code} className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8f8f6] border border-[#e8e8e4]">
                    <div className="min-w-0"><div className="text-sm font-semibold truncate">{c.name}</div><div className="text-xs text-[#6b7280]">{c.code} · {c.credits} cr.</div></div>
                    <button onClick={() => setSelected(s => s.filter(x => x !== c.code))} className="text-[#b91c1c] hover:bg-[#fee2e2] p-1 rounded ml-2"><X size={13} /></button>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e8e8e4] pt-3 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6b7280]">Total créditos</span>
                  <span className="font-bold" style={{ color: total > 22 ? "#b91c1c" : "#1A56A0" }}>{total}/22 máx.</span>
                </div>
                <div className="h-2 bg-[#f3f3f0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.min((total / 22) * 100, 100)}%`, background: total > 22 ? "#b91c1c" : "#1A56A0" }} />
                </div>
              </div>
              <button className="w-full bg-[#1A56A0] hover:bg-[#134680] text-white font-semibold py-2.5 rounded-lg transition">Confirmar matrícula</button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
