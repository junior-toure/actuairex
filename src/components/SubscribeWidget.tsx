import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SubscribeWidget = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMsg("Adresse email invalide.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("subscribe", {
        body: { email },
      });
      if (error) {
        setMsg("Erreur. Vérifie ta connexion et réessaie.");
        setStatus("error");
        return;
      }
      if (data?.success) {
        setMsg(data.message || "Abonnement confirmé ! 🎉");
        setStatus("success");
        setEmail("");
      } else {
        setMsg(data?.error || "Erreur. Réessaie.");
        setStatus("error");
      }
    } catch {
      setMsg("Erreur réseau. Vérifie ta connexion.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-surface-1 border-t border-b border-border py-14 px-8 text-center">
      <div className="max-w-[560px] mx-auto">
        <div className="text-[11px] tracking-[.2em] uppercase text-primary mb-4">// Notifications</div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Restez informé</h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
          Recevez un email à chaque nouvelle publication : articles, vidéos, projets, ressources.
          Gratuit, en français. Désabonnement en un clic.
        </p>
        {status === "success" ? (
          <div className="bg-surface-2 border border-primary/30 px-6 py-5">
            <p className="text-primary font-mono text-sm mb-2">✓ {msg}</p>
            <p className="text-muted-foreground text-xs font-sans font-light">Vérifie ta boîte email (et tes spams).</p>
            <button onClick={() => { setStatus("idle"); setMsg(""); }}
              className="text-[11px] text-muted-foreground mt-3 font-mono hover:text-primary transition-colors cursor-pointer bg-transparent border-none">
              S'abonner avec un autre email →
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-[400px] mx-auto">
              <input type="email" required placeholder="votre@email.com" value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                disabled={status === "loading"}
                className={`flex-1 bg-background border px-4 py-3 font-mono text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground ${
                  status === "error" ? "border-destructive" : "border-border focus:border-primary"}`}
              />
              <button type="submit" disabled={status === "loading" || !email}
                className="font-mono text-[11px] font-bold tracking-[.08em] uppercase px-5 py-3 bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50 whitespace-nowrap">
                {status === "loading" ? "..." : "S'abonner"}
              </button>
            </form>
            {status === "error" && msg && <p className="text-xs text-destructive mt-2 font-mono">{msg}</p>}
            <p className="text-[11px] text-muted-foreground mt-3 font-sans">Aucun spam. Désabonnement en un clic.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribeWidget;
