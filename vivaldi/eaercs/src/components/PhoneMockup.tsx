import { motion } from "framer-motion";

interface RcsMessage {
  text?: string;
  imageUrl?: string;
  buttons?: { label: string; url?: string }[];
}

interface PhoneMockupProps {
  message?: RcsMessage;
  className?: string;
}

const PhoneMockup = ({ message, className = "" }: PhoneMockupProps) => {
  return (
    <div className={`phone-mockup w-[280px] h-[560px] mx-auto ${className}`}>
      {/* Notch */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-24 h-5 bg-background rounded-full" />
      </div>

      {/* Screen content */}
      <div className="px-4 py-2 h-[calc(100%-60px)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-border/30 mb-4">
          <div className="w-8 h-8 rounded-full gradient-purple" />
          <div>
            <p className="text-xs font-semibold text-foreground">RCS Business</p>
            <p className="text-[10px] text-muted-foreground">Remetente verificado</p>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {message.imageUrl && (
              <div className="rounded-lg overflow-hidden bg-secondary/50 h-32 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">📷 Prévia da Imagem</span>
              </div>
            )}

            {message.text && (
              <div className="glass-card p-3 rounded-2xl rounded-tl-sm">
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            )}

            {message.buttons && message.buttons.length > 0 && (
              <div className="space-y-1.5">
                {message.buttons.map((btn, i) => (
                  <div
                    key={i}
                    className="text-center py-2 px-3 rounded-lg border border-primary/40 text-primary text-xs font-medium cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    {btn.label}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {!message && (
          <div className="flex items-center justify-center h-40">
            <p className="text-xs text-muted-foreground">A prévia aparecerá aqui</p>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-5 flex justify-center pb-1">
        <div className="w-28 h-1 bg-muted-foreground/30 rounded-full" />
      </div>
    </div>
  );
};

export default PhoneMockup;
