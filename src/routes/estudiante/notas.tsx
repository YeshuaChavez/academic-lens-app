import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, StatCard, Badge } from "../../components/Layout";
import { Download, BarChart2, CheckCircle2, AlertTriangle, GraduationCap, Trophy } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";

export const Route = createFileRoute("/estudiante/notas")({ component: EstNotas });

const grades = [
  { code: "IS-401", name: "Ingeniería de Software II", credits: 4, ep: 16, ef: 15, avg: 15.5, status: "Aprobado" },
  { code: "BD-302", name: "Base de Datos Avanzada", credits: 4, ep: 17, ef: 16, avg: 16.5, status: "Aprobado" },
  { code: "RC-205", name: "Redes y Comunicaciones", credits: 5, ep: 13, ef: 14, avg: 13.5, status: "Aprobado" },
  { code: "AC-101", name: "Algoritmos y Complejidad", credits: 5, ep: 17, ef: 18, avg: 17.5, status: "Aprobado" },
];

function EstNotas() {
  const [tab, setTab] = useState("2026-I");
  return (
    <Layout role="Estudiante">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Header section with PDF download */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Registro de Calificaciones</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Reporte oficial e historial de rendimiento académico</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all cursor-pointer">
            <Download size={14} /> Descargar Reporte PDF
          </button>
        </div>

        {/* Cycle Switcher Tabs */}
        <div className="flex gap-1.5 border-b border-slate-100 pb-px">
          {["2026-I", "2025-II", "2025-I"].map(t => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px transition-all duration-300 cursor-pointer ${
                t === tab 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              Ciclo {t}
            </button>
          ))}
        </div>

        {/* Stat Summaries */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Promedio ponderado" value="15.7" sub="Aprobación destacada" icon={Trophy} color="#059669" bgLight="#ecfdf5" />
          <StatCard label="Créditos aprobados" value="18" sub="100% de créditos del ciclo" icon={CheckCircle2} color="#1e40af" bgLight="#eff6ff" />
          <StatCard label="Cursos desaprobados" value="0" sub="Ninguno este ciclo" icon={AlertTriangle} color="#059669" bgLight="#ecfdf5" />
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Detailed Grades Record Card */}
          <Card className="lg:col-span-3 p-6">
            <div className="mb-6">
              <h2 className="font-extrabold text-slate-800 tracking-tight">Detalle de calificaciones</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Calificaciones obtenidas en evaluaciones parciales y finales</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-slate-700">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100 text-[10px] uppercase font-extrabold tracking-wider">
                    <th className="pb-3">Curso / Código</th>
                    <th className="pb-3 text-center">Créditos</th>
                    <th className="pb-3 text-center">EP</th>
                    <th className="pb-3 text-center">EF</th>
                    <th className="pb-3 text-center">Promedio</th>
                    <th className="pb-3 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {grades.map(g => (
                    <tr key={g.code} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-sm text-slate-800">{g.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold tracking-wide mt-0.5">{g.code}</div>
                      </td>
                      <td className="py-4 text-center text-xs font-bold">{g.credits}</td>
                      <td className="py-4 text-center text-xs font-semibold text-slate-550">{g.ep.toFixed(1)}</td>
                      <td className="py-4 text-center text-xs font-semibold text-slate-550">{g.ef.toFixed(1)}</td>
                      <td className="py-4 text-center font-extrabold text-sm text-blue-700">{g.avg.toFixed(1)}</td>
                      <td className="py-4 text-right">
                        <Badge variant={g.status === "Aprobado" ? "success" : "danger"}>{g.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Performance chart */}
          <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-extrabold text-slate-800 tracking-tight">Evolución académica</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Comparativa de promedios por asignatura</p>
            </div>
            
            <div className="h-60 mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={grades.map(g => ({ name: g.code, nota: g.avg }))} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 20]} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "#fff", fontSize: "11px", fontWeight: "700" }} 
                    cursor={{ fill: "#f8fafc" }}
                  />
                  <Bar dataKey="nota" radius={[6, 6, 0, 0]} maxBarSize={32}>
                    {grades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.avg >= 14 ? "#1e40af" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] font-bold mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-700" /> Rendimiento Alto (&gt;=14)
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Rendimiento Regular (&lt;14)
              </div>
            </div>
          </Card>

        </div>

      </div>
    </Layout>
  );
}

