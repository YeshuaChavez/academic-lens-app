import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card } from "../../components/Layout";
import { useState } from "react";
import { Save, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/configuracion")({ component: AdminConfiguracion });

const periods = [
  {period:"2026-I",start:"03/03/2026",end:"18/07/2026",status:"Activo"},
  {period:"2025-II",start:"01/09/2025",end:"20/01/2026",status:"Cerrado"},
  {period:"2025-I",start:"03/03/2025",end:"18/07/2025",status:"Cerrado"},
];

const toggles = [
  {id:"matriculas",label:"Notificar nuevas matrículas",desc:"Enviar alerta cuando un estudiante confirme su matrícula",on:true},
  {id:"riesgo",label:"Alertas de riesgo académico",desc:"Detectar automáticamente estudiantes con promedio menor a 11",on:true},
  {id:"notas",label:"Recordatorio de cierre de notas",desc:"Notificar a docentes 7 días antes del cierre del período",on:true},
  {id:"reportes",label:"Reportes automáticos semanales",desc:"Generar y enviar resumen estadístico cada lunes",on:false},
];

function AdminConfiguracion() {
  const [switches, setSwitches] = useState<Record<string,boolean>>(Object.fromEntries(toggles.map(t=>[t.id,t.on])));

  return (
    <Layout role="Administrador">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Configuración del Sistema</h1>

        <Card className="p-6">
          <h2 className="font-semibold mb-5">Configuración general</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {label:"Nombre de la institución",value:"Innovatec University"},
              {label:"Período académico activo",value:"2026-I"},
              {label:"Año académico",value:"2026"},
              {label:"Zona horaria",value:"America/Lima (UTC-5)"},
            ].map(f=>(
              <div key={f.label}>
                <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5">{f.label}</label>
                {f.label==="Zona horaria"
                  ? <select className="w-full px-3 py-2.5 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"><option>{f.value}</option><option>America/New_York (UTC-5)</option></select>
                  : <input defaultValue={f.value} className="w-full px-3 py-2.5 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"/>
                }
              </div>
            ))}
          </div>
          <button className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-[#7c3aed] text-white text-sm font-semibold rounded-lg hover:bg-[#6d28d9]"><Save size={15}/>Guardar cambios</button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold">Períodos académicos</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7c3aed] text-white text-xs font-semibold rounded-lg hover:bg-[#6d28d9]"><Plus size={13}/>Agregar período</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                <th className="pb-3 font-semibold">Período</th><th className="pb-3 font-semibold">Fecha inicio</th>
                <th className="pb-3 font-semibold">Fecha fin</th><th className="pb-3 font-semibold">Estado</th>
                <th className="pb-3 font-semibold">Acciones</th>
              </tr></thead>
              <tbody>
                {periods.map(p=>(
                  <tr key={p.period} className="border-b border-[#f3f3f0] last:border-0">
                    <td className="py-3 font-bold text-[#7c3aed]">{p.period}</td>
                    <td className="py-3 text-[#374151]">{p.start}</td>
                    <td className="py-3 text-[#374151]">{p.end}</td>
                    <td className="py-3">
                      <div className={`flex items-center gap-1.5 w-fit px-2 py-1 rounded-full text-xs font-semibold ${p.status==="Activo"?"bg-[#dcfce7] text-[#15803d]":"bg-[#f3f3f0] text-[#6b7280]"}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{background:p.status==="Activo"?"#15803d":"#9ca3af"}}/>
                        {p.status}
                      </div>
                    </td>
                    <td className="py-3"><button className="text-xs font-semibold text-[#7c3aed] hover:underline">Editar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-5">Notificaciones del sistema</h2>
          <div className="space-y-4">
            {toggles.map(t=>(
              <div key={t.id} className="flex items-center justify-between p-4 rounded-xl border border-[#e8e8e4] hover:border-[#7c3aed]/30 transition">
                <div className="flex-1 mr-4">
                  <div className="font-semibold text-sm">{t.label}</div>
                  <div className="text-xs text-[#6b7280] mt-0.5">{t.desc}</div>
                </div>
                <button onClick={()=>setSwitches(p=>({...p,[t.id]:!p[t.id]}))}
                  className={`w-11 h-6 rounded-full flex items-center transition-all flex-shrink-0 ${switches[t.id]?"bg-[#7c3aed] justify-end":"bg-[#e8e8e4] justify-start"}`}>
                  <div className="w-5 h-5 rounded-full bg-white mx-0.5 shadow-sm"/>
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
