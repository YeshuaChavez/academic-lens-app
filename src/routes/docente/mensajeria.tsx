import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, Paperclip, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/docente/mensajeria")({ component: DocMensajeria });

const convos = [
  {id:1,name:"Ana García",initials:"AG",role:"Estudiante",last:"Sí, se lo envío esta tarde",time:"10:32",unread:1,color:"#1A56A0"},
  {id:2,name:"Carlos Ramírez",initials:"CR",role:"Estudiante",last:"¿Puedo pedir una revisión de mi nota?",time:"09:50",unread:2,color:"#7c3aed"},
  {id:3,name:"Coordinación Académica",initials:"CA",role:"Admin",last:"Recordatorio: notas hasta el 30/05",time:"09:00",unread:0,color:"#b45309"},
  {id:4,name:"Grupo IS-401",initials:"GI",role:"Grupo · 28 miembros",last:"Tú: La exposición es el viernes",time:"Ayer",unread:0,color:"#15803d"},
  {id:5,name:"Mg. Patricia Salinas",initials:"PS",role:"Colega",last:"¿Coordinamos el horario de exámenes?",time:"Lun",unread:0,color:"#b91c1c"},
];

const msgs = [
  {from:"them",text:"Buenos días profesor, ¿cuál es la fecha límite para entregar el proyecto de arquitectura?",time:"10:20"},
  {from:"me",text:"Buenos días Ana. La fecha es el viernes 22 de mayo hasta las 23:59.",time:"10:22"},
  {from:"them",text:"Perfecto, ¿puede ser en PDF o también acepta otros formatos?",time:"10:24"},
  {from:"me",text:"Acepto PDF para el informe y el repositorio de GitHub para el código. Ambos son obligatorios.",time:"10:26"},
  {from:"them",text:"Entendido, muchas gracias profesor. Ya casi termino el informe.",time:"10:30"},
  {from:"me",text:"Muy bien. Recuerda incluir el diagrama de componentes y el de despliegue. Cualquier duda avísame.",time:"10:32"},
];

function DocMensajeria() {
  const [active, setActive] = useState(1);
  const [text, setText] = useState("");
  const conv = convos.find(c=>c.id===active)!;

  return (
    <Layout role="Docente">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Mensajería</h1>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]" style={{height:"calc(100vh - 210px)",minHeight:500}}>
            <div className="border-r border-[#e8e8e4] flex flex-col">
              <div className="p-3 border-b border-[#e8e8e4]">
                <div className="relative"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]"/>
                  <input placeholder="Buscar..." className="w-full pl-8 pr-3 py-2 border border-[#e8e8e4] rounded-lg text-xs focus:outline-none focus:border-[#15803d]"/>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {convos.map(c=>(
                  <button key={c.id} onClick={()=>setActive(c.id)}
                    className={`w-full flex gap-3 p-3 border-b border-[#f3f3f0] text-left hover:bg-[#f8f8f6] transition ${active===c.id?"bg-[#dcfce7]/50":""}`}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:c.color}}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between"><span className="font-semibold text-xs truncate">{c.name}</span><span className="text-[10px] text-[#6b7280]">{c.time}</span></div>
                      <div className="flex items-center justify-between mt-0.5"><span className="text-[11px] text-[#6b7280] truncate">{c.last}</span>
                        {c.unread>0&&<span className="ml-1 bg-[#15803d] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-4 border-b border-[#e8e8e4] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:conv.color}}>{conv.initials}</div>
                <div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold text-sm">{conv.name}</span><Badge variant="green">{conv.role}</Badge></div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#15803d] mt-0.5"><span className="w-1.5 h-1.5 bg-[#15803d] rounded-full"/>En línea</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f8f6]">
                {msgs.map((m,i)=>(
                  <div key={i} className={`flex ${m.from==="me"?"justify-end":"justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from==="me"?"bg-[#15803d] text-white rounded-br-sm":"bg-white border border-[#e8e8e4] rounded-bl-sm"}`}>
                      <div>{m.text}</div>
                      <div className={`text-[10px] mt-1 ${m.from==="me"?"text-white/60":"text-[#6b7280]"}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={e=>{e.preventDefault();setText("");}} className="p-3 border-t border-[#e8e8e4] flex items-center gap-2">
                <button type="button" className="p-2 text-[#6b7280] hover:text-[#15803d]"><Paperclip size={17}/></button>
                <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#15803d]"/>
                <button type="submit" className="bg-[#15803d] hover:bg-[#166534] text-white p-2.5 rounded-lg"><Send size={15}/></button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
