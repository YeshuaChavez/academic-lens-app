import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, Paperclip, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudiante/mensajeria")({ component: EstMensajeria });

const convos = [
  { id:1, name:"Dr. Roberto Mendoza", initials:"RM", role:"Docente", last:"Revisé tu avance del proyecto...", time:"10:32", unread:2, color:"#1A56A0" },
  { id:2, name:"Mg. Patricia Salinas", initials:"PS", role:"Docente", last:"El examen se reprogramó para el miércoles", time:"09:14", unread:0, color:"#15803d" },
  { id:3, name:"Secretaría Académica", initials:"SA", role:"Admin", last:"Tu constancia está lista para recoger", time:"Ayer", unread:1, color:"#b45309" },
  { id:4, name:"Grupo Desarrollo Web", initials:"GD", role:"Grupo · 3 miembros", last:"Carlos: yo subo el repo hoy", time:"Ayer", unread:0, color:"#7c3aed" },
  { id:5, name:"Carlos Ramírez", initials:"CR", role:"Compañero", last:"¿Tienes los apuntes de Redes?", time:"Lun", unread:0, color:"#b91c1c" },
];

const msgsByConvo: Record<number, {from:string;text:string;time:string}[]> = {
  1: [
    {from:"them",text:"Hola Ana, revisé tu avance del proyecto de Arquitectura de Software.",time:"10:20"},
    {from:"me",text:"Buenos días profesor, ¿qué le pareció el enfoque?",time:"10:22"},
    {from:"them",text:"Muy bien estructurado. Te sugiero reforzar la sección de patrones de diseño.",time:"10:25"},
    {from:"me",text:"Perfecto, lo ajustaré antes del viernes.",time:"10:27"},
    {from:"them",text:"Excelente. ¿Puedes enviarme también el diagrama de componentes?",time:"10:30"},
    {from:"me",text:"Sí, se lo envío esta tarde junto con el documento actualizado.",time:"10:32"},
  ],
  2: [{from:"them",text:"Ana, el examen parcial de Base de Datos se reprogramó para el miércoles 22.",time:"09:10"},{from:"me",text:"Gracias profesora, lo anoto.",time:"09:14"}],
  3: [{from:"them",text:"Su constancia de estudios está lista para recoger en secretaría.",time:"Ayer"},{from:"me",text:"Muchas gracias, paso hoy en la tarde.",time:"Ayer"}],
  4: [{from:"them",text:"Carlos: yo subo el repositorio hoy en la noche.",time:"Ayer"},{from:"me",text:"Perfecto, yo actualizo el README.",time:"Ayer"}],
  5: [{from:"them",text:"Ana, ¿tienes los apuntes de la sesión de Redes del lunes?",time:"Lun"},{from:"me",text:"Sí, te los paso por aquí.",time:"Lun"}],
};

function EstMensajeria() {
  const [active, setActive] = useState(1);
  const [text, setText] = useState("");
  const conv = convos.find(c => c.id === active)!;
  const messages = msgsByConvo[active] ?? [];

  return (
    <Layout role="Estudiante">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Mensajería</h1>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]" style={{height:"calc(100vh - 210px)",minHeight:500}}>
            <div className="border-r border-[#e8e8e4] flex flex-col">
              <div className="p-3 border-b border-[#e8e8e4]">
                <div className="relative"><Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                  <input placeholder="Buscar conversación..." className="w-full pl-8 pr-3 py-2 border border-[#e8e8e4] rounded-lg text-xs focus:outline-none focus:border-[#1A56A0]" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {convos.map(c => (
                  <button key={c.id} onClick={() => setActive(c.id)}
                    className={`w-full flex gap-3 p-3 border-b border-[#f3f3f0] text-left hover:bg-[#f8f8f6] transition ${active===c.id?"bg-[#EBF3FB]":""}`}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:c.color}}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs truncate">{c.name}</span>
                        <span className="text-[10px] text-[#6b7280] ml-1 flex-shrink-0">{c.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[11px] text-[#6b7280] truncate">{c.last}</span>
                        {c.unread>0&&<span className="ml-1 bg-[#1A56A0] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-4 border-b border-[#e8e8e4] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:conv.color}}>{conv.initials}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="font-bold text-sm">{conv.name}</span><Badge variant="primary">{conv.role}</Badge></div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#15803d] mt-0.5"><span className="w-1.5 h-1.5 bg-[#15803d] rounded-full"/>En línea</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f8f6]">
                {messages.map((m,i) => (
                  <div key={i} className={`flex ${m.from==="me"?"justify-end":"justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from==="me"?"bg-[#1A56A0] text-white rounded-br-sm":"bg-white border border-[#e8e8e4] rounded-bl-sm"}`}>
                      <div>{m.text}</div>
                      <div className={`text-[10px] mt-1 ${m.from==="me"?"text-white/60":"text-[#6b7280]"}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={e=>{e.preventDefault();setText("");}} className="p-3 border-t border-[#e8e8e4] flex items-center gap-2">
                <button type="button" className="p-2 text-[#6b7280] hover:text-[#1A56A0]"><Paperclip size={17}/></button>
                <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none focus:border-[#1A56A0]"/>
                <button type="submit" className="bg-[#1A56A0] hover:bg-[#134680] text-white p-2.5 rounded-lg"><Send size={15}/></button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
