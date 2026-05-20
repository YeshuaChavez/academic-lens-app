import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  GraduationCap, LayoutDashboard, ClipboardList, BarChart3, CreditCard,
  BookOpen, MessageSquare, FileText, Settings, LogOut, Bell, ChevronRight,
  Users, BookMarked, ClipboardCheck, Upload, Search,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Role } from "../context/RoleContext";

// ── nav configs per role ──────────────────────────────────────────────────────
const navByRole = {
  Estudiante: {
    prefix: "/estudiante",
    color: "#1e40af",
    bgLight: "#eff6ff",
    avatarBg: "#1e40af",
    initials: "AG",
    name: "Ana García",
    items: [
      { to: "/estudiante/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/estudiante/matricula", label: "Matrícula", icon: ClipboardList },
      { to: "/estudiante/notas", label: "Mis Notas", icon: BarChart3 },
      { to: "/estudiante/pagos", label: "Pagos", icon: CreditCard },
      { to: "/estudiante/biblioteca", label: "Biblioteca", icon: BookOpen },
      { to: "/estudiante/mensajeria", label: "Mensajería", icon: MessageSquare },
    ],
  },
  Docente: {
    prefix: "/docente",
    color: "#059669",
    bgLight: "#ecfdf5",
    avatarBg: "#059669",
    initials: "RM",
    name: "Dr. Roberto Mendoza",
    items: [
      { to: "/docente/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/docente/cursos", label: "Mis Cursos", icon: BookMarked },
      { to: "/docente/notas", label: "Registro de Notas", icon: BarChart3 },
      { to: "/docente/asistencia", label: "Asistencia", icon: ClipboardCheck },
      { to: "/docente/mensajeria", label: "Mensajería", icon: MessageSquare },
      { to: "/docente/materiales", label: "Materiales", icon: Upload },
    ],
  },
  Administrador: {
    prefix: "/admin",
    color: "#7c3aed",
    bgLight: "#f5f3ff",
    avatarBg: "#7c3aed",
    initials: "DA",
    name: "Dirección Académica",
    items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/reportes", label: "Reportes", icon: FileText },
      { to: "/admin/usuarios", label: "Usuarios", icon: Users },
      { to: "/admin/cursos", label: "Gestión de Cursos", icon: BookMarked },
      { to: "/admin/mensajeria", label: "Mensajería", icon: MessageSquare },
      { to: "/admin/configuracion", label: "Configuración", icon: Settings },
    ],
  },
};

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard", matricula: "Matrícula", notas: "Notas",
  pagos: "Pagos", biblioteca: "Biblioteca", mensajeria: "Mensajería",
  reportes: "Reportes", usuarios: "Usuarios", cursos: "Cursos",
  configuracion: "Configuración", asistencia: "Asistencia", materiales: "Materiales",
};

