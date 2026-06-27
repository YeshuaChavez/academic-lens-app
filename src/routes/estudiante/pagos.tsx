import { createFileRoute } from "@tanstack/react-router";
import { Layout, Card, Badge, StatCard } from "../../components/Layout";
import { Download, Building2 } from "lucide-react";
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
  return (
    <Layout role="Estudiante">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Estado de Cuenta</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Saldo pendiente" value="S/. 0.00" color="#15803d" bgLight="#dcfce7" />
          <StatCard label="Último pago" value="S/. 850.00" sub="05/05/2026" />
          <StatCard label="Próximo vencimiento" value="S/. 850.00" sub="05/06/2026" color="#b45309" bgLight="#fef3c7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Historial de pagos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#6b7280] border-b border-[#e8e8e4] text-xs uppercase tracking-wide">
                    <th className="pb-3 font-semibold">N°</th><th className="pb-3 font-semibold">Concepto</th>
                    <th className="pb-3 font-semibold">Monto</th><th className="pb-3 font-semibold">Fecha</th>
                    <th className="pb-3 font-semibold">Estado</th><th className="pb-3 font-semibold">Comp.</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.n} className="border-b border-[#f3f3f0] last:border-0">
                      <td className="py-3 text-[#6b7280]">{p.n}</td>
                      <td className="py-3 font-semibold">{p.concept}</td>
                      <td className="py-3">S/. {p.amount.toFixed(2)}</td>
                      <td className="py-3 text-xs text-[#6b7280]">{p.date}</td>
                      <td className="py-3"><Badge variant={p.status === "Pagado" ? "success" : p.status === "Vencido" ? "danger" : "warning"}>{p.status}</Badge></td>
                      <td className="py-3"><button className="text-[#1A56A0] hover:bg-[#EBF3FB] p-1.5 rounded"><Download size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Realizar pago</h2>
              <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5">Monto (S/.)</label>
              <input type="number" defaultValue={850} className="w-full px-3 py-2.5 border border-[#e8e8e4] rounded-lg text-sm mb-4 focus:outline-none focus:border-[#1A56A0]" />
              <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-2">Método de pago</label>
              <div className="space-y-2 mb-5">
                {[{id:"tarjeta",label:"Tarjeta de crédito"},{id:"transferencia",label:"Transferencia bancaria"},{id:"caja",label:"Pago en caja"}].map(m => (
                  <label key={m.id} className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer text-sm font-medium transition ${method === m.id ? "border-[#1A56A0] bg-[#EBF3FB]" : "border-[#e8e8e4] hover:border-[#1A56A0]"}`}>
                    <input type="radio" checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-[#1A56A0]" />
                    {m.label}
                  </label>
                ))}
              </div>
              <button className="w-full bg-[#1A56A0] hover:bg-[#134680] text-white font-semibold py-2.5 rounded-lg">Proceder al pago</button>
            </Card>
            <Card className="p-4 bg-[#f8f8f6]">
              <div className="flex items-center gap-2 mb-2"><Building2 size={15} className="text-[#1A56A0]" /><h3 className="font-semibold text-sm">Datos bancarios</h3></div>
              <div className="text-xs text-[#374151] space-y-1">
                <div><span className="font-semibold">Banco:</span> BCP</div>
                <div><span className="font-semibold">Cta. corriente:</span> 194-2345678-0-12</div>
                <div><span className="font-semibold">CCI:</span> 002-194-002345678012-14</div>
                <div><span className="font-semibold">Titular:</span> Innovatec University S.A.C.</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
