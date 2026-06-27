import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard } from "../../components/Layout";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/cursos")({ component: AdminCursos });

const courses = [
  {code:"IS-401",name:"Ingeniería de Software II",faculty:"Ingeniería",credits:4,teacher:"Dr. R. Mendoza",enrolled:142,active:true},
  {code:"BD-302",name:"Base de Datos Avanzada",faculty:"Ingeniería",credits:4,teacher:"Mg. P. Salinas",enrolled:178,active:true},
  {code:"AN-201",name:"Anatomía Humana",faculty:"Salud",credits:6,teacher:"Dra. C. Ríos",enrolled:210,active:true},
  {code:"CA-101",name:"Cálculo Diferencial",faculty:"Ciencias",credits:5,teacher:"Mg. J. Vega",enrolled:318,active:true},
  {code:"MK-301",name:"Marketing Digital",faculty:"Negocios",credits:4,teacher:"Mg. A. Soto",enrolled:187,active:true},
  {code:"FI-101",name:"Filosofía Contemporánea",faculty:"Humanidades",credits:3,teacher:"Dr. F. Pérez",enrolled:96,active:false},
  {code:"IA-401",name:"Inteligencia Artificial",faculty:"Ingeniería",credits:5,teacher:"Sin asignar",enrolled:0,active:false},
  {code:"RC-205",name:"Redes y Comunicaciones",faculty:"Ingeniería",credits:5,teacher:"Ing. C. Vargas",enrolled:124,active:true},
];

function AdminCursos() {
  return (
    <Layout role="Administrador">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Gestión de Cursos</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total cursos" value="128" color="#7c3aed" bgLight="#ede9fe"/>
          <StatCard label="Con docente asignado" value="124" color="#15803d" bgLight="#dcfce7"/>
          <StatCard label="Sin docente" value="4" color="#b91c1c" bgLight="#fee2e2"/>
          <StatCard label="Nuevos este ciclo" value="12" color="#b45309" bgLight="#fef3c7"/>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"/>
            <input placeholder="Buscar curso..." className="w-full pl-9 pr-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"/>
          </div>
          <select className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]">
            <option>Todas las facultades</option><option>Ingeniería</option><option>Salud</option><option>Ciencias</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white rounded-lg text-sm font-semibold hover:bg-[#6d28d9]"><Plus size={15}/>Agregar curso</button>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                <th className="pb-3 font-semibold">Código</th><th className="pb-3 font-semibold">Nombre del curso</th>
                <th className="pb-3 font-semibold">Facultad</th><th className="pb-3 font-semibold">Cr.</th>
                <th className="pb-3 font-semibold">Docente asignado</th><th className="pb-3 font-semibold">Matriculados</th>
                <th className="pb-3 font-semibold">Estado</th><th className="pb-3 font-semibold">Acciones</th>
              </tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.code} className="border-b border-[#f3f3f0] last:border-0 hover:bg-[#f8f8f6]">
                    <td className="py-3 font-mono text-xs text-[#6b7280]">{c.code}</td>
                    <td className="py-3 font-semibold">{c.name}</td>
                    <td className="py-3"><Badge variant="purple">{c.faculty}</Badge></td>
                    <td className="py-3">{c.credits}</td>
                    <td className="py-3 text-xs">{c.teacher==="Sin asignar"?<span className="text-[#b91c1c] font-semibold">{c.teacher}</span>:c.teacher}</td>
                    <td className="py-3 font-semibold">{c.enrolled}</td>
                    <td className="py-3">
                      <div className={`flex items-center gap-1.5 w-fit px-2 py-1 rounded-full text-xs font-semibold ${c.active?"bg-[#dcfce7] text-[#15803d]":"bg-[#fee2e2] text-[#b91c1c]"}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{background:c.active?"#15803d":"#b91c1c"}}/>
                        {c.active?"Activo":"Inactivo"}
                      </div>
                    </td>
                    <td className="py-3"><div className="flex gap-1">
                      <button className="p-1.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#ede9fe] rounded"><Pencil size={14}/></button>
                      <button className="p-1.5 text-[#6b7280] hover:text-[#b91c1c] hover:bg-[#fee2e2] rounded"><Trash2 size={14}/></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
