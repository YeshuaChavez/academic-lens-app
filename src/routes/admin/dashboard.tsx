import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, StatCard, Badge } from "../../components/Layout";
import { Users, BookMarked, BarChart3, TrendingUp, AlertCircle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/dashboard")({ component: AdminDashboard });

const facultyData = [
  { name: "Ingeniería", promedio: 14.2 },
  { name: "Ciencias", promedio: 13.8 },
  { name: "Salud", promedio: 15.1 },
  { name: "Negocios", promedio: 13.4 },
  { name: "Humanidades", promedio: 12.9 },
];

const distrib = [
  { name: "Aprobados", value: 78, color: "#059669" },
  { name: "Desaprobados", value: 14, color: "#ef4444" },
  { name: "Retirados", value: 8, color: "#d97706" },
];

const alerts = [
  { type: "danger", icon: AlertCircle, msg: "34 estudiantes con riesgo académico detectados" },
  { type: "warning", icon: Clock, msg: "Período de registro de notas cierra en 11 días" },
  { type: "success", icon: CheckCircle2, msg: "Backups automáticos del sistema: OK" },
];

function AdminDashboard() {
  return (
    <Layout role="Administrador">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Welcome Banner Card */}
        <div className="gradient-admin rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg select-none">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 2px)", backgroundSize: "24px 24px" }} />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold mb-3">
                🛡️ Panel de Control del Sistema
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2.5">
                Dirección Académica
              </h1>
              <p className="text-sm text-purple-100/90 mt-2 font-medium max-w-xl">
                Bienvenido al portal institucional. Visualiza métricas de rendimiento escolar general, gestiona usuarios y monitorea alertas del sistema.
              </p>
            </div>
            <div className="text-left md:text-right bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-purple-200">Estado general</span>
              <span className="block text-lg font-bold">Todos los sistemas OK</span>
              <span className="block text-[11px] text-purple-200 font-semibold mt-0.5">Último backup hace 2 horas</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total estudiantes" value="20,847" sub="↑ 2.3% vs ciclo anterior" icon={Users} color="#7c3aed" bgLight="#f5f3ff" />
          <StatCard label="Docentes activos" value="342" sub="↑ 5 nuevos contratados" icon={BookMarked} color="#7c3aed" bgLight="#f5f3ff" />
          <StatCard label="Cursos activos" value="128" sub="Sin cruces reportados" icon={BarChart3} color="#7c3aed" bgLight="#f5f3ff" />
          <StatCard label="Promedio institucional" value="13.6" sub="Rendimiento promedio" icon={TrendingUp} color="#7c3aed" bgLight="#f5f3ff" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bar Chart card */}
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-extrabold text-slate-800 tracking-tight">Rendimiento por facultad</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Promedio de calificaciones en el ciclo actual 2026-I</p>
            </div>
            <div className="h-60 mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={facultyData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 750, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 20]} tick={{ fontSize: 10, fontWeight: 750, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "#fff", fontSize: "11px", fontWeight: "700" }} 
                    cursor={{ fill: "#f8fafc" }}
                  />
                  <Bar dataKey="promedio" fill="#7c3aed" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart card */}
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-extrabold text-slate-800 tracking-tight">Distribución de estados académicos</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Porcentaje de estudiantes según situación escolar</p>
            </div>
            <div className="h-60 mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distrib} dataKey="value" nameKey="name" innerRadius={60} outerRadius={85} paddingAngle={4}>
                    {distrib.map(d => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", color: "#fff", fontSize: "11px", fontWeight: "700" }} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    iconType="circle" 
                    wrapperStyle={{ fontSize: "10px", fontWeight: "700", color: "#64748b" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

        </div>

        {/* System Alerts */}
        <Card className="p-6">
          <div className="mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldAlert size={16} />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-800 tracking-tight">Registro de eventos y alertas del sistema</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Notificaciones automatizadas del Campus360</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-350 ${
                  a.type === "danger" 
                    ? "bg-red-50/50 border-red-100 text-red-700" 
                    : a.type === "warning" 
                      ? "bg-amber-50/50 border-amber-100 text-amber-700" 
                      : "bg-emerald-50/50 border-emerald-100 text-emerald-700"
                }`}
              >
                <a.icon size={18} className={a.type === "danger" ? "text-red-500" : a.type === "warning" ? "text-amber-500" : "text-emerald-500"} />
                <span className="text-xs font-bold leading-none">{a.msg}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </Layout>
  );
}

