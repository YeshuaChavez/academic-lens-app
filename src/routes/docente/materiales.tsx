import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Upload, Download, Trash2, Eye } from "lucide-react";

export const Route = createFileRoute("/docente/materiales")({ component: DocMateriales });

const materials = [
  {name:"Semana_01_Introduccion_IS.pdf",course:"IS-401",type:"PDF",date:"01/03/2026",size:"2.4 MB",visible:true,views:142},
  {name:"Semana_02_Patrones_Diseño.pdf",course:"IS-401",type:"PDF",date:"08/03/2026",size:"4.1 MB",visible:true,views:138},
  {name:"Laboratorio_01_UML.docx",course:"IS-401",type:"Tarea",date:"10/03/2026",size:"1.2 MB",visible:true,views:140},
  {name:"Video_Intro_Microservicios.mp4",course:"IS-301",type:"Video",date:"15/03/2026",size:"245 MB",visible:true,views:96},
  {name:"Enlace_Recursos_Arquitectura.url",course:"AW-201",type:"Enlace",date:"18/03/2026",size:"—",visible:false,views:54},
  {name:"Examen_Parcial_IS401.pdf",course:"IS-401",type:"Tarea",date:"20/04/2026",size:"890 KB",visible:false,views:0},
  {name:"Semana_09_Frontend.pptx",course:"AW-201",type:"PDF",date:"19/05/2026",size:"8.3 MB",visible:true,views:42},
];

const typeColors:Record<string,string> = {PDF:"primary",Video:"danger",Tarea:"warning",Enlace:"green"};

function DocMateriales() {
  return (
    <Layout role="Docente">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Materiales de Clase</h1>

        <div className="flex gap-2 border-b border-[#e8e8e4]">
          {["IS-401","IS-301","AW-201"].map(c=>(
            <button key={c} className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px ${c==="IS-401"?"border-[#15803d] text-[#15803d]":"border-transparent text-[#6b7280] hover:text-[#374151]"}`}>{c}</button>
          ))}
        </div>

        <Card className="p-6 border-2 border-dashed border-[#e8e8e4] bg-[#f8f8f6] flex flex-col items-center gap-3 cursor-pointer hover:border-[#15803d] transition">
          <div className="w-12 h-12 rounded-xl bg-[#dcfce7] flex items-center justify-center"><Upload size={22} className="text-[#15803d]"/></div>
          <div className="text-center">
            <p className="font-semibold text-sm">Arrastra archivos aquí o haz clic para subir</p>
            <p className="text-xs text-[#6b7280] mt-1">PDF, Word, PPT, video, enlaces · Máx. 500 MB</p>
          </div>
          <button className="px-4 py-2 bg-[#15803d] text-white text-sm font-semibold rounded-lg hover:bg-[#166534]">Subir archivo</button>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Materiales subidos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                  <th className="pb-3 font-semibold">Archivo</th><th className="pb-3 font-semibold">Curso</th>
                  <th className="pb-3 font-semibold">Tipo</th><th className="pb-3 font-semibold">Fecha</th>
                  <th className="pb-3 font-semibold">Tamaño</th><th className="pb-3 font-semibold">Visib.</th>
                  <th className="pb-3 font-semibold">Acciones</th>
                </tr></thead>
                <tbody>
                  {materials.map(m=>(
                    <tr key={m.name} className="border-b border-[#f3f3f0] last:border-0">
                      <td className="py-3 font-semibold text-xs max-w-[200px] truncate">{m.name}</td>
                      <td className="py-3"><Badge variant="green">{m.course}</Badge></td>
                      <td className="py-3"><Badge variant={(typeColors[m.type]||"default") as any}>{m.type}</Badge></td>
                      <td className="py-3 text-xs text-[#6b7280]">{m.date}</td>
                      <td className="py-3 text-xs text-[#6b7280]">{m.size}</td>
                      <td className="py-3">
                        <div className={`w-9 h-5 rounded-full flex items-center transition-all cursor-pointer ${m.visible?"bg-[#15803d] justify-end":"bg-[#e8e8e4] justify-start"}`}>
                          <div className="w-4 h-4 rounded-full bg-white mx-0.5 shadow-sm"/>
                        </div>
                      </td>
                      <td className="py-3"><div className="flex gap-1">
                        <button className="p-1.5 text-[#6b7280] hover:text-[#1A56A0] hover:bg-[#EBF3FB] rounded"><Download size={14}/></button>
                        <button className="p-1.5 text-[#6b7280] hover:text-[#b91c1c] hover:bg-[#fee2e2] rounded"><Trash2 size={14}/></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Eye size={14} className="text-[#15803d]"/>Estadísticas de acceso</h3>
            <div className="space-y-3">
              {materials.filter(m=>m.views>0).sort((a,b)=>b.views-a.views).map(m=>(
                <div key={m.name}>
                  <div className="flex justify-between text-xs mb-1"><span className="truncate font-medium text-[#374151]">{m.name.replace(".pdf","").replace(".mp4","").replace(".docx","")}</span><span className="font-bold text-[#15803d] flex-shrink-0 ml-2">{m.views}</span></div>
                  <div className="h-1.5 bg-[#f3f3f0] rounded-full overflow-hidden"><div className="h-full bg-[#15803d] rounded-full" style={{width:`${(m.views/142)*100}%`}}/></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
