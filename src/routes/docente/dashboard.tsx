import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard, ProgressBar } from "../../components/Layout";
import { BookMarked, Users, BarChart3, ClipboardCheck, AlertCircle, CheckCircle2, Hand } from "lucide-react";

export const Route = createFileRoute("/docente/dashboard")({ component: DocDashboard });

const courses = [
  { code:"IS-401", name:"Ingeniería de Software II", credits:4, students:142, schedule:"Lun-Mié 18:00-20:00", avg:14.6, progress:65 },
  { code:"IS-301", name:"Ingeniería de Software I", credits:4, students:98, schedule:"Mar-Jue 16:00-18:00", avg:13.8, progress:80 },
  { code:"AW-201", name:"Arquitectura Web", credits:3, students:54, schedule:"Sáb 09:00-13:00", avg:15.2, progress:50 },
];

const pending = [
  { task:"Revisar entrega — Proyecto BD", count:35, urgency:"danger" as const },
  { task:"Calificar Examen Parcial IS-401", count:28, urgency:"warning" as const },
  { task:"Responder mensajes de estudiantes", count:5, urgency:"warning" as const },
  { task:"Subir material Sesión 10", count:0, urgency:"default" as const },
];

function DocDashboard() {
  return (
    <Layout role="Docente">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Bienvenido, Dr. Roberto Mendoza <Hand size={24} className="text-[#15803d]" />
          </h1>
          <p className="text-sm text-[#6b7280] mt-1">Martes, 19 de mayo 2026 · Ciclo 2026-I</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Cursos a cargo" value="3" icon={BookMarked} color="#15803d" bgLight="#dcfce7" />
          <StatCard label="Total estudiantes" value="294" icon={Users} color="#15803d" bgLight="#dcfce7" />
          <StatCard label="Promedio mis cursos" value="14.6" icon={BarChart3} color="#15803d" bgLight="#dcfce7" />
          <StatCard label="Tareas por revisar" value="68" icon={ClipboardCheck} color="#b45309" bgLight="#fef3c7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3 p-6">
            <h2 className="font-semibold mb-4">Mis cursos este ciclo</h2>
            <div className="space-y-4">
              {courses.map(c => (
                <div key={c.code} className="p-4 border border-[#e8e8e4] rounded-xl hover:border-[#15803d]/40 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-xs text-[#6b7280]">{c.code} · {c.credits} cr. · {c.schedule}</div>
                    </div>
                    <Badge variant="green">{c.students} est.</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar value={c.progress} color="#15803d" />
                    <span className="text-xs font-semibold text-[#15803d] flex-shrink-0">{c.progress}%</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-1.5 bg-[#15803d] text-white text-xs font-semibold rounded-lg hover:bg-[#166534]">Ver estudiantes</button>
                    <button className="flex-1 px-3 py-1.5 border border-[#15803d] text-[#15803d] text-xs font-semibold rounded-lg hover:bg-[#dcfce7]">Subir material</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6">
            <h2 className="font-semibold mb-4">Actividades pendientes</h2>
            <div className="space-y-3">
              {pending.map(p => (
                <div key={p.task} className="flex items-start gap-3 p-3 rounded-lg border border-[#e8e8e4]">
                  <AlertCircle size={16} className={p.urgency==="danger"?"text-[#b91c1c]":p.urgency==="warning"?"text-[#b45309]":"text-[#6b7280]"} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{p.task}</div>
                    {p.count>0&&<div className="text-xs text-[#6b7280] mt-0.5">{p.count} pendiente{p.count!==1?"s":""}</div>}
                  </div>
                  <Badge variant={p.urgency==="danger"?"danger":p.urgency==="warning"?"warning":"default"}>
                    {p.urgency==="danger"?"Urgente":p.urgency==="warning"?"Pronto":"—"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5 bg-[#dcfce7] border-[#bbf7d0] flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#bbf7d0] text-[#15803d] flex items-center justify-center flex-shrink-0"><CheckCircle2 size={18}/></div>
          <div>
            <div className="font-bold text-[#15803d]">Período de entrega de notas: abierto</div>
            <p className="text-sm text-[#15803d] mt-0.5">Tienes hasta el 30/05/2026 para registrar las notas finales del ciclo 2026-I en el sistema.</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
