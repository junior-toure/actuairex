import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useRessources } from "@/hooks/useContent";

const RessourcesPage = () => {
  const { data: ressources, isLoading } = useRessources();
  const [typeFilter, setTypeFilter] = useState("Tous");

  const types = ["Tous", ...new Set(ressources?.map((r) => r.type) ?? [])];
  const filtered = typeFilter === "Tous" ? ressources : ressources?.filter((r) => r.type === typeFilter);

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Boutique" title="Ressources & Outils" />
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-[700px]">
          Tous les fichiers sont visibles gratuitement en aperçu. Le téléchargement complet est payant via <strong className="text-primary">Selar</strong> — paiement sécurisé en XOF, mobile money accepté.
        </p>
        <div className="flex gap-2 flex-wrap mb-8">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`bg-transparent border px-3 py-1 font-mono text-[11px] tracking-[.1em] uppercase cursor-pointer transition-all ${
                typeFilter === t ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Chargement...</p>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map((r) => (
              <div key={r.id} className="bg-surface-1 hover:bg-surface-2 transition-colors overflow-hidden">
                {r.preview && (
                  <div className="relative w-full aspect-video bg-surface-3 overflow-hidden">
                    <img src={r.preview} alt="Aperçu" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-green-glow border-t border-primary/30 px-2.5 py-1 font-mono text-[10px] text-primary tracking-[.08em] text-center">
                      ACTUAIREX — APERÇU
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex gap-2 mb-3 items-center flex-wrap">
                    <span className="text-[10px] tracking-[.15em] uppercase text-primary border border-green-glow px-2 py-0.5">{r.type}</span>
                    <span className="text-[10px] tracking-[.15em] uppercase text-muted-foreground border border-border px-2 py-0.5">{r.niveau}</span>
                    {r.gratuit ? (
                      <span className="text-[10px] tracking-[.15em] uppercase text-primary border border-green-glow px-2 py-0.5">Gratuit</span>
                    ) : (
                      <span className="text-[10px] tracking-[.15em] uppercase text-muted-foreground border border-border px-2 py-0.5">{r.prix}</span>
                    )}
                  </div>
                  <div className="font-serif text-lg font-bold text-white leading-snug mb-2">{r.titre}</div>
                  <div className="font-sans text-xs text-muted-foreground leading-relaxed font-light mb-5">{r.description}</div>
                  <div className="flex items-center justify-between pt-4 border-t border-border flex-wrap gap-3">
                    <div>
                      {r.gratuit ? (
                        <div className="text-[11px] text-muted-foreground tracking-[.08em] uppercase">Accès libre</div>
                      ) : (
                        <div className="font-mono text-base font-bold text-primary">{r.prix}</div>
                      )}
                      <div className="text-[10px] text-text-dim mt-1">{r.auteur}</div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {r.lien_lecture && (
                        <a href={r.lien_lecture} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-[.08em] uppercase px-3.5 py-1.5 bg-transparent border border-border-bright text-foreground no-underline hover:border-primary hover:text-primary transition-all">
                          {r.gratuit ? "Télécharger" : "Lire en ligne"}
                        </a>
                      )}
                      {r.lien_achat && !r.gratuit && (
                        <a href={r.lien_achat} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] font-bold tracking-[.08em] uppercase px-3.5 py-1.5 bg-primary text-primary-foreground no-underline hover:opacity-85 transition-opacity">
                          Acheter {r.prix} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">Aucune ressource disponible.</p>
        )}
      </div>
    </div>
  );
};

export default RessourcesPage;
