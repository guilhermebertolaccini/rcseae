import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Plus, Trash2, Image, Link, Type, MousePointerClick, Save,
  Search, Eye, Pencil, X, MessageSquarePlus,
} from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";

interface ActionButton {
  label: string;
  url: string;
}

interface MessageTemplate {
  id: number;
  name: string;
  text: string;
  hasImage: boolean;
  buttons: ActionButton[];
  createdAt: string;
}

const initialTemplates: MessageTemplate[] = [
  { id: 1, name: "Mensagem de Boas-vindas", text: "Olá {nome}! Bem-vindo à {empresa}. Estamos felizes em ter você conosco!", hasImage: false, buttons: [{ label: "Saiba mais", url: "https://example.com" }], createdAt: "2026-02-20" },
  { id: 2, name: "Oferta Promocional", text: "🔥 {nome}, aproveite 30% OFF em todos os produtos! Oferta por tempo limitado.", hasImage: true, buttons: [{ label: "Ver ofertas", url: "https://example.com" }, { label: "Falar com suporte", url: "https://example.com" }], createdAt: "2026-02-18" },
  { id: 3, name: "Lembrete de Pagamento", text: "Oi {nome}, seu pagamento de R$49,90 está pendente. Regularize agora!", hasImage: false, buttons: [{ label: "Pagar agora", url: "https://example.com" }], createdAt: "2026-02-15" },
];

