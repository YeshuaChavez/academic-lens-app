import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard, ProgressBar } from "../../components/Layout";
import { BookMarked, Users, BarChart3, ClipboardCheck, AlertCircle, CheckCircle2, Hand, ArrowRight, Upload } from "lucide-react";

export const Route = createFileRoute("/docente/dashboard")({ component: DocDashboard });

const courses = [
  { code: "IS-401", name: "Ingeniería de Software II", credits: 4, students: 142, schedule: "Lun-Mié 18:00-20:00", avg: 14.6, progress: 65 },
  { code: "IS-301", name: "Ingeniería de Software I", credits: 4, students: 98, schedule: "Mar-Jue 16:00-18:00", avg: 13.8, progress: 80 },
  { code: "AW-201", name: "Arquitectura Web", credits: 3, students: 54, schedule: "Sáb 09:00-13:00", avg: 15.2, progress: 50 },
];

const pending = [
  { task: "Revisar entrega — Proyecto BD", count: 35, urgency: "danger" as const },
  { task: "Calificar Examen Parcial IS-401", count: 28, urgency: "warning" as const },
  { task: "Responder mensajes de estudiantes", count: 5, urgency: "warning" as const },
  { task: "Subir material Sesión 10", count: 0, urgency: "default" as const },
];

function DocDashboard() {
  return (
    <Layout role="Docente">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Welcome Banner Card */}
        <div className="gradient-teacher rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg select-none">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 2px)", backgroundSize: "24px 24px" }} />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold mb-3">
                🏫 Ciclo Académico 2026-I
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2.5">
                ¡Hola, Dr. Roberto! <Hand size={28} className="text-yellow-300 animate-bounce" />
              </h1>
              <p className="text-sm text-emerald-100/90 mt-2 font-medium max-w-xl">
                Bienvenido a tu panel de control académico. Tienes clases programadas hoy por la tarde y exámenes pendientes de revisión.
              </p>
            </div>
            <div className="text-left md:text-right bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-250">Fecha de hoy</span>
              <span className="block text-lg font-bold">Martes, 19 de mayo</span>
              <span className="block text-[11px] text-emerald-200 font-semibold mt-0.5">Semana 11 de clases</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Cursos a cargo" value="3" icon={BookMarked} color="#059669" bgLight="#ecfdf5" />
          <StatCard label="Total estudiantes" value="294" icon={Users} color="#1e40af" bgLight="#eff6ff" />
          <StatCard label="Promedio general" value="14.5" icon={BarChart3} color="#7c3aed" bgLight="#f5f3ff" />
          <StatCard label="Pendientes de revisión" value="68" icon={ClipboardCheck} color="#d97706" bgLight="#fffbeb" />
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Courses List */}
          <Card className="lg:col-span-3 p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-slate-800 tracking-tight">Mis cursos activos</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Seguimiento de avance silábico y promedio de aula</p>
              </div>
            </div>
            <div className="space-y-4">
              {courses.map(c => (
                <div key={c.code} className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-500/20 hover:bg-slate-50/30 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-sm text-slate-800 group-hover:text-emerald-700 transition-colors">{c.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-wide mt-1 uppercase">
                        {c.code} · {c.credits} CRÉDITOS · {c.schedule}
                      </div>
                    </div>
                    <Badge variant="green">{c.students} alumnos</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ProgressBar value={c.progress} color="#059669" />
                    <span className="text-[10px] font-extrabold text-emerald-600 flex-shrink-0">{c.progress}%</span>
                  </div>

                  <div className="flex gap-2.5 mt-4 pt-3.5 border-t border-slate-100">
                    <button className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-500/5 flex items-center justify-center gap-1">
                      Ver Aula Virtual <ArrowRight size={12} />
                    </button>
                    <button className="flex-1 px-3 py-2 border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 text-slate-600 text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 bg-white">
                      <Upload size={12} /> Subir Material
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Tasks Panel */}
          <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h2 className="font-extrabold text-slate-800 tracking-tight">Tareas de corrección</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Entregas de alumnos en espera de revisión</p>
              </div>
              <div className="space-y-3.5">
                {pending.map(p => (
                  <div key={p.task} className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <AlertCircle size={16} className={`mt-0.5 ${p.urgency === "danger" ? "text-red-500 animate-pulse" : p.urgency === "warning" ? "text-amber-500" : "text-slate-400"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 leading-snug">{p.task}</div>
                      {p.count > 0 && <div className="text-[10px] text-slate-400 font-bold tracking-wide mt-1">{p.count} alumnos pendientes</div>}
                    </div>
                    <Badge variant={p.urgency === "danger" ? "danger" : p.urgency === "warning" ? "warning" : "default"}>
                      {p.urgency === "danger" ? "Urgente" : p.urgency === "warning" ? "Pronto" : "Al día"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Global Notice Area */}
        <div className="p-5 bg-emerald-50 border border-emerald-250/30 rounded-2xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <CheckCircle2 size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="font-bold text-emerald-800 text-sm">Carga de calificaciones del ciclo 2026-I</div>
            <p className="text-xs text-emerald-700/90 mt-1 font-semibold leading-relaxed">
              El período oficial de registro de notas finales está abierto. Recuerda registrar los promedios en el sistema antes del 30/05/2026 para evitar recargos administrativos a los estudiantes.
            </p>
          </div>
        </div>
        
      </div>
    </Layout>
  );
}

