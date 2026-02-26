import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Users, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const features = [
  { icon: MessageSquare, title: "Mensagens Ricas", desc: "Envie mensagens interativas e personalizadas com imagens, carrosséis e botões de ação." },
  { icon: Zap, title: "Entrega Instantânea", desc: "Alcance milhões de usuários em segundos com entrega confiável e de alta capacidade." },
  { icon: Users, title: "Segmentação Inteligente", desc: "Segmente públicos e personalize cada mensagem com variáveis dinâmicas." },
  { icon: Shield, title: "Remetente Verificado", desc: "Construa confiança com perfis comerciais verificados e mensagens personalizadas." },
];

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-16"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <motion.img
              src={logo}
              alt="Eae.Bet"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-20 mb-4 drop-shadow-[0_0_25px_hsl(38_75%_55%/0.4)]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-1 text-sm"
            >
              Entre para gerenciar suas campanhas RCS
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome de Usuário</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="bg-secondary/50 border-border/50 focus:border-gold h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-secondary/50 border-border/50 focus:border-gold h-11"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 gradient-gold text-background font-semibold hover:opacity-90 transition-opacity"
            >
              Entrar
            </Button>
          </motion.form>
        </div>
      </motion.div>

      {/* Right - Info */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex w-[55%] relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-gold/10" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gold/15 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center p-16 space-y-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display text-4xl font-bold text-foreground leading-tight"
            >
              Entregue mensagens <span className="gradient-gold-text">personalizadas</span>,{" "}
              <br />e altamente interativas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mt-4 text-base leading-relaxed max-w-md"
            >
              Transforme a forma como você se comunica com seus clientes através de mensagens RCS ricas e bonitas que impulsionam o engajamento e as conversões.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                className="glass-card p-4 space-y-2 hover:glow-border transition-all duration-300"
              >
                <f.icon className="w-5 h-5 text-gold" />
                <h3 className="font-display text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
