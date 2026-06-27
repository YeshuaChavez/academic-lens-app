import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, ProgressBar } from "../../components/Layout";
import { useState } from "react";

export const Route = createFileRoute("/docente/cursos")({ component: DocCursos });

const courses = [
  { code:"IS-401", name:"Ingeniería de Software II", credits:4, students:142, schedule:"Lun-Mié 18:00-20:00", avg:14.6, progress:65,
    roster:[
      {code:"2021-001",name:"Ana García",ep:16,ef:15,avg:15.5,status:"Aprobado"},
      {code:"2021-002",name:"Carlos Ramírez",ep:13,ef:12,avg:12.5,status:"Aprobado"},
      {code:"2021-003",name:"María López",ep:18,ef:17,avg:17.5,status:"Aprobado"},
      {code:"2021-004",name:"José Torres",ep:10,ef:9,avg:9.5,status:"Desaprobado"},
      {code:"2021-005",name:"Lucía Mendoza",ep:15,ef:16,avg:15.5,status:"Aprobado"},
      {code:"2021-006",name:"Pedro Vargas",ep:14,ef:13,avg:13.5,status:"Aprobado"},
    ]
  },
  { code:"IS-301", name:"Ingeniería de Software I", credits:4, students:98, schedule:"Mar-Jue 16:00-18:00", avg:13.8, progress:80, roster:[] },
  { code:"AW-201", name:"Arquitectura Web", credits:3, students:54, schedule:"Sáb 09:00-13:00", avg:15.2, progress:50, roster:[] },
];

function DocCursos() {
  const [expanded, setExpanded] = useState<string|null>("IS-401");
  return (
    <Layout role="Docente">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Mis Cursos — Ciclo 2026-I</h1>
        <div className="space-y-6">
          {courses.map(c => (
            <Card key={c.code} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1"><Badge variant="green">{c.code}</Badge><Badge variant="default">{c.credits} créditos</Badge></div>
                    <h2 className="text-lg font-bold">{c.name}</h2>
                    <p className="text-sm text-[#6b7280]">{c.schedule} · {c.students} estudiantes matriculados</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#15803d]">{c.avg}</div>
                    <div className="text-xs text-[#6b7280]">promedio grupo</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4"><ProgressBar value={c.progress} color="#15803d"/><span className="text-xs font-semibold text-[#15803d]">{c.progress}% del ciclo</span></div>
                <div className="flex gap-2">
                  <button onClick={() => setExpanded(expanded===c.code?null:c.code)} className="px-4 py-2 bg-[#15803d] text-white text-sm font-semibold rounded-lg hover:bg-[#166534]">
                    {expanded===c.code?"Ocultar estudiantes":"Ver estudiantes"}
                  </button>
                  <button className="px-4 py-2 border border-[#15803d] text-[#15803d] text-sm font-semibold rounded-lg hover:bg-[#dcfce7]">Subir material</button>
                </div>
              </div>
              {expanded===c.code && c.roster.length>0 && (
                <div className="border-t border-[#e8e8e4] px-6 pb-6 pt-4">
                  <h3 className="font-semibold text-sm mb-3 text-[#6b7280] uppercase tracking-wide">Lista de estudiantes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase">
                        <th className="pb-2 font-semibold">Código</th><th className="pb-2 font-semibold">Estudiante</th>
                        <th className="pb-2 font-semibold">EP</th><th className="pb-2 font-semibold">EF</th>
                        <th className="pb-2 font-semibold">Promedio</th><th className="pb-2 font-semibold">Estado</th>
                        <th className="pb-2 font-semibold">Acciones</th>
                      </tr></thead>
                      <tbody>
                        {c.roster.map(s => (
                          <tr key={s.code} className={`border-b border-[#f3f3f0] last:border-0 ${s.status==="Aprobado"?"bg-[#dcfce7]/10":"bg-[#fee2e2]/10"}`}>
                            <td className="py-2.5 font-mono text-xs text-[#6b7280]">{s.code}</td>
                            <td className="py-2.5 font-semibold">{s.name}</td>
                            <td className="py-2.5">{s.ep}</td><td className="py-2.5">{s.ef}</td>
                            <td className="py-2.5 font-bold text-[#15803d]">{s.avg}</td>
                            <td className="py-2.5"><Badge variant={s.status==="Aprobado"?"success":"danger"}>{s.status}</Badge></td>
                            <td className="py-2.5"><button className="text-xs text-[#15803d] font-semibold hover:underline">Ver detalle</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
