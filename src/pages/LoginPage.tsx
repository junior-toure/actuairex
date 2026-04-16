import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const LoginPage = () => {
  const { session, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [success, setSuccess] = useState("");

  if (loading) return <div className="min-h-screen pt-12 flex items-center justify-center text-muted-foreground">Chargement...</div>;
  if (session && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setSuccess("Compte créé ! Vous pouvez maintenant vous connecter.");
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-12 flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">Admin</h1>
        <p className="text-muted-foreground text-xs text-center mb-8 tracking-[.1em] uppercase">ActuaireX — Panneau d'administration</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="bg-surface-1 border border-border px-4 py-3 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-surface-1 border border-border px-4 py-3 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
            type="password"
            placeholder="Mot de passe (min. 6 caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          {success && <p className="text-xs text-primary">{success}</p>}
          {session && !isAdmin && <p className="text-xs text-destructive">Accès refusé. Ce compte n'a pas les droits admin.</p>}
          <button
            type="submit"
            disabled={submitting}
            className="font-mono text-xs font-bold tracking-[.1em] uppercase px-7 py-3 bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50"
          >
            {submitting ? "..." : mode === "login" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>
        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
          className="w-full text-center text-xs text-muted-foreground mt-4 bg-transparent border-none cursor-pointer hover:text-primary transition-colors"
        >
          {mode === "login" ? "Pas de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
