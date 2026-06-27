import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { useState } from "react";
import { Save, FileSpreadsheet } from "lucide-react";

export const Route = createFileRoute("/docente/notas")({ component: DocNotas });

const initialStudents = [
  {code:"2021-001",name:"Ana García",ep:16,ef:15,obs:""},
  {code:"2021-002",name:"Carlos Ramírez",ep:13,ef:12,obs:""},
  {code:"2021-003",name:"María López",ep:18,ef:17,obs:"Participación excelente"},
  {code:"2021-004",name:"José Torres",ep:10,ef:9,obs:"Necesita apoyo"},
  {code:"2021-005",name:"Lucía Mendoza",ep:15,ef:16,obs:""},
  {code:"2021-006",name:"Pedro Vargas",ep:14,ef:13,obs:""},
  {code:"2021-007",name:"Sandra Ruiz",ep:17,ef:18,obs:"Mejor del grupo"},
  {code:"2021-008",name:"Miguel Flores",ep:11,ef:10,obs:""},
];

function DocNotas() {
  const [course, setCourse] = useState("IS-401");
  const [tab, setTab] = useState("Examen Parcial");
  const [students, setStudents] = useState(initialStudents);

  const update = (idx:number, field:"ep"|"ef"|"obs", val:string) => {
    setStudents(prev => prev.map((s,i) => i===idx ? {...s,[field]:field==="obs"?val:Number(val)} : s));
  };

  const avg = (s:{ep:number;ef:number}) => ((s.ep + s.ef)/2).toFixed(1);
  const classAvg = (students.reduce((a,s)=>a+(s.ep+s.ef)/2,0)/students.length).toFixed(1);

  return (
    <Layout role="Docente">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Registro de Notas</h1>
          <select value={course} onChange={e=>setCourse(e.target.value)} className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#15803d]">
            <option value="IS-401">Ingeniería de Software II</option>
            <option value="IS-301">Ingeniería de Software I</option>
            <option value="AW-201">Arquitectura Web</option>
          </select>
        </div>

        <div className="flex gap-1 border-b border-[#e8e8e4]">
          {["Examen Parcial","Examen Final","Trabajos","Promedio Final"].map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition ${t===tab?"border-[#15803d] text-[#15803d]":"border-transparent text-[#6b7280] hover:text-[#374151]"}`}>{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                  <th className="pb-3 font-semibold">Código</th><th className="pb-3 font-semibold">Estudiante</th>
                  <th className="pb-3 font-semibold">EP (0-20)</th><th className="pb-3 font-semibold">EF (0-20)</th>
                  <th className="pb-3 font-semibold">Promedio</th><th className="pb-3 font-semibold">Estado</th>
                  <th className="pb-3 font-semibold">Observación</th>
                </tr></thead>
                <tbody>
                  {students.map((s,i)=>{
                    const a = parseFloat(avg(s));
                    const pass = a >= 11;
                    return (
                      <tr key={s.code} className={`border-b border-[#f3f3f0] last:border-0 ${pass?"bg-[#dcfce7]/15":"bg-[#fee2e2]/15"}`}>
                        <td className="py-2.5 font-mono text-xs text-[#6b7280]">{s.code}</td>
                        <td className="py-2.5 font-semibold text-sm">{s.name}</td>
                        <td className="py-2.5"><input type="number" min={0} max={20} value={s.ep} onChange={e=>update(i,"ep",e.target.value)} className="w-16 px-2 py-1 border border-[#e8e8e4] rounded-lg text-sm text-center focus:outline-none focus:border-[#15803d]"/></td>
                        <td className="py-2.5"><input type="number" min={0} max={20} value={s.ef} onChange={e=>update(i,"ef",e.target.value)} className="w-16 px-2 py-1 border border-[#e8e8e4] rounded-lg text-sm text-center focus:outline-none focus:border-[#15803d]"/></td>
                        <td className="py-2.5 font-bold" style={{color:pass?"#15803d":"#b91c1c"}}>{avg(s)}</td>
                        <td className="py-2.5"><Badge variant={pass?"success":"danger"}>{pass?"Aprobado":"Desaprobado"}</Badge></td>
                        <td className="py-2.5"><input value={s.obs} onChange={e=>update(i,"obs",e.target.value)} placeholder="Observación..." className="w-full px-2 py-1 border border-[#e8e8e4] rounded-lg text-xs focus:outline-none focus:border-[#15803d]"/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 mt-5 pt-4 border-t border-[#e8e8e4]">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#15803d] text-white text-sm font-semibold rounded-lg hover:bg-[#166534]"><Save size={15}/>Guardar cambios</button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#dcfce7] text-[#15803d] text-sm font-semibold rounded-lg hover:bg-[#bbf7d0]"><FileSpreadsheet size={15}/>Exportar Excel</button>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-4 text-[#15803d] uppercase tracking-wide">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Promedio clase</span><span className="font-bold text-[#15803d]">{classAvg}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Nota más alta</span><span className="font-bold">{Math.max(...students.map(s=>(s.ep+s.ef)/2)).toFixed(1)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Nota más baja</span><span className="font-bold text-[#b91c1c]">{Math.min(...students.map(s=>(s.ep+s.ef)/2)).toFixed(1)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">% aprobados</span><span className="font-bold text-[#15803d]">{Math.round(students.filter(s=>(s.ep+s.ef)/2>=11).length/students.length*100)}%</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Total evaluados</span><span className="font-bold">{students.length}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
