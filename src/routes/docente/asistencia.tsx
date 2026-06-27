import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { useState } from "react";

export const Route = createFileRoute("/docente/asistencia")({ component: DocAsistencia });

type AttStatus = "Presente"|"Tardanza"|"Falta"|"Justificado";

const roster = ["Ana García","Carlos Ramírez","María López","José Torres","Lucía Mendoza","Pedro Vargas","Sandra Ruiz","Miguel Flores"];
const history = [
  {date:"12/05/2026",presentes:7,tardanzas:1,faltas:0,pct:100},
  {date:"14/05/2026",presentes:6,tardanzas:1,faltas:1,pct:87},
  {date:"07/05/2026",presentes:8,tardanzas:0,faltas:0,pct:100},
  {date:"05/05/2026",presentes:7,tardanzas:0,faltas:1,pct:87},
  {date:"28/04/2026",presentes:6,tardanzas:2,faltas:0,pct:100},
];

const statusColor:Record<AttStatus,string> = {
  Presente:"#15803d", Tardanza:"#b45309", Falta:"#b91c1c", Justificado:"#1A56A0"
};
const statusBg:Record<AttStatus,string> = {
  Presente:"#dcfce7", Tardanza:"#fef3c7", Falta:"#fee2e2", Justificado:"#EBF3FB"
};

function DocAsistencia() {
  const [attendance, setAttendance] = useState<Record<string,AttStatus>>(
    Object.fromEntries(roster.map(n=>[n,"Presente" as AttStatus]))
  );

  const counts = {
    Presente: Object.values(attendance).filter(v=>v==="Presente").length,
    Tardanza: Object.values(attendance).filter(v=>v==="Tardanza").length,
    Falta: Object.values(attendance).filter(v=>v==="Falta").length,
    Justificado: Object.values(attendance).filter(v=>v==="Justificado").length,
  };

  return (
    <Layout role="Docente">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Control de Asistencia</h1>

        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Curso</label>
            <select className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#15803d]">
              <option>Ingeniería de Software II — IS-401</option>
              <option>Ingeniería de Software I — IS-301</option>
              <option>Arquitectura Web — AW-201</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Fecha</label>
            <input type="date" defaultValue="2026-05-19" className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#15803d]"/>
          </div>
          <button className="px-4 py-2 bg-[#15803d] text-white text-sm font-semibold rounded-lg hover:bg-[#166534]">Registrar sesión</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Sesión: Martes 19 de Mayo 2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                  <th className="pb-3 font-semibold">Estudiante</th>
                  <th className="pb-3 font-semibold">Estado</th>
                  <th className="pb-3 font-semibold">Observación</th>
                </tr></thead>
                <tbody>
                  {roster.map(name=>(
                    <tr key={name} className="border-b border-[#f3f3f0] last:border-0">
                      <td className="py-3 font-semibold">{name}</td>
                      <td className="py-3">
                        <div className="flex gap-1 flex-wrap">
                          {(["Presente","Tardanza","Falta","Justificado"] as AttStatus[]).map(s=>(
                            <button key={s} onClick={()=>setAttendance(p=>({...p,[name]:s}))}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition"
                              style={attendance[name]===s
                                ? {background:statusColor[s],color:"white"}
                                : {background:statusBg[s],color:statusColor[s]}}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3"><input placeholder="Observación..." className="w-full px-2 py-1 border border-[#e8e8e4] rounded-lg text-xs focus:outline-none focus:border-[#15803d]"/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 mt-4 pt-4 border-t border-[#e8e8e4]">
              <button className="px-5 py-2.5 bg-[#15803d] text-white text-sm font-semibold rounded-lg hover:bg-[#166534]">Guardar asistencia</button>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-4 text-[#15803d] uppercase tracking-wide">Resumen sesión</h3>
              {([["Presente",counts.Presente,"#15803d","#dcfce7"],["Tardanza",counts.Tardanza,"#b45309","#fef3c7"],["Falta",counts.Falta,"#b91c1c","#fee2e2"],["Justificado",counts.Justificado,"#1A56A0","#EBF3FB"]] as [string,number,string,string][]).map(([label,count,color,bg])=>(
                <div key={label} className="flex items-center justify-between p-2.5 rounded-lg mb-2" style={{background:bg}}>
                  <span className="text-sm font-semibold" style={{color}}>{label}</span>
                  <span className="text-lg font-bold" style={{color}}>{count}</span>
                </div>
              ))}
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-3 text-[#6b7280] uppercase tracking-wide">Historial reciente</h3>
              {history.map(h=>(
                <div key={h.date} className="flex items-center justify-between py-2 border-b border-[#f3f3f0] last:border-0">
                  <span className="text-xs text-[#374151]">{h.date}</span>
                  <span className="text-xs font-bold text-[#15803d]">{h.pct}%</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
