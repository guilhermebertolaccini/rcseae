import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, Send } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";

const mockTemplates = [
  { id: "1", name: "Mensagem de Boas-vindas", text: "Olá {nome}! 🎉\nBem-vindo à nossa plataforma. Estamos felizes em ter você aqui!", buttons: [{ label: "Começar" }, { label: "Saiba Mais" }] },
  { id: "2", name: "Oferta Promocional", text: "Ei {nome}! 🔥\n30% de DESCONTO exclusivo só para você. Não perca!", buttons: [{ label: "Resgatar Oferta" }], imageUrl: "promo.jpg" },
  { id: "3", name: "Atualização de Pedido", text: "Olá {nome},\nSeu pedido #4521 foi enviado! Acompanhe abaixo.", buttons: [{ label: "Acompanhar Pedido" }, { label: "Contatar Suporte" }] },
];

const CampaignSetup = () => {
  const [file, setFile] = useState<string | null>(null);
  const [contactCount, setContactCount] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleFileUpload = () => {
    const count = Math.floor(Math.random() * 5000) + 500;
    setFile("contacts_list.csv");
    setContactCount(count);
  };

  const template = mockTemplates.find((t) => t.id === selectedTemplate);
  const totalPrice = contactCount * 0.3;

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Nova Campanha</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure e envie uma nova campanha RCS</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Left - Setup */}
        <div className="space-y-6">
          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-4"
          >
            <h2 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-primary" />
              Lista de Contatos
            </h2>
            {!file ? (
              <div
                onClick={handleFileUpload}
                className="border-2 border-dashed border-border/50 rounded-xl p-10 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Clique para enviar o arquivo de contatos</p>
                <p className="text-xs text-muted-foreground/60 mt-1">suporta .csv, .xlsx</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file}</p>
                    <p className="text-xs text-muted-foreground">{contactCount.toLocaleString()} contatos carregados</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setContactCount(0); }} className="text-muted-foreground hover:text-destructive">
                  Remover
                </Button>
              </div>
            )}
          </motion.div>

          {/* Template Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 space-y-4"
          >
            <h2 className="font-display text-sm font-semibold text-foreground">Selecionar Modelo</h2>
            <div className="grid gap-3">
              {mockTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedTemplate === t.id
                      ? "border-primary/50 bg-primary/10 glow-border"
                      : "border-border/30 bg-secondary/20 hover:border-border/60"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{t.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          {file && selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 glow-border space-y-4"
            >
              <h2 className="font-display text-sm font-semibold text-foreground">Resumo da Campanha</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Mensagens</p>
                  <p className="font-display text-xl font-bold text-primary mt-1">{contactCount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Custo Total</p>
                  <p className="font-display text-xl font-bold text-glow-accent mt-1">
                    R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <Button className="w-full gradient-purple text-primary-foreground font-semibold h-11 hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4 mr-2" />
                Enviar Campanha
              </Button>
            </motion.div>
          )}
        </div>

        {/* Right - Phone Preview */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Pré-visualização da Mensagem</p>
          <PhoneMockup
            message={
              template
                ? {
                    text: template.text.replace("{nome}", "João"),
                    imageUrl: template.imageUrl,
                    buttons: template.buttons,
                  }
                : undefined
            }
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignSetup;
