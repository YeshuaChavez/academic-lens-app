import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  GraduationCap, LayoutDashboard, ClipboardList, BarChart3, CreditCard,
  BookOpen, MessageSquare, FileText, Settings, LogOut, Bell, ChevronRight,
  Users, BookMarked, ClipboardCheck, Upload, Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Role } from "../context/RoleContext";

// ── nav configs per role ──────────────────────────────────────────────────────
const navByRole = {
  Estudiante: {
    prefix: "/estudiante",
    color: "#1A56A0",
    bgLight: "#EBF3FB",
    avatarBg: "#1A56A0",
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
    color: "#15803d",
    bgLight: "#dcfce7",
    avatarBg: "#15803d",
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
    bgLight: "#ede9fe",
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
    border: `1px solid ${cfg.color}30`,
  };

  return (
    <div className="min-h-screen flex bg-[#f8f8f6]">
      {/* ── Sidebar desktop ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-[#e8e8e4] flex-col z-20">
        <div className="px-5 py-5 border-b border-[#e8e8e4]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: cfg.color }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="font-semibold text-[14px] leading-tight">Campus360</div>
              <div className="text-[10px] text-[#6b7280] leading-tight">Innovatec University</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-[#f8f8f6]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: cfg.avatarBg }}>
              {cfg.initials}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">{cfg.name}</div>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={roleBadgeStyle}>{role}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {cfg.items.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition relative ${
                  active ? "text-white" : "text-[#374151] hover:bg-[#f3f4f6]"
                }`}
                style={active ? { background: cfg.color } : {}}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r" style={{ background: cfg.color, filter: "brightness(0.7)" }} />}
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[#e8e8e4] space-y-0.5">
          {role !== "Administrador" && (
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f3f4f6]">
              <Settings size={17} /> Configuración
            </button>
          )}
          <Link to="/login" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#b91c1c] hover:bg-[#fee2e2]">
            <LogOut size={17} /> Cerrar sesión
          </Link>
        </div>
      </aside>

      <div className="flex-1 md:ml-[220px] flex flex-col min-h-screen pb-16 md:pb-0">
        {/* ── Header ── */}
        <header className="h-14 bg-white border-b border-[#e8e8e4] flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <span style={{ color: cfg.color }} className="font-medium">Campus360</span>
            <ChevronRight size={14} />
            <span className="text-[#1a1a1a] font-medium">{label}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-full hover:bg-[#f3f4f6] flex items-center justify-center text-[#374151]">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: cfg.color }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold" style={{ background: cfg.avatarBg }}>
                {cfg.initials}
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-semibold">{cfg.name}</div>
                <div className="text-[10px] font-medium" style={{ color: cfg.color }}>{role}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children ?? <Outlet />}</main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e8e4] flex justify-around py-1.5 z-30">
        {cfg.items.slice(0, 5).map((item) => {
          const active = pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-[9px] font-medium"
              style={{ color: active ? cfg.color : "#6b7280" }}
            >
              <Icon size={19} />
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
    <div className={`bg-white border border-[#e8e8e4] rounded-xl ${className}`} style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      {children}
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, icon: Icon, color = "#1A56A0", bgLight = "#EBF3FB" }: {
  label: string; value: string; sub?: string; icon?: any; color?: string; bgLight?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#6b7280] font-medium">{label}</p>
          <p className="text-2xl font-semibold mt-1" style={{ color }}>{value}</p>
          {sub && <p className="text-[11px] text-[#6b7280] mt-0.5">{sub}</p>}
        </div>
        {Icon && (
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bgLight, color }}>
            <Icon size={17} />
          </div>
        )}
      </div>
    </Card>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = "default" }: {
  children: ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "primary" | "green" | "purple";
}) {
  const styles: Record<string, string> = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-[#dcfce7] text-[#15803d]",
    danger: "bg-[#fee2e2] text-[#b91c1c]",
    warning: "bg-[#fef3c7] text-[#b45309]",
    primary: "bg-[#EBF3FB] text-[#1A56A0]",
    green: "bg-[#dcfce7] text-[#15803d]",
    purple: "bg-[#ede9fe] text-[#7c3aed]",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}

// ── SectionTitle ──────────────────────────────────────────────────────────────
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-semibold text-[15px] text-[#1a1a1a]">{children}</h2>;
}

// ── Progress bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, color = "#1A56A0" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-[#f3f3f0] rounded-full overflow-hidden w-full">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}
