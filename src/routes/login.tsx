import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Mail, Lock, Eye, EyeOff, BookOpen, Shield, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

const VIDEOS = ["/login-bg.mp4", "/login-bg2.mp4"];

function LoginPage() {
  const [role, setRole] = useState<Role>("Estudiante");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { setRole: setGlobalRole } = useRole();

  // Crossfade between videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Preload second video
  useEffect(() => {
    if (video2Ref.current) {
      video2Ref.current.load();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setGlobalRole(role);
    navigate({ to: roleDestination[role] });
  };

  const cfg = roleConfig[role];

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans bg-slate-950">

      {/* ── Full-screen crossfade videos (ALL devices) ── */}
      <video
        ref={video1Ref}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeVideo === 0 ? 0.55 : 0 }}
      >
        <source src={VIDEOS[0]} type="video/mp4" />
      </video>
      <video
        ref={video2Ref}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeVideo === 1 ? 0.55 : 0 }}
      >
        <source src={VIDEOS[1]} type="video/mp4" />
      </video>

      {/* Dynamic role colour overlay */}
      <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
        role === "Estudiante" ? "bg-blue-950/75" : role === "Docente" ? "bg-emerald-950/75" : "bg-purple-950/75"
      }`} />

      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 2px)", backgroundSize: "28px 28px" }} />

      {/* ── Content layer ── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row">

        {/* Left info panel — hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 text-white select-none">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={22} />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight">Campus360</span>
              <span className="block text-[10px] text-white/70 uppercase tracking-widest -mt-1 font-semibold">Innovatec University</span>
            </div>
          </div>

          {/* Info card */}
          <div className="max-w-lg glass-panel text-slate-800 p-8 rounded-2xl premium-card-shadow border border-white/30 mt-auto">
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

        {/* Right form panel — full width on mobile, 48% on desktop with glass background from left panel */}
        <div className="w-full lg:w-[48%] min-h-screen flex items-center justify-center px-5 py-10 lg:py-12 glass-panel lg:border-l lg:border-white/50 shadow-2xl">
          <div className="w-full max-w-[420px] space-y-7">

            {/* Mobile brand header */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900/10 border border-slate-900/20 flex items-center justify-center">
                <GraduationCap className="text-slate-800" size={18} />
              </div>
              <div>
                <span className="font-extrabold text-slate-800 text-lg tracking-tight">Campus360</span>
                <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-semibold -mt-0.5">Innovatec University</span>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">¡Bienvenido de nuevo!</h1>
              <p className="text-sm text-slate-600 mt-1">Ingresa tus credenciales para acceder al campus.</p>
            </div>

            {/* Role selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rol de acceso</label>
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
                          ? "bg-white text-slate-900 shadow-md"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Correo electrónico institucional</label>
                <div className="relative group">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-800" />
                  <input
                    type="email"
                    required
                    key={role}
                    defaultValue={
                      role === "Estudiante" ? "ana.garcia@innovatec.edu.pe"
                      : role === "Docente" ? "roberto.mendoza@innovatec.edu.pe"
                      : "admin@innovatec.edu.pe"
                    }
                    placeholder="ejemplo@innovatec.edu.pe"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800/30 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 block">Contraseña</label>
                  <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">¿La olvidaste?</a>
                </div>
                <div className="relative group">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-800" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    defaultValue="campus2026"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-white/50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800/30 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                style={{ backgroundColor: cfg.color }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <span>Iniciar sesión como {role}</span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-200/50 flex justify-between">
              <span>© 2026 Campus360</span>
              <span className="font-semibold text-slate-500">Innovatec University</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
