import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, StatCard } from "../../components/Layout";
import { Users, BookMarked, BarChart3, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/dashboard")({ component: AdminDashboard });

const facultyData = [{name:"Ingeniería",promedio:14.2},{name:"Ciencias",promedio:13.8},{name:"Salud",promedio:15.1},{name:"Negocios",promedio:13.4},{name:"Humanidades",promedio:12.9}];
const distrib = [{name:"Aprobados",value:78,color:"#15803d"},{name:"Desaprobados",value:14,color:"#b91c1c"},{name:"Retirados",value:8,color:"#b45309"}];
const alerts = [
  {type:"danger",icon:AlertCircle,msg:"34 estudiantes con riesgo académico detectados"},
  {type:"warning",icon:Clock,msg:"Período de registro de notas cierra en 11 días"},
  {type:"success",icon:CheckCircle2,msg:"Backups automáticos del sistema: OK"},
];

function AdminDashboard() {
  return (
    <Layout role="Administrador">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración — Campus360</h1>
          <p className="text-sm text-[#6b7280] mt-1">Martes, 19 de mayo 2026 · Ciclo 2026-I</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total estudiantes" value="20,847" sub="↑ 2.3% vs ciclo anterior" icon={Users} color="#7c3aed" bgLight="#ede9fe"/>
          <StatCard label="Docentes activos" value="342" sub="↑ 5 nuevos" icon={BookMarked} color="#7c3aed" bgLight="#ede9fe"/>
          <StatCard label="Cursos activos" value="128" icon={BarChart3} color="#7c3aed" bgLight="#ede9fe"/>
          <StatCard label="Promedio institucional" value="13.6" icon={TrendingUp} color="#7c3aed" bgLight="#ede9fe"/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Rendimiento por facultad</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={facultyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f0"/>
                  <XAxis dataKey="name" tick={{fontSize:11}}/>
                  <YAxis domain={[0,20]} tick={{fontSize:11}}/>
                  <Tooltip/>
                  <Bar dataKey="promedio" fill="#7c3aed" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Distribución de estados académicos</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distrib} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85}>
                    {distrib.map(d=><Cell key={d.name} fill={d.color}/>)}
                  </Pie>
                  <Tooltip/><Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Alertas del sistema</h2>
          <div className="space-y-3">
            {alerts.map((a,i)=>(
              <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border ${
                a.type==="danger"?"bg-[#fee2e2] border-[#fecaca]":a.type==="warning"?"bg-[#fef3c7] border-[#fde68a]":"bg-[#dcfce7] border-[#bbf7d0]"
              }`}>
                <a.icon size={18} className={a.type==="danger"?"text-[#b91c1c]":a.type==="warning"?"text-[#b45309]":"text-[#15803d]"}/>
                <span className={`text-sm font-semibold ${a.type==="danger"?"text-[#b91c1c]":a.type==="warning"?"text-[#b45309]":"text-[#15803d]"}`}>{a.msg}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
