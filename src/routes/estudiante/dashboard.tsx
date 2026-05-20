import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard, ProgressBar } from "../../components/Layout";
import { BookOpen, GraduationCap, CreditCard, Mail, Bell, Hand, ArrowUpRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/estudiante/dashboard")({ component: EstDashboard });

const courses = [
  { code: "IS-401", name: "Ingeniería de Software II", teacher: "Dr. R. Mendoza", credits: 4, progress: 65, grade: 15, status: "En curso" },
  { code: "BD-302", name: "Base de Datos Avanzada", teacher: "Mg. P. Salinas", credits: 4, progress: 80, grade: 16, status: "En curso" },
  { code: "RC-205", name: "Redes y Comunicaciones", teacher: "Ing. C. Vargas", credits: 5, progress: 45, grade: 13, status: "En curso" },
  { code: "AC-101", name: "Algoritmos y Complejidad", teacher: "Dr. L. Paredes", credits: 5, progress: 100, grade: 17, status: "Aprobado" },
];

const events = [
  { date: "21 May", title: "Entrega proyecto BD", module: "Base de Datos" },
  { date: "23 May", title: "Examen Parcial - Redes", module: "Redes" },
  { date: "25 May", title: "Exposición grupal IS", module: "Ing. Software" },
  { date: "28 May", title: "Laboratorio 5", module: "Algoritmos" },
];

function EstDashboard() {
  return (
    <Layout role="Estudiante">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Welcome Banner Card */}
        <div className="gradient-student rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg select-none">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 2px)", backgroundSize: "24px 24px" }} />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold mb-3">
                <GraduationCap size={12} className="text-blue-100" /> Ciclo Académico 2026-I
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2.5">
                ¡Hola, Ana García! <Hand size={28} className="text-yellow-300 animate-bounce" />
              </h1>
              <p className="text-sm text-blue-100/90 mt-2 font-medium max-w-xl">
                Bienvenida a tu portal de Campus360. Tienes clases pendientes hoy y 3 mensajes sin leer en tu bandeja de entrada.
              </p>
            </div>
            <div className="text-left md:text-right bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-200">Fecha de hoy</span>
              <span className="block text-lg font-bold">Martes, 19 de mayo</span>
              <span className="block text-[11px] text-blue-200 font-semibold mt-0.5">Semana 11 de clases</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Cursos activos" value="4" icon={BookOpen} color="#1e40af" bgLight="#eff6ff" />
          <StatCard label="Promedio general" value="15.3" sub="Líder de promoción" icon={GraduationCap} color="#059669" bgLight="#ecfdf5" />
          <StatCard label="Créditos matriculados" value="18" icon={CreditCard} color="#7c3aed" bgLight="#f5f3ff" />
          <StatCard label="Mensajes sin leer" value="3" icon={Mail} color="#d97706" bgLight="#fffbeb" />
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Active Courses Table Card */}
          <Card className="lg:col-span-3 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-extrabold text-slate-800 tracking-tight">Mis cursos en este ciclo</h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Seguimiento académico en tiempo real</p>
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Ver matrícula <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-slate-700">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-slate-100 text-[10px] uppercase font-extrabold tracking-wider">
                      <th className="pb-3">Curso</th>
                      <th className="pb-3">Docente</th>
                      <th className="pb-3 text-center">Cr.</th>
                      <th className="pb-3">Avance</th>
                      <th className="pb-3 text-center">Nota</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {courses.map((c) => (
                      <tr key={c.code} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-sm text-slate-800">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold tracking-wide mt-0.5">{c.code}</div>
                        </td>
                        <td className="py-4 text-xs font-semibold text-slate-500">{c.teacher}</td>
                        <td className="py-4 text-center text-xs font-bold">{c.credits}</td>
                        <td className="py-4 w-32">
                          <div className="flex items-center gap-2">
                            <ProgressBar value={c.progress} color={c.status === "Aprobado" ? "#059669" : "#1e40af"} />
                            <span className="text-[10px] font-bold text-slate-500">{c.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-center font-extrabold text-sm text-slate-800">{c.grade}</td>
                        <td className="py-4 text-right">
                          <Badge variant={c.status === "Aprobado" ? "success" : "primary"}>{c.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Upcoming Activities Card */}
          <Card className="lg:col-span-2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-extrabold text-slate-800 tracking-tight">Actividades pendientes</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Próximos plazos y entregas</p>
              </div>
              <Calendar size={16} className="text-slate-400" />
            </div>
            <div className="space-y-3.5 flex-1">
              {events.map((e) => (
                <div key={e.title} className="flex gap-4 p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/80 hover:shadow-sm transition-all duration-300 group">
                  <div className="bg-blue-50 text-blue-700 rounded-xl px-2.5 py-2 text-xs font-extrabold flex-shrink-0 text-center min-w-[54px] flex flex-col justify-center border border-blue-100/50 group-hover:bg-blue-100 transition-colors">
                    <span className="block leading-none">{e.date.split(" ")[0]}</span>
                    <span className="block text-[9px] uppercase font-bold tracking-wider mt-0.5 text-blue-600">{e.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="text-xs font-bold text-slate-800 leading-snug group-hover:text-blue-900 transition-colors">{e.title}</div>
                    <div className="mt-1.5"><Badge variant="default">{e.module}</Badge></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Global Announcement Panel */}
        <div className="p-5 bg-amber-50 border border-amber-200/50 rounded-2xl flex items-start gap-4 shadow-sm animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Bell size={18} className="animate-swing" />
          </div>
          <div>
            <div className="font-bold text-amber-800 text-sm">Anuncio importante</div>
            <p className="text-xs text-amber-700/90 mt-1 font-semibold leading-relaxed">
              La matrícula para el ciclo 2026-II estará abierta del 19 al 30 de mayo. Revisa tu carga académica y posibles cruces de horarios antes de confirmar tu inscripción final.
            </p>
          </div>
        </div>
        
      </div>
    </Layout>
  );
}

