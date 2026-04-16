import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/data/config";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const links = [
    { icon: "@", label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: "in", label: "LinkedIn / ActuaireX", href: siteConfig.linkedin },
    { icon: "tt", label: "TikTok / @actuairex", href: siteConfig.tiktok },
    { icon: "yt", label: "YouTube / @actuairex", href: siteConfig.youtube },
    { icon: "$", label: "Boutique Selar", href: siteConfig.selar },
  ];

  const handleSubmit = async () => {
    if (!form.name || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xbdzaknw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Contact" title="Parlons actuariat" />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <h3 className="font-serif text-[1.8rem] font-bold text-white mb-4">Je suis disponible.</h3>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
              Questions sur un article, collaboration, partenariat ou simplement envie d'échanger.
            </p>
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground no-underline text-[13px] hover:text-primary transition-colors group">
                  <div className="w-9 h-9 border border-border flex items-center justify-center text-[13px] flex-shrink-0 font-mono group-hover:border-primary transition-colors">{l.icon}</div>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <input
              className="bg-surface-1 border border-border px-4 py-3 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-text-dim"
              placeholder="Ton nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="bg-surface-1 border border-border px-4 py-3 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-text-dim"
              type="email"
              placeholder="Ton email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="bg-surface-1 border border-border px-4 py-3 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-text-dim"
              placeholder="Sujet"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <textarea
              className="bg-surface-1 border border-border px-4 py-3 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-text-dim resize-none h-32"
              placeholder="Ton message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              className="self-start font-mono text-xs font-bold tracking-[.1em] uppercase px-7 py-3 bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Envoi..." : status === "sent" ? "Envoyé ✓" : "Envoyer →"}
            </button>
            {status === "error" && <p className="text-xs text-destructive">Erreur. Réessaie ou contacte via LinkedIn.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
