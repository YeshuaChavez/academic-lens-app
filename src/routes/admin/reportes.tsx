import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard } from "../../components/Layout";
import { FileSpreadsheet, FileText, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/reportes")({ component: AdminReportes });

const stats = [{label:"Total estudiantes",value:"20,847"},{label:"Docentes activos",value:"342"},{label:"Cursos activos",value:"128"},{label:"Promedio institucional",value:"13.6"}];
const facultyData = [{name:"Ingeniería",promedio:14.2},{name:"Ciencias",promedio:13.8},{name:"Salud",promedio:15.1},{name:"Negocios",promedio:13.4},{name:"Humanidades",promedio:12.9}];
const distrib = [{name:"Aprobados",value:78,color:"#15803d"},{name:"Desaprobados",value:14,color:"#b91c1c"},{name:"Retirados",value:8,color:"#b45309"}];
const rows = [
  {course:"Ingeniería de Software II",faculty:"Ingeniería",enrolled:142,passed:89,teacher:"Dr. R. Mendoza"},
  {course:"Anatomía Humana",faculty:"Salud",enrolled:210,passed:92,teacher:"Dra. C. Ríos"},
  {course:"Cálculo Diferencial",faculty:"Ciencias",enrolled:318,passed:71,teacher:"Mg. J. Vega"},
  {course:"Marketing Digital",faculty:"Negocios",enrolled:187,passed:85,teacher:"Mg. A. Soto"},
  {course:"Filosofía Contemporánea",faculty:"Humanidades",enrolled:96,passed:79,teacher:"Dr. F. Pérez"},
  {course:"Base de Datos Avanzada",faculty:"Ingeniería",enrolled:178,passed:83,teacher:"Mg. P. Salinas"},
];

function AdminReportes() {
  return (
    <Layout role="Administrador">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Reportes Administrativos</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#15803d] text-white rounded-lg text-sm font-semibold hover:bg-[#166534]"><FileSpreadsheet size={15}/>Exportar Excel</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded-lg text-sm font-semibold hover:bg-[#991b1b]"><FileText size={15}/>Exportar PDF</button>
          </div>
        </div>

        <Card className="p-5">
          <div className="flex flex-wrap gap-3 items-end">
            <div><label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Facultad</label>
              <select className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"><option>Todas las facultades</option><option>Ingeniería</option><option>Salud</option><option>Ciencias</option></select></div>
            <div><label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Ciclo</label>
              <select className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"><option>2026-I</option><option>2025-II</option><option>2025-I</option></select></div>
            <div><label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Desde</label>
              <input type="date" defaultValue="2026-03-01" className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"/></div>
            <div><label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1">Hasta</label>
              <input type="date" defaultValue="2026-07-31" className="px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"/></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white rounded-lg text-sm font-semibold hover:bg-[#6d28d9]"><Filter size={15}/>Aplicar filtros</button>
          </div>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s=><Card key={s.label} className="p-5"><p className="text-xs text-[#6b7280] font-medium">{s.label}</p><p className="text-2xl font-bold mt-1 text-[#7c3aed]">{s.value}</p></Card>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6"><h2 className="font-semibold mb-4">Rendimiento por facultad</h2><div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={facultyData}><CartesianGrid strokeDasharray="3 3" stroke="#f3f3f0"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis domain={[0,20]} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="promedio" fill="#7c3aed" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></Card>
          <Card className="p-6"><h2 className="font-semibold mb-4">Distribución de estados</h2><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={distrib} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85}>{distrib.map(d=><Cell key={d.name} fill={d.color}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></div></Card>
        </div>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Reporte de matriculados por curso</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                <th className="pb-3 font-semibold">Curso</th><th className="pb-3 font-semibold">Facultad</th>
                <th className="pb-3 font-semibold">Matriculados</th><th className="pb-3 font-semibold">Aprobados %</th>
                <th className="pb-3 font-semibold">Docente</th><th className="pb-3 font-semibold">Acciones</th>
              </tr></thead>
              <tbody>
                {rows.map(r=>(
                  <tr key={r.course} className="border-b border-[#f3f3f0] last:border-0">
                    <td className="py-3 font-semibold">{r.course}</td>
                    <td className="py-3 text-[#374151]">{r.faculty}</td>
                    <td className="py-3 font-semibold">{r.enrolled}</td>
                    <td className="py-3"><Badge variant={r.passed>=85?"success":r.passed>=70?"warning":"danger"}>{r.passed}%</Badge></td>
                    <td className="py-3 text-xs">{r.teacher}</td>
                    <td className="py-3"><button className="text-[#7c3aed] hover:underline text-sm font-semibold">Ver detalle</button></td>
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
