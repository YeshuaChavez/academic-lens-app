import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Mail, Lock, Eye, EyeOff, BookOpen, Shield, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { useRole, type Role } from "../context/RoleContext";

export const Route = createFileRoute("/login")({ component: LoginPage });

const roleConfig = {
  Estudiante:    { color: "#1e40af", bg: "#eff6ff", desc: "Accede a tus cursos, notas y más", icon: GraduationCap, gradient: "gradient-student" },
  Docente:       { color: "#059669", bg: "#ecfdf5", desc: "Gestiona tus cursos y estudiantes", icon: BookOpen, gradient: "gradient-teacher" },
  Administrador: { color: "#7c3aed", bg: "#f5f3ff", desc: "Panel de control institucional",   icon: Shield, gradient: "gradient-admin" },
};

const roleDestination: Record<Role, string> = {
  Estudiante:    "/estudiante/dashboard",
  Docente:       "/docente/dashboard",
  Administrador: "/admin/dashboard",
};

function LoginPage() {
  const [role, setRole] = useState<Role>("Estudiante");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole: setGlobalRole } = useRole();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setGlobalRole(role);
    navigate({ to: roleDestination[role] });
  };

  const cfg = roleConfig[role];

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans">
      {/* Left Pane - Hero Background Video / Image (Desktop only) */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 text-white overflow-hidden select-none bg-slate-950">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 opacity-60 pointer-events-none"
          poster="/login-hero.png"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-university-campus-41584-large.mp4" type="video/mp4" />
        </video>
        {/* Dynamic Role Overlay */}
        <div className={`absolute inset-0 opacity-80 transition-colors duration-500 pointer-events-none ${
          role === "Estudiante" ? "bg-blue-950" : role === "Docente" ? "bg-emerald-950" : "bg-purple-950"
        }`} />
        
        {/* Abstract shapes for futuristic vibe */}
        <div className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 2px)", backgroundSize: "32px 32px" }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <GraduationCap className="text-white" size={22} />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight">Campus360</span>
            <span className="block text-[10px] text-white/70 uppercase tracking-widest -mt-1 font-semibold">Innovatec University</span>
          </div>
        </div>

        {/* Dynamic Glassmorphic Card */}
        <div className="relative z-10 max-w-lg glass-panel text-slate-800 p-8 rounded-2xl premium-card-shadow border border-white/30 self-start mt-auto">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4 ${
            role === "Estudiante" ? "bg-blue-600" : role === "Docente" ? "bg-emerald-600" : "bg-purple-600"
          }`}>
            Portal del {role}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">
            {role === "Estudiante" ? "Lleva tu aprendizaje al siguiente nivel" 
             : role === "Docente" ? "Potencia el potencial de tus alumnos" 
             : "Control total de la gestión educativa"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {role === "Estudiante" ? "Accede a tus clases, consulta tu historial académico, realiza trámites de matrícula y comunícate con tus profesores desde un solo lugar."
             : role === "Docente" ? "Registra calificaciones de manera simple, haz el seguimiento de asistencia de tus alumnos y comparte recursos de estudio de forma ágil."
             : "Supervisa las operaciones académicas, gestiona usuarios, analiza reportes institucionales y mantén la plataforma configurada de forma segura."}
          </p>
          <div className="mt-6 flex gap-6 text-xs font-bold text-slate-500 border-t border-slate-200/50 pt-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-slate-400" />
              <span>Campus seguro SSL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-slate-400" />
              <span>Servidores de alta velocidad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form Container */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-12 bg-white relative">
        <div className="w-full max-w-[420px] space-y-8">
          
          {/* Header Mobile / Brand Header */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-md" 
              style={{ background: cfg.color }}>
              <GraduationCap size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">¡Bienvenido de nuevo!</h1>
            <p className="text-sm text-slate-500 mt-2">
              Ingresa tus credenciales para acceder a la intranet institucional de Campus360.
            </p>
          </div>

          {/* Role selector */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Rol de acceso
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
              {(Object.keys(roleConfig) as Role[]).map((r) => {
                const rc = roleConfig[r];
                const active = role === r;
                const RoleIcon = rc.icon;
                return (
                  <button 
                    key={r} 
                    type="button" 
                    onClick={() => setRole(r)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-lg text-xs font-bold transition-all duration-200 select-none ${
                      active 
                        ? "bg-white text-slate-900 shadow-sm border-slate-200/20" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 border-transparent"
                    }`}
                  >
                    <RoleIcon size={16} className={active ? "" : "text-slate-400"} style={active ? { color: rc.color } : {}} />
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              saveRole(role); 
              nav({ to: roleDestination[role] }); 
            }} 
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Correo electrónico institucional</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-800" />
                <input 
                  type="email" 
                  required
                  defaultValue={
                    role === "Estudiante" ? "ana.garcia@innovatec.edu.pe"
                    : role === "Docente" ? "r.mendoza@innovatec.edu.pe"
                    : "admin@innovatec.edu.pe"
                  }
                  key={role} // Key forces re-render so defaultValue resets properly
                  placeholder="ejemplo@innovatec.edu.pe"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all font-medium bg-slate-50/50 hover:bg-slate-50"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 block">Contraseña</label>
                <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">¿La olvidaste?</a>
              </div>
              <div className="relative group">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-800" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  defaultValue="campus2026"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all font-medium bg-slate-50/50 hover:bg-slate-50"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button 
              type="submit"
              className={`w-full text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer text-sm text-center`}
              style={{ backgroundColor: cfg.color }}
            >
              Iniciar sesión como {role}
            </button>
          </form>

          {/* Footer inside Form panel */}
          <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100 flex justify-between">
            <span>© 2026 Campus360</span>
            <span className="font-semibold text-slate-500">Innovatec University</span>
          </div>

        </div>
      </div>
    </div>
  );
}

