import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard, ProgressBar } from "../../components/Layout";
import { BookOpen, GraduationCap, CreditCard, Mail, Bell } from "lucide-react";

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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Bienvenida, Ana García 👋</h1>
          <p className="text-sm text-[#6b7280] mt-1">Martes, 19 de mayo 2026 · Ciclo 2026-I</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Cursos activos" value="4" icon={BookOpen} />
          <StatCard label="Promedio general" value="14.8" sub="sobre 20" icon={GraduationCap} color="#15803d" bgLight="#dcfce7" />
          <StatCard label="Créditos matriculados" value="18" icon={CreditCard} />
          <StatCard label="Mensajes sin leer" value="3" icon={Mail} color="#b45309" bgLight="#fef3c7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3 p-6">
            <h2 className="font-semibold mb-4">Mis cursos este ciclo</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                    <th className="pb-3 font-semibold">Curso</th>
                    <th className="pb-3 font-semibold">Docente</th>
                    <th className="pb-3 font-semibold">Cr.</th>
                    <th className="pb-3 font-semibold">Avance</th>
                    <th className="pb-3 font-semibold">Nota</th>
                    <th className="pb-3 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.code} className="border-b border-[#f3f3f0] last:border-0">
                      <td className="py-3"><div className="font-semibold text-sm">{c.name}</div><div className="text-xs text-[#6b7280]">{c.code}</div></td>
                      <td className="py-3 text-xs text-[#374151]">{c.teacher}</td>
                      <td className="py-3 text-sm">{c.credits}</td>
                      <td className="py-3 w-32"><ProgressBar value={c.progress} /><div className="text-[10px] text-[#6b7280] mt-1">{c.progress}%</div></td>
                      <td className="py-3 font-bold text-[#1A56A0]">{c.grade}</td>
                      <td className="py-3"><Badge variant={c.status === "Aprobado" ? "success" : "primary"}>{c.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6">
            <h2 className="font-semibold mb-4">Próximas actividades</h2>
            <div className="space-y-3">
              {events.map((e) => (
                <div key={e.title} className="flex gap-3 p-3 rounded-lg border border-[#e8e8e4] hover:bg-[#f8f8f6] transition">
                  <div className="bg-[#EBF3FB] text-[#1A56A0] rounded-lg px-2 py-1.5 text-xs font-bold flex-shrink-0 text-center min-w-[48px]">{e.date}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{e.title}</div>
                    <div className="mt-1"><Badge variant="default">{e.module}</Badge></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5 bg-[#fef3c7] border-[#fde68a] flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#fde68a] text-[#b45309] flex items-center justify-center flex-shrink-0"><Bell size={18} /></div>
          <div>
            <div className="font-bold text-[#92400e]">Anuncio importante</div>
            <p className="text-sm text-[#92400e] mt-0.5">La matrícula para el ciclo 2026-II estará abierta del 19 al 30 de mayo. Revisa tu carga académica antes de confirmar.</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
