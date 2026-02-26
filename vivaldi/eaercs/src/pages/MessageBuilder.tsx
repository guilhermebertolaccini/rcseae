import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Image, Link, Type, MousePointerClick, Save } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";

interface ActionButton {
  label: string;
  url: string;
}

const MessageBuilder = () => {
  const [messageText, setMessageText] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [buttons, setButtons] = useState<ActionButton[]>([]);
  const [templateName, setTemplateName] = useState("");

  const addButton = () => {
    if (buttons.length < 4) {
      setButtons([...buttons, { label: "", url: "" }]);
    }
  };

  const removeButton = (index: number) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const updateButton = (index: number, field: keyof ActionButton, value: string) => {
    const updated = [...buttons];
    updated[index] = { ...updated[index], [field]: value };
    setButtons(updated);
  };

  const insertVariable = (variable: string) => {
    setMessageText((prev) => prev + `{${variable}}`);
  };

  const previewMessage = {
    text: messageText.replace(/\{nome\}/g, "João").replace(/\{empresa\}/g, "Acme Corp") || undefined,
    imageUrl: hasImage ? "preview.jpg" : undefined,
    buttons: buttons.filter((b) => b.label).map((b) => ({ label: b.label, url: b.url })),
  };

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Criador de Mensagens</h1>
        <p className="text-sm text-muted-foreground mt-1">Crie modelos de mensagens RCS reutilizáveis</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Left - Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Template Name */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              Detalhes do Modelo
            </h2>
            <Input
              placeholder="Nome do modelo"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="bg-secondary/50 border-border/50 h-10"
            />
          </div>

          {/* Message Text */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold text-foreground">Conteúdo da Mensagem</h2>
              <div className="flex gap-1">
                {["nome", "empresa", "telefone"].map((v) => (
                  <button
                    key={v}
                    onClick={() => insertVariable(v)}
                    className="text-[10px] px-2 py-1 rounded bg-primary/15 text-primary font-medium hover:bg-primary/25 transition-colors"
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
              <h2 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                <Image className="w-4 h-4 text-primary" />
                Anexo de Mídia
              </h2>
              <Switch checked={hasImage} onCheckedChange={setHasImage} />
            </div>
            {hasImage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
              >
                <Image className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Clique para enviar uma imagem</p>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-primary" />
                Botões de Ação
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={addButton}
                disabled={buttons.length >= 4}
                className="text-primary hover:text-primary/80"
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
          <Button className="w-full gradient-purple text-primary-foreground font-semibold h-11 hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4 mr-2" />
            Salvar Modelo
          </Button>
        </motion.div>

        {/* Right - Phone Preview */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col items-center gap-4 lg:sticky lg:top-8"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Pré-visualização Ao Vivo</p>
          <PhoneMockup
            message={
              previewMessage.text || previewMessage.imageUrl || previewMessage.buttons.length > 0
                ? previewMessage
                : undefined
            }
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MessageBuilder;
