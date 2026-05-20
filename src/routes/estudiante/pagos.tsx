import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard } from "../../components/Layout";
import { Download, Building2, CreditCard as CardIcon, Send, Wallet, Coins, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estudiante/pagos")({ component: EstPagos });

const payments = [
  { n: 1, concept: "Matrícula 2026-I", amount: 850, date: "05/03/2026", status: "Pagado" },
  { n: 2, concept: "Pensión Marzo", amount: 850, date: "05/03/2026", status: "Pagado" },
  { n: 3, concept: "Pensión Abril", amount: 850, date: "05/04/2026", status: "Pagado" },
  { n: 4, concept: "Pensión Mayo", amount: 850, date: "05/05/2026", status: "Pagado" },
  { n: 5, concept: "Pensión Junio", amount: 850, date: "05/06/2026", status: "Pendiente" },
  { n: 6, concept: "Constancia de estudios", amount: 45, date: "12/04/2026", status: "Vencido" },
];

function EstPagos() {
  const [method, setMethod] = useState("tarjeta");
  const [amountInput, setAmountInput] = useState("895.00");

  return (
    <Layout role="Estudiante">
      <div className="space-y-8 animate-fade-in font-sans">
        
        {/* Header Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Estado de Cuenta</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Control de pensiones, matrículas y trámites administrativos</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Saldo pendiente total" value="S/. 895.00" sub="Junio + Trámite Vencido" color="#ef4444" bgLight="#fef2f2" />
          <StatCard label="Último pago registrado" value="S/. 850.00" sub="05 de mayo de 2026" icon={Coins} color="#059669" bgLight="#ecfdf5" />
          <StatCard label="Próximo vencimiento" value="S/. 850.00" sub="Pensión Junio · 05/06/2026" icon={Wallet} color="#d97706" bgLight="#fffbeb" />
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          
          {/* Billing Table */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="font-extrabold text-slate-800 tracking-tight">Historial de transacciones</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Listado detallado de cargos, abonos y cuotas escolares</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-slate-700">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100 text-[10px] uppercase font-extrabold tracking-wider">
                    <th className="pb-3">N°</th>
                    <th className="pb-3">Concepto</th>
                    <th className="pb-3">Monto</th>
                    <th className="pb-3">Fecha límite / Pago</th>
                    <th className="pb-3">Estado</th>
                    <th className="pb-3 text-center">Comp.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {payments.map(p => (
                    <tr key={p.n} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-xs font-bold text-slate-400">{String(p.n).padStart(2, "0")}</td>
                      <td className="py-4">
                        <span className="font-bold text-sm text-slate-800">{p.concept}</span>
                      </td>
                      <td className="py-4 text-sm font-extrabold text-slate-900">S/. {p.amount.toFixed(2)}</td>
                      <td className="py-4 text-xs font-semibold text-slate-500">{p.date}</td>
                      <td className="py-4">
                        <Badge variant={p.status === "Pagado" ? "success" : p.status === "Vencido" ? "danger" : "warning"}>{p.status}</Badge>
                      </td>
                      <td className="py-4 text-center">
                        {p.status === "Pagado" ? (
                          <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-xl transition-all cursor-pointer">
                            <Download size={14} />
                          </button>
                        ) : (
                          <span className="text-slate-300 text-xs font-semibold">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Payment Terminal */}
          <div className="space-y-6">
            
            {/* Pay Form Card */}
            <Card className="p-6">
              <h2 className="font-extrabold text-slate-800 tracking-tight mb-5">Realizar pago electrónico</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Importe a abonar (S/.)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">S/.</span>
                    <input 
                      type="text" 
                      value={amountInput}
                      onChange={e => setAmountInput(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-800 focus:outline-none focus:border-slate-800 transition-all bg-slate-50 focus:bg-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Método de pago de preferencia</label>
                  <div className="space-y-2">
                    {[
                      { id: "tarjeta", label: "Tarjeta de crédito/débito", icon: CardIcon, desc: "Visa, Mastercard, Amex" },
                      { id: "transferencia", label: "PagoEfec. / Transferencia", icon: Send, desc: "Banca móvil o agente autorizado" },
                      { id: "caja", label: "Pago en caja", icon: Building2, desc: "Solo en el pabellón de administración" },
                    ].map(m => {
                      const active = method === m.id;
                      const Icon = m.icon;
                      return (
                        <label 
                          key={m.id} 
                          className={`flex items-start gap-3.5 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                            active 
                              ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                              : "border-slate-200 hover:border-slate-350 hover:bg-slate-50/30"
                          }`}
                        >
                          <input 
                            type="radio" 
                            checked={active} 
                            onChange={() => setMethod(m.id)} 
                            className="accent-blue-600 mt-0.5" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <Icon size={14} className={active ? "text-blue-600" : "text-slate-400"} />
                              {m.label}
                            </div>
                            <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{m.desc}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group mt-2">
                  Proceder al pago seguro <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>

            {/* Bank details info */}
            <Card className="p-5 bg-slate-50/50 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 size={14} />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs tracking-tight">Depósitos & Transferencias</h3>
              </div>
              
              <div className="text-[11px] text-slate-500 space-y-2 font-semibold">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-450">Banco:</span> 
                  <span className="text-slate-800 font-bold">Banco de Crédito del Perú (BCP)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-450">Cta. corriente:</span> 
                  <span className="text-slate-800 font-bold font-mono">194-2345678-0-12</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-450">CCI:</span> 
                  <span className="text-slate-800 font-bold font-mono">002-194-002345678012-14</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-450">Razon Social:</span> 
                  <span className="text-slate-800 font-bold">Innovatec University S.A.C.</span>
                </div>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </Layout>
  );
}