export function Layout({ children, role }: { children?: ReactNode; role: Role }) {
  const { pathname } = useLocation();
  const cfg = navByRole[role];
  const segments = pathname.split("/").filter(Boolean);
  const current = segments[segments.length - 1] ?? "dashboard";
  const label = routeLabels[current] ?? "Inicio";

  const roleBadgeStyle = {
    background: cfg.bgLight,
    color: cfg.color,
    border: `1px solid ${cfg.color}20`,
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-900 font-sans">
      
      {/* ── Sidebar desktop ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-slate-100 flex-col z-20 shadow-sm">
        
        {/* Sidebar Header Brand */}
        <div className="px-6 py-6 border-b border-slate-100/80">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm transition-transform duration-300 hover:scale-105" 
              style={{ background: cfg.color }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="font-extrabold text-[15px] tracking-tight text-slate-800">Campus360</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">Innovatec Univ</div>
            </div>
          </div>
          
          {/* User Profile Info Card */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm" 
              style={{ background: cfg.avatarBg }}>
              {cfg.initials}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">{cfg.name}</div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 tracking-wide" style={roleBadgeStyle}>{role}</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {cfg.items.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-200 group relative ${
                  active 
                    ? "text-white shadow-md shadow-blue-500/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                }`}
                style={active ? { backgroundColor: cfg.color } : {}}
              >
                <Icon size={17} className={`transition-transform duration-200 group-hover:scale-110 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-700"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-slate-100/80 space-y-1 bg-slate-50/50">
          {role !== "Administrador" && (
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors">
              <Settings size={17} className="text-slate-400" /> Configuración
            </button>
          )}
          <Link to="/login" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-all">
            <LogOut size={17} /> Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen pb-16 md:pb-0">
        
        {/* ── Header ── */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-10 shadow-sm/50">
          
          {/* Breadcrumbs / Page Title */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span style={{ color: cfg.color }} className="font-bold tracking-tight">Campus360</span>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="text-slate-700 font-bold">{label}</span>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-4">
            
            {/* Search Input Bar (Desktop) */}
            <div className="hidden sm:flex relative items-center">
              <Search size={14} className="absolute left-3 text-slate-400" />
              <input 
                placeholder="Buscar en el sistema..." 
                className="pl-9 pr-4 py-1.5 w-48 text-xs font-semibold border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:bg-white focus:w-64 focus:border-slate-800 transition-all duration-300"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer group">
              <Bell size={16} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full ring-2 ring-white animate-pulse" style={{ background: cfg.color }} />
            </button>

            {/* Profile Menu (Avatar) */}
            <div className="flex items-center gap-2.5 border-l border-slate-100 pl-4">
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm" style={{ background: cfg.avatarBg }}>
                {cfg.initials}
              </div>
              <div className="hidden sm:block leading-none">
                <div className="text-xs font-bold text-slate-800">{cfg.name}</div>
                <span className="text-[9px] font-bold tracking-wider mt-0.5 block" style={{ color: cfg.color }}>{role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Frame */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children ?? <Outlet />}</main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100/80 flex justify-around py-2 z-30 shadow-lg px-2">
        {cfg.items.slice(0, 5).map((item) => {
          const active = pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to}
              className="flex flex-col items-center gap-1 px-3 py-1 text-[9px] font-bold transition-all duration-200"
              style={{ color: active ? cfg.color : "#94a3b8" }}
            >
              <Icon size={18} className={active ? "scale-110" : ""} />
              {item.label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// ── Reusable Card ─────────────────────────────────────────────────────────────
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl premium-card-shadow ${className}`}>
      {children}
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, icon: Icon, color = "#1e40af", bgLight = "#eff6ff" }: {
  label: string; value: string; sub?: string; icon?: any; color?: string; bgLight?: string;
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start justify-between premium-card-shadow hover:scale-[1.01] transition-transform duration-300">
      <div>
        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-extrabold mt-1.5 tracking-tight text-slate-900">{value}</p>
        {sub && <p className="text-[11px] font-semibold text-slate-400 mt-1">{sub}</p>}
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: bgLight, color }}>
          <Icon size={18} />
        </div>
      )}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = "default" }: {
  children: ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "primary" | "green" | "purple";
}) {
  const styles: Record<string, string> = {
    default: "bg-slate-100 text-slate-600 border-slate-200/50",
    success: "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]",
    danger: "bg-[#fef2f2] text-[#ef4444] border-[#fee2e2]",
    warning: "bg-[#fffbeb] text-[#d97706] border-[#fef3c7]",
    primary: "bg-[#eff6ff] text-[#1e40af] border-[#dbeafe]",
    green: "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]",
    purple: "bg-[#f5f3ff] text-[#7c3aed] border-[#e0e7ff]",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
}

// ── SectionTitle ──────────────────────────────────────────────────────────────
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-extrabold text-[15px] tracking-tight text-slate-900">{children}</h2>;
}

// ── Progress bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, color = "#1e40af" }: { value: number; color?: string }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full border border-slate-200/20">
      <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

