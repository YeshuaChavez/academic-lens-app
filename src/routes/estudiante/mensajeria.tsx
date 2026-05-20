import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge } from "../../components/Layout";
import { Search, Paperclip, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudiante/mensajeria")({ component: EstMensajeria });

const convos = [
  { id: 1, name: "Dr. Roberto Mendoza", initials: "RM", role: "Docente", last: "Revisé tu avance del proyecto...", time: "10:32", unread: 2, color: "#059669" },
  { id: 2, name: "Mg. Patricia Salinas", initials: "PS", role: "Docente", last: "El examen se reprogramó para el miércoles", time: "09:14", unread: 0, color: "#10b981" },
  { id: 3, name: "Secretaría Académica", initials: "SA", role: "Admin", last: "Tu constancia está lista para recoger", time: "Ayer", unread: 1, color: "#7c3aed" },
  { id: 4, name: "Grupo Desarrollo Web", initials: "GD", role: "Grupo", last: "Carlos: yo subo el repo hoy", time: "Ayer", unread: 0, color: "#2563eb" },
  { id: 5, name: "Carlos Ramírez", initials: "CR", role: "Compañero", last: "¿Tienes los apuntes de Redes?", time: "Lun", unread: 0, color: "#64748b" },
];

const msgsByConvo: Record<number, { from: string; text: string; time: string }[]> = {
  1: [
    { from: "them", text: "Hola Ana, revisé tu avance del proyecto de Arquitectura de Software.", time: "10:20" },
    { from: "me", text: "Buenos días profesor, ¿qué le pareció el enfoque?", time: "10:22" },
    { from: "them", text: "Muy bien estructurado. Te sugiero reforzar la sección de patrones de diseño.", time: "10:25" },
    { from: "me", text: "Perfecto, lo ajustaré antes del viernes.", time: "10:27" },
    { from: "them", text: "Excelente. ¿Puedes enviarme también el diagrama de componentes?", time: "10:30" },
    { from: "me", text: "Sí, se lo envío esta tarde junto con el documento actualizado.", time: "10:32" },
  ],
  2: [{ from: "them", text: "Ana, el examen parcial de Base de Datos se reprogramó para el miércoles 22.", time: "09:10" }, { from: "me", text: "Gracias profesora, lo anoto.", time: "09:14" }],
  3: [{ from: "them", text: "Su constancia de estudios está lista para recoger en secretaría.", time: "Ayer" }, { from: "me", text: "Muchas gracias, paso hoy en la tarde.", time: "Ayer" }],
  4: [{ from: "them", text: "Carlos: yo subo el repositorio hoy en la noche.", time: "Ayer" }, { from: "me", text: "Perfecto, yo actualizo el README.", time: "Ayer" }],
  5: [{ from: "them", text: "Ana, ¿tienes los apuntes de la sesión de Redes del lunes?", time: "Lun" }, { from: "me", text: "Sí, te los paso por aquí.", time: "Lun" }],
};

function EstMensajeria() {
  const [active, setActive] = useState(1);
  const [text, setText] = useState("");
  const conv = convos.find(c => c.id === active)!;
  const messages = msgsByConvo[active] ?? [];

  return (
    <Layout role="Estudiante">
      <div className="space-y-6 animate-fade-in font-sans">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Centro de Mensajería</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Comunícate con tus profesores, compañeros y la secretaría académica</p>
        </div>

        {/* Messaging Container */}
        <Card className="overflow-hidden border border-slate-100 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]" style={{ height: "calc(100vh - 220px)", minHeight: 520 }}>
            
            {/* Sidebar Conversaciones */}
            <div className="border-r border-slate-100 flex flex-col bg-white">
              
              {/* Search Bar */}
              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450" />
                  <input 
                    placeholder="Buscar chat..." 
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600 transition-colors bg-slate-50 focus:bg-white" 
                  />
                </div>
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                {convos.map(c => {
                  const isActive = active === c.id;
                  return (
                    <button 
                      key={c.id} 
                      onClick={() => setActive(c.id)}
                      className={`w-full flex gap-3.5 p-4 text-left hover:bg-slate-50/50 transition-all duration-200 cursor-pointer items-center ${
                        isActive ? "bg-blue-50/20 border-l-4 border-blue-600 pl-3" : "border-l-4 border-transparent"
                      }`}
                    >
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold flex-shrink-0 shadow-sm" 
                        style={{ backgroundColor: c.color }}
                      >
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800 truncate">{c.name}</span>
                          <span className="text-[9px] font-bold text-slate-400 ml-1.5 flex-shrink-0">{c.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] text-slate-450 truncate font-medium">{c.last}</span>
                          {c.unread > 0 && (
                            <span className="ml-2 bg-blue-600 text-white text-[9px] font-extrabold rounded-full min-w-4 h-4 px-1 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
                              {c.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Pane */}
            <div className="flex flex-col bg-slate-50/30">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-sm" 
                    style={{ backgroundColor: conv.color }}
                  >
                    {conv.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-800 leading-none">{conv.name}</span>
                      <Badge variant={conv.role === "Docente" ? "success" : conv.role === "Admin" ? "warning" : "primary"}>
                        {conv.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 mt-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      En línea
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((m, i) => {
                  const isMe = m.from === "me";
                  return (
                    <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-slide-in`}>
                      <div 
                        className={`max-w-[65%] px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${
                          isMe 
                            ? "bg-blue-600 text-white rounded-tr-none shadow-blue-500/5" 
                            : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                        }`}
                      >
                        <div>{m.text}</div>
                        <div className={`text-[9px] font-extrabold mt-1.5 text-right ${isMe ? "text-blue-200" : "text-slate-400"}`}>
                          {m.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Form Footer */}
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  setText("");
                }} 
                className="p-4 border-t border-slate-100 flex items-center gap-2.5 bg-white"
              >
                <button type="button" className="p-2.5 text-slate-405 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                  <Paperclip size={16} />
                </button>
                <input 
                  value={text} 
                  onChange={e => setText(e.target.value)} 
                  placeholder="Escribe un mensaje aquí..."
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600 transition-colors bg-slate-50 focus:bg-white" 
                />
                <button 
                  type="submit" 
                  disabled={!text.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none text-white p-3 rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/10"
                >
                  <Send size={14} />
                </button>
              </form>

            </div>

          </div>
        </Card>
      </div>
    </Layout>
  );
}

