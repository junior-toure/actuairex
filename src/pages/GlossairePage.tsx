import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useGlossaire } from "@/hooks/useContent";

const GlossairePage = () => {
  const { data: glossaire, isLoading } = useGlossaire();
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = (glossaire ?? []).filter((g) => {
    const q = search.toLowerCase();
    return g.terme.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q) || g.categorie.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Référence" title="Glossaire de l'actuariat" />
        <input
          className="w-full bg-surface-1 border border-border px-5 py-3 font-mono text-sm text-foreground outline-none mb-6 focus:border-primary transition-colors placeholder:text-text-dim"
          placeholder="Rechercher un terme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Chargement...</p>
        ) : (
          <div>
            {filtered.map((g, i) => (
              <div key={g.id} className="border-b border-border py-6 cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[.15em] uppercase text-muted-foreground border border-border px-2.5 py-0.5">{g.categorie}</span>
                  <h3 className={`font-serif text-xl font-bold transition-colors ${openIndex === i ? "text-primary" : "text-white"}`}>{g.terme}</h3>
                  <span className="flex-1" />
                  <span className={`text-xs text-text-dim transition-transform ${openIndex === i ? "rotate-90" : ""}`}>►</span>
                </div>
                {openIndex === i && (
                  <div className="pt-4">
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed mb-4">{g.definition}</p>
                    <div className="font-mono text-xs text-muted-foreground bg-surface-2 border-l-2 border-primary px-4 py-3 leading-relaxed">
                      <span className="text-primary">Ex. : </span>{g.exemple}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Aucun terme trouvé.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlossairePage;