const Messages = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>(initialTemplates);
  const [searchFilter, setSearchFilter] = useState("");
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<MessageTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Builder state
  const [templateName, setTemplateName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [buttons, setButtons] = useState<ActionButton[]>([]);

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const resetBuilder = () => {
    setTemplateName("");
    setMessageText("");
    setHasImage(false);
    setButtons([]);
  };

  const openCreate = () => {
    resetBuilder();
    setEditingTemplate(null);
    setViewingTemplate(null);
    setIsCreating(true);
  };

  const openEdit = (t: MessageTemplate) => {
    setTemplateName(t.name);
    setMessageText(t.text);
    setHasImage(t.hasImage);
    setButtons([...t.buttons]);
    setEditingTemplate(t);
    setViewingTemplate(null);
    setIsCreating(true);
  };

  const closeBuilder = () => {
    setIsCreating(false);
    setEditingTemplate(null);
    resetBuilder();
  };

  const handleSave = () => {
    if (!templateName.trim()) return;
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingTemplate.id
            ? { ...t, name: templateName, text: messageText, hasImage, buttons }
            : t
        )
      );
    } else {
      const newTemplate: MessageTemplate = {
        id: Date.now(),
        name: templateName,
        text: messageText,
        hasImage,
        buttons,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTemplates((prev) => [newTemplate, ...prev]);
    }
    closeBuilder();
  };

  const handleDelete = (id: number) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const addButton = () => {
    if (buttons.length < 4) setButtons([...buttons, { label: "", url: "" }]);
  };

  const removeButton = (index: number) => setButtons(buttons.filter((_, i) => i !== index));

  const updateButton = (index: number, field: keyof ActionButton, value: string) => {
    const updated = [...buttons];
    updated[index] = { ...updated[index], [field]: value };
    setButtons(updated);
  };

  const insertVariable = (variable: string) => setMessageText((prev) => prev + `{${variable}}`);

  const previewMessage = {
    text: messageText.replace(/\{nome\}/g, "João").replace(/\{empresa\}/g, "Acme Corp") || undefined,
    imageUrl: hasImage ? "preview.jpg" : undefined,
    buttons: buttons.filter((b) => b.label).map((b) => ({ label: b.label, url: b.url })),
  };

  // View modal preview
  const viewPreview = viewingTemplate
    ? {
      text: viewingTemplate.text.replace(/\{nome\}/g, "João").replace(/\{empresa\}/g, "Acme Corp"),
      imageUrl: viewingTemplate.hasImage ? "preview.jpg" : undefined,
      buttons: viewingTemplate.buttons.filter((b) => b.label).map((b) => ({ label: b.label, url: b.url })),
    }
    : undefined;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Mensagens</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie seus modelos de mensagens RCS</p>
        </div>
        <Button onClick={openCreate} className="gradient-gold text-background font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Novo Modelo
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar modelos..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50 h-10"
          />
        </div>
      </motion.div>

      {/* Template List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card p-5 space-y-3 hover:border-gold/30 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold text-foreground truncate">{t.name}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.createdAt}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setViewingTemplate(t)} className="p-1.5 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-gold transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-primary transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{t.text}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {t.hasImage && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">Imagem</span>
              )}
              {t.buttons.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold font-medium">
                  {t.buttons.length} bot{t.buttons.length > 1 ? "ões" : "ão"}
                </span>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
            <MessageSquarePlus className="w-8 h-8 mb-3 opacity-40" />
            <p className="text-sm">Nenhum modelo encontrado</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {viewingTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setViewingTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 max-w-sm w-full space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">{viewingTemplate.name}</h2>
                <button onClick={() => setViewingTemplate(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <PhoneMockup message={viewPreview} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Panel */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {editingTemplate ? "Editar Modelo" : "Criar Modelo"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {editingTemplate ? "Modifique seu modelo de mensagem existente" : "Crie um novo modelo de mensagem RCS"}
                  </p>
                </div>
                <button onClick={closeBuilder} className="text-muted-foreground hover:text-foreground p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                {/* Builder */}
                <div className="space-y-6">
                  {/* Template Name */}
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                      <Type className="w-4 h-4 text-gold" />
                      Detalhes do Modelo
                    </h3>
                    <Input
                      placeholder="Nome do modelo"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="bg-secondary/50 border-border/50 h-10"
                    />
                  </div>

                  {/* Message Content */}
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-semibold text-foreground">Conteúdo da Mensagem</h3>
                      <div className="flex gap-1">
                        {["nome", "empresa", "telefone"].map((v) => (
                          <button
                            key={v}
                            onClick={() => insertVariable(v)}
                            className="text-[10px] px-2 py-1 rounded bg-gold/15 text-gold font-medium hover:bg-gold/25 transition-colors"
                          >
                            {`{${v}}`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Textarea
                      placeholder="Digite sua mensagem aqui... Use {nome} para variáveis dinâmicas"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="bg-secondary/50 border-border/50 min-h-[120px] resize-none"
                    />
                  </div>

                  {/* Media */}
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                        <Image className="w-4 h-4 text-gold" />
                        Anexo de Mídia
                      </h3>
                      <Switch checked={hasImage} onCheckedChange={setHasImage} />
                    </div>
                    {hasImage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-gold/40 transition-colors"
                      >
                        <Image className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Clique para enviar uma imagem</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                        <MousePointerClick className="w-4 h-4 text-gold" />
                        Botões de Ação
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={addButton}
                        disabled={buttons.length >= 4}
                        className="text-gold hover:text-gold/80"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {buttons.map((btn, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2 items-start"
                        >
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder="Rótulo do botão"
                              value={btn.label}
                              onChange={(e) => updateButton(i, "label", e.target.value)}
                              className="bg-secondary/50 border-border/50 h-9 text-sm"
                            />
                            <div className="relative">
                              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                              <Input
                                placeholder="https://..."
                                value={btn.url}
                                onChange={(e) => updateButton(i, "url", e.target.value)}
                                className="bg-secondary/50 border-border/50 h-9 text-sm pl-8"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeButton(i)}
                            className="text-muted-foreground hover:text-destructive mt-0.5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                      {buttons.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">Nenhum botão adicionado ainda</p>
                      )}
                    </div>
                  </div>

                  {/* Save */}
                  <Button
                    onClick={handleSave}
                    className="w-full gradient-gold text-background font-semibold h-11 hover:opacity-90 transition-opacity"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingTemplate ? "Atualizar Modelo" : "Salvar Modelo"}
                  </Button>
                </div>

                {/* Phone Preview */}
                <div className="flex flex-col items-center gap-4 lg:sticky lg:top-8">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Pré-visualização Ao Vivo</p>
                  <PhoneMockup
                    message={
                      previewMessage.text || previewMessage.imageUrl || previewMessage.buttons.length > 0
                        ? previewMessage
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;
