import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRole, type Role } from "../context/RoleContext";

export const Route = createFileRoute("/login")({ component: LoginPage });

const roleConfig = {
  Estudiante:     { color: "#1A56A0", bg: "#EBF3FB", desc: "Accede a tus cursos, notas y más" },
  Docente:        { color: "#15803d", bg: "#dcfce7", desc: "Gestiona tus cursos y estudiantes" },
  Administrador:  { color: "#7c3aed", bg: "#ede9fe", desc: "Panel de control institucional" },
};

const roleDestination: Record<Role, string> = {
  Estudiante:    "/estudiante/dashboard",
  Docente:       "/docente/dashboard",
  Administrador: "/admin/dashboard",
};

function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState<Role>("Estudiante");
  const { setRole: saveRole } = useRole();
  const nav = useNavigate();
  const cfg = roleConfig[role];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative"
      style={{ background: "linear-gradient(135deg, #0d3a6e 0%, #1A56A0 60%, #2563a8 100%)" }}>
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 2px)", backgroundSize: "40px 40px" }} />

      <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top colored strip per role */}
        <div className="h-2 transition-all duration-300" style={{ background: cfg.color }} />

        <div className="p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-3 transition-all duration-300" style={{ background: cfg.color }}>
              <GraduationCap size={28} />
            </div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Campus360</h1>
            <p className="text-sm text-[#6b7280]">Innovatec University</p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Ingresar como</p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(roleConfig) as Role[]).map((r) => {
                const rc = roleConfig[r];
                const active = role === r;
                return (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold"
                    style={active ? { borderColor: rc.color, background: rc.bg, color: rc.color }
                                  : { borderColor: "#e8e8e4", background: "white", color: "#374151" }}>
                    {r}
                    {active && <span className="text-[10px] font-normal text-center leading-tight opacity-80">{rc.desc}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); saveRole(role); nav({ to: roleDestination[role] }); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Correo institucional</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input type="email" defaultValue={
                  role === "Estudiante" ? "ana.garcia@innovatec.edu.pe"
                  : role === "Docente" ? "r.mendoza@innovatec.edu.pe"
                  : "admin@innovatec.edu.pe"
                }
                  className="w-full pl-10 pr-3 py-2.5 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none transition-all"
                  style={{ "--tw-ring-color": cfg.color } as any}
                  onFocus={e => e.target.style.borderColor = cfg.color}
                  onBlur={e => e.target.style.borderColor = "#e8e8e4"} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input type={showPwd ? "text" : "password"} defaultValue="campus2026"
                  className="w-full pl-10 pr-10 py-2.5 border border-[#e8e8e4] rounded-lg text-sm focus:outline-none"
                  onFocus={e => e.target.style.borderColor = cfg.color}
                  onBlur={e => e.target.style.borderColor = "#e8e8e4"} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs font-medium hover:underline" style={{ color: cfg.color }}>¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit"
              className="w-full text-white font-semibold py-2.5 rounded-lg transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: cfg.color }}>
              Iniciar sesión como {role}
            </button>
          </form>

          <p className="text-center text-xs text-[#9ca3af] mt-7">Acceso seguro · Campus360 © 2026</p>
        </div>
      </div>
    </div>
  );
}
