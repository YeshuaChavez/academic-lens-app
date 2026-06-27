import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, Paperclip, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/mensajeria")({ component: AdminMensajeria });

const convos = [
  {id:1,name:"Ana García",initials:"AG",role:"Estudiante",last:"¿Pueden ayudarme con mi constancia?",time:"11:20",unread:1,color:"#1A56A0"},
  {id:2,name:"Dr. Roberto Mendoza",initials:"RM",role:"Docente",last:"Consulta sobre el registro de notas",time:"10:05",unread:2,color:"#15803d"},
  {id:3,name:"Soporte Técnico",initials:"ST",role:"Sistema",last:"Mantenimiento programado: 22/05",time:"09:30",unread:0,color:"#6b7280"},
  {id:4,name:"Coordinación — Ingeniería",initials:"CI",role:"Grupo · 12 miembros",last:"Reunión de coordinación: viernes",time:"Ayer",unread:0,color:"#7c3aed"},
  {id:5,name:"Carlos Quispe",initials:"CQ",role:"Estudiante",last:"Solicito revisión de matrícula",time:"Lun",unread:0,color:"#b45309"},
];

const msgs = [
  {from:"them",text:"Buenos días, quisiera solicitar una constancia de estudios para presentarla en el banco.",time:"11:10"},
  {from:"me",text:"Buenos días Ana. Con gusto te ayudamos. ¿Necesitas la constancia simple o con notas?",time:"11:12"},
  {from:"them",text:"Con notas por favor, y que incluya el promedio ponderado acumulado.",time:"11:14"},
  {from:"me",text:"Perfecto. El trámite tiene un costo de S/. 45.00. ¿Ya realizaste el pago en el sistema?",time:"11:16"},
  {from:"them",text:"Sí, acabo de realizar el pago. El número de operación es OP-20260519-887.",time:"11:18"},
  {from:"me",text:"Verificado. Tu constancia estará lista en 24 horas hábiles. Te notificaremos al correo institucional.",time:"11:20"},
];

function AdminMensajeria() {
  const [active, setActive] = useState(1);
  const [text, setText] = useState("");
  const conv = convos.find(c=>c.id===active)!;

  return (
    <Layout role="Administrador">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Centro de Mensajería</h1>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]" style={{height:"calc(100vh - 210px)",minHeight:500}}>
            <div className="border-r border-[#e8e8e4] flex flex-col">
              <div className="p-3 border-b border-[#e8e8e4]">
                <div className="relative"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]"/>
                  <input placeholder="Buscar conversación..." className="w-full pl-8 pr-3 py-2 border border-[#e8e8e4] rounded-lg text-xs focus:outline-none focus:border-[#7c3aed]"/>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {convos.map(c=>(
                  <button key={c.id} onClick={()=>setActive(c.id)}
                    className={`w-full flex gap-3 p-3 border-b border-[#f3f3f0] text-left hover:bg-[#f8f8f6] transition ${active===c.id?"bg-[#ede9fe]/50":""}`}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:c.color}}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between"><span className="font-semibold text-xs truncate">{c.name}</span><span className="text-[10px] text-[#6b7280]">{c.time}</span></div>
                      <div className="flex items-center justify-between mt-0.5"><span className="text-[11px] text-[#6b7280] truncate">{c.last}</span>
                        {c.unread>0&&<span className="ml-1 bg-[#7c3aed] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-4 border-b border-[#e8e8e4] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:conv.color}}>{conv.initials}</div>
                <div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold text-sm">{conv.name}</span><Badge variant="purple">{conv.role}</Badge></div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#15803d] mt-0.5"><span className="w-1.5 h-1.5 bg-[#15803d] rounded-full"/>En línea</div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#dcfce7] text-[#15803d] text-xs font-semibold rounded-lg hover:bg-[#bbf7d0]">
                  <CheckCircle2 size={13}/>Marcar como resuelto
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f8f6]">
                {msgs.map((m,i)=>(
                  <div key={i} className={`flex ${m.from==="me"?"justify-end":"justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from==="me"?"bg-[#7c3aed] text-white rounded-br-sm":"bg-white border border-[#e8e8e4] rounded-bl-sm"}`}>
                      <div>{m.text}</div>
                      <div className={`text-[10px] mt-1 ${m.from==="me"?"text-white/60":"text-[#6b7280]"}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={e=>{e.preventDefault();setText("");}} className="p-3 border-t border-[#e8e8e4] flex items-center gap-2">
                <button type="button" className="p-2 text-[#6b7280] hover:text-[#7c3aed]"><Paperclip size={17}/></button>
                <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escribe una respuesta..."
                  className="flex-1 px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#7c3aed]"/>
                <button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white p-2.5 rounded-lg"><Send size={15}/></button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
