import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Rocket, MessageSquarePlus, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { to: "/campaign", label: "Nova Campanha", icon: Rocket },
  { to: "/messages", label: "Mensagens", icon: MessageSquarePlus },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 h-screen bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col fixed left-0 top-0 z-40"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border/30 flex items-center gap-3">
        <img src={logo} alt="Eae.Bet" className="h-10 drop-shadow-[0_0_15px_hsl(38_75%_55%/0.3)]" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${active
                ? "bg-gold/15 text-gold border border-gold/30"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/30">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            window.location.href = "/";
          }}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
