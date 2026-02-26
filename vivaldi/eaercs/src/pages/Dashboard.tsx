import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Send, DollarSign, AlertTriangle, Search, Calendar } from "lucide-react";

const mockCampaigns = [
  { id: 1, name: "Promoção Black Friday", date: "2026-02-20", sent: 12500, failed: 45, status: "Concluído" },
  { id: 2, name: "Série de Boas-vindas", date: "2026-02-18", sent: 8300, failed: 12, status: "Concluído" },
  { id: 3, name: "Lançamento de Produto", date: "2026-02-15", sent: 25000, failed: 180, status: "Concluído" },
  { id: 4, name: "Reengajamento", date: "2026-02-12", sent: 5600, failed: 23, status: "Concluído" },
  { id: 5, name: "Especial Dia dos Namorados", date: "2026-02-10", sent: 18900, failed: 67, status: "Concluído" },
  { id: 6, name: "Newsletter Semanal", date: "2026-02-08", sent: 31200, failed: 95, status: "Concluído" },
];

const Dashboard = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = mockCampaigns.filter((c) => {
    const matchName = c.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchDate = !dateFilter || c.date.includes(dateFilter);
    return matchName && matchDate;
  });

  const totalSent = filtered.reduce((a, c) => a + c.sent, 0);
  const totalFailed = filtered.reduce((a, c) => a + c.failed, 0);
  const totalSpent = totalSent * 0.3;

  const cards = [
    { label: "Mensagens Enviadas", value: totalSent.toLocaleString(), icon: Send, accent: "text-primary" },
    { label: "Total Gasto", value: `R$ ${totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: DollarSign, accent: "text-gold" },
    { label: "Mensagens Falhas", value: totalFailed.toLocaleString(), icon: AlertTriangle, accent: "text-destructive" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Painel</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral das suas campanhas RCS</p>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass-card p-6 glow-border hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{card.label}</span>
              <card.icon className={`w-4 h-4 ${card.accent}`} />
            </div>
            <p className={`font-display text-2xl font-bold ${card.accent}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar campanhas..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50 h-10"
          />
        </div>
        <div className="relative max-w-[180px]">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50 h-10"
          />
        </div>
      </motion.div>

      {/* Campaign Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campanha</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Enviadas</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Falhas</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Custo</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="border-b border-border/20 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.date}</td>
                  <td className="px-6 py-4 text-sm text-foreground text-right">{c.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-destructive text-right">{c.failed}</td>
                  <td className="px-6 py-4 text-sm text-gold text-right font-medium">R$ {(c.sent * 0.3).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/15 text-primary">{c.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
