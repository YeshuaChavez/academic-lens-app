import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard } from "../../components/Layout";
import { Search, UserPlus, Pencil, Trash2, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/usuarios")({ component: AdminUsuarios });

const users = [
  {id:"2021-001",name:"Ana García",email:"ana.garcia@innovatec.edu.pe",role:"Estudiante",faculty:"Ingeniería",active:true,last:"Hoy 10:32"},
  {id:"DOC-042",name:"Dr. Roberto Mendoza",email:"r.mendoza@innovatec.edu.pe",role:"Docente",faculty:"Ingeniería",active:true,last:"Hoy 08:15"},
  {id:"2022-187",name:"Carlos Ramírez",email:"c.ramirez@innovatec.edu.pe",role:"Estudiante",faculty:"Ciencias",active:true,last:"Ayer"},
  {id:"ADM-003",name:"Dirección Académica",email:"admin@innovatec.edu.pe",role:"Administrador",faculty:"—",active:true,last:"Hoy 07:00"},
  {id:"DOC-018",name:"Mg. Patricia Salinas",email:"p.salinas@innovatec.edu.pe",role:"Docente",faculty:"Ingeniería",active:false,last:"Hace 3 días"},
  {id:"2023-044",name:"María López",email:"m.lopez@innovatec.edu.pe",role:"Estudiante",faculty:"Salud",active:true,last:"Hoy 11:00"},
  {id:"DOC-067",name:"Ing. Carlos Vargas",email:"c.vargas@innovatec.edu.pe",role:"Docente",faculty:"Ingeniería",active:true,last:"Hace 2 horas"},
  {id:"2021-299",name:"Pedro Vargas",email:"p.vargas@innovatec.edu.pe",role:"Estudiante",faculty:"Negocios",active:false,last:"Hace 1 semana"},
];

const roleVariant = (r:string) => r==="Estudiante"?"primary":r==="Docente"?"green":"purple";

function AdminUsuarios() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const filtered = users.filter(u=>(filter==="Todos"||u.role===filter)&&(u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase())));

  return (
    <Layout role="Administrador">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total usuarios" value="21,231" icon={Users} color="#7c3aed" bgLight="#ede9fe"/>
          <StatCard label="Activos" value="20,891" color="#15803d" bgLight="#dcfce7"/>
          <StatCard label="Inactivos" value="340" color="#b91c1c" bgLight="#fee2e2"/>
          <StatCard label="Nuevos este mes" value="127" color="#b45309" bgLight="#fef3c7"/>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar usuario..." className="w-full pl-9 pr-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"/>
          </div>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]">
            <option>Todos</option><option>Estudiante</option><option>Docente</option><option>Administrador</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white rounded-lg text-sm font-semibold hover:bg-[#6d28d9]"><UserPlus size={15}/>Agregar usuario</button>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                <th className="pb-3 font-semibold">ID</th><th className="pb-3 font-semibold">Nombre</th>
                <th className="pb-3 font-semibold">Correo</th><th className="pb-3 font-semibold">Rol</th>
                <th className="pb-3 font-semibold">Facultad</th><th className="pb-3 font-semibold">Estado</th>
                <th className="pb-3 font-semibold">Último acceso</th><th className="pb-3 font-semibold">Acciones</th>
              </tr></thead>
              <tbody>
                {filtered.map(u=>(
                  <tr key={u.id} className="border-b border-[#f3f3f0] last:border-0 hover:bg-[#f8f8f6]">
                    <td className="py-3 font-mono text-xs text-[#6b7280]">{u.id}</td>
                    <td className="py-3 font-semibold">{u.name}</td>
                    <td className="py-3 text-xs text-[#374151]">{u.email}</td>
                    <td className="py-3"><Badge variant={roleVariant(u.role) as any}>{u.role}</Badge></td>
                    <td className="py-3 text-xs">{u.faculty}</td>
                    <td className="py-3">
                      <div className={`flex items-center gap-1.5 w-fit px-2 py-1 rounded-full text-xs font-semibold ${u.active?"bg-[#dcfce7] text-[#15803d]":"bg-[#fee2e2] text-[#b91c1c]"}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{background:u.active?"#15803d":"#b91c1c"}}/>
                        {u.active?"Activo":"Inactivo"}
                      </div>
                    </td>
                    <td className="py-3 text-xs text-[#6b7280]">{u.last}</td>
                    <td className="py-3"><div className="flex gap-1">
                      <button className="p-1.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#ede9fe] rounded"><Pencil size={14}/></button>
                      <button className="p-1.5 text-[#6b7280] hover:text-[#b91c1c] hover:bg-[#fee2e2] rounded"><Trash2 size={14}/></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e8e8e4]">
            <span className="text-xs text-[#6b7280]">Mostrando {filtered.length} de {users.length} usuarios</span>
            <div className="flex gap-1">
              {["←","1","2","3","...","100","→"].map(p=>(
                <button key={p} className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition ${p==="1"?"bg-[#7c3aed] text-white border-[#7c3aed]":"border-[#e8e8e4] text-[#374151] hover:border-[#7c3aed]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
