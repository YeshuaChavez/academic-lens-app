import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, StatCard, Badge } from "../../components/Layout";
import { Download } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

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
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Mis Notas — Ciclo {tab}</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A56A0] text-white rounded-lg text-sm font-semibold hover:bg-[#134680]">
            <Download size={15} /> Descargar reporte PDF
          </button>
        </div>

        <div className="flex gap-1 border-b border-[#e8e8e4]">
          {["2026-I","2025-II","2025-I"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition ${t === tab ? "border-[#1A56A0] text-[#1A56A0]" : "border-transparent text-[#6b7280] hover:text-[#374151]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Promedio del ciclo" value="14.8" color="#1A56A0" />
          <StatCard label="Créditos aprobados" value="18" color="#15803d" bgLight="#dcfce7" />
          <StatCard label="Cursos desaprobados" value="0" color="#15803d" bgLight="#dcfce7" />
        </div>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Detalle de notas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                  <th className="pb-3 font-semibold">Curso</th><th className="pb-3 font-semibold">Cr.</th>
                  <th className="pb-3 font-semibold">EP</th><th className="pb-3 font-semibold">EF</th>
                  <th className="pb-3 font-semibold">Promedio</th><th className="pb-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(g => (
                  <tr key={g.code} className={`border-b border-[#f3f3f0] last:border-0 ${g.status === "Aprobado" ? "bg-[#dcfce7]/20" : "bg-[#fee2e2]/20"}`}>
                    <td className="py-3"><div className="font-semibold">{g.name}</div><div className="text-xs text-[#6b7280]">{g.code}</div></td>
                    <td className="py-3">{g.credits}</td>
                    <td className="py-3 font-medium">{g.ep}</td>
                    <td className="py-3 font-medium">{g.ef}</td>
                    <td className="py-3 font-bold text-[#1A56A0] text-base">{g.avg}</td>
                    <td className="py-3"><Badge variant={g.status === "Aprobado" ? "success" : "danger"}>{g.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Evolución de rendimiento</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grades.map(g => ({ name: g.code, nota: g.avg }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 20]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="nota" fill="#1A56A0" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
